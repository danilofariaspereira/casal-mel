// ========================================
// SISTEMA DE DADOS - CASAL MEL
// ========================================

class DataManager {
    constructor() {
        this.eventos = [];
        this.shows = [];
        this.supabase = null;
        this.useSupabase = false;
        this.init();
    }

    init() {
        debug('Inicializando sistema de dados');
        this.initSupabase();
        // loadData será chamado depois que o Supabase for inicializado
        // ou imediatamente se não usar Supabase
        if (!this.useSupabase) {
            this.loadData();
        }
    }

    // Inicializa Supabase
    initSupabase() {
        try {
            if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url && window.SUPABASE_CONFIG.anonKey !== 'SUA_ANON_KEY_AQUI') {
                // Tenta inicializar imediatamente
                this.tryInitSupabase();
                
                // Se não funcionou, tenta novamente após um delay (para CDN carregar)
                if (!this.useSupabase) {
                    setTimeout(() => {
                        this.tryInitSupabase();
                    }, 200);
                }
            } else {
                console.warn('[CASAL MEL] ⚠️ Credenciais do Supabase não configuradas, usando localStorage');
                debug('Credenciais do Supabase não configuradas, usando localStorage');
            }
        } catch (error) {
            console.error('[CASAL MEL] ❌ Erro ao inicializar Supabase:', error);
            debug('Erro ao inicializar Supabase:', error);
            this.useSupabase = false;
        }
    }

    // Tenta inicializar o Supabase de várias formas
    tryInitSupabase() {
        try {
            let createClient = null;

            // Tenta encontrar createClient no window.supabase (CDN)
            if (typeof window.supabase !== 'undefined') {
                if (window.supabase.createClient) {
                    createClient = window.supabase.createClient;
                } else if (window.supabase.default && window.supabase.default.createClient) {
                    createClient = window.supabase.default.createClient;
                }
            }

            // Tenta encontrar createClient globalmente
            if (!createClient && typeof supabase !== 'undefined') {
                if (supabase.createClient) {
                    createClient = supabase.createClient;
                } else if (supabase.default && supabase.default.createClient) {
                    createClient = supabase.default.createClient;
                }
            }

            // Se encontrou createClient, inicializa
            if (createClient) {
                try {
                    this.supabase = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
                    this.useSupabase = true;
                    console.log('[CASAL MEL] ✅ Supabase inicializado com sucesso');
                    debug('Supabase inicializado com sucesso');
                    
                    // Recarrega os dados do Supabase
                    this.loadData();
                } catch (error) {
                    console.error('[CASAL MEL] ❌ Erro ao criar cliente Supabase:', error);
                    debug('Erro ao criar cliente Supabase:', error);
                    this.useSupabase = false;
                }
            } else {
                // Tenta carregar via módulo ES6
                this.loadSupabaseFromModule();
            }
        } catch (error) {
            debug('Erro ao tentar inicializar Supabase:', error);
            this.useSupabase = false;
        }
    }

    // Carrega Supabase via módulo ES6
    async loadSupabaseFromModule() {
        try {
            // Tenta importar o módulo (funciona se estiver usando um bundler)
            const module = await import('@supabase/supabase-js');
            const createClient = module.createClient || (module.default && module.default.createClient);
            
            if (createClient) {
                this.supabase = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
                this.useSupabase = true;
                debug('Supabase inicializado com sucesso (módulo ES6)');
                
                // Recarrega os dados do Supabase
        this.loadData();
            } else {
                debug('Supabase não disponível, usando localStorage como fallback');
                this.useSupabase = false;
            }
        } catch (error) {
            debug('Erro ao carregar Supabase do módulo, usando localStorage como fallback:', error);
            this.useSupabase = false;
        }
    }

    // Carrega dados do Supabase ou localStorage
    async loadData() {
        if (this.useSupabase && this.supabase) {
            try {
                debug('Carregando dados do Supabase...');
                
                // Carrega eventos
                const { data: eventosData, error: eventosError } = await this.supabase
                    .from('eventos')
                    .select('*')
                    .order('id', { ascending: true });

                if (eventosError) {
                    console.error('[CASAL MEL] ❌ Erro ao carregar eventos do Supabase:', eventosError);
                    debug('Erro ao carregar eventos do Supabase:', eventosError);
                    throw eventosError;
                }

                // Carrega shows
                const { data: showsData, error: showsError } = await this.supabase
                    .from('shows')
                    .select('*')
                    .order('id', { ascending: true });

                if (showsError) {
                    console.error('[CASAL MEL] ❌ Erro ao carregar shows do Supabase:', showsError);
                    debug('Erro ao carregar shows do Supabase:', showsError);
                    throw showsError;
                }

                // Converte dados do Supabase para formato interno
                this.eventos = (eventosData || []).map(e => this.convertFromSupabase(e, 'evento'));
                this.shows = (showsData || []).map(s => this.convertFromSupabase(s, 'show'));

                console.log('[CASAL MEL] ✅ Dados carregados do Supabase:', { eventos: this.eventos.length, shows: this.shows.length });
                debug('Dados carregados do Supabase:', { eventos: this.eventos.length, shows: this.shows.length });
                
                // Salva cache no localStorage
                this.saveCache();
                
                // Dispara evento de sincronização
                this.triggerSync();
            } catch (error) {
                console.error('[CASAL MEL] ❌ Erro ao carregar do Supabase, tentando localStorage:', error);
                debug('Erro ao carregar do Supabase, tentando localStorage:', error);
                this.loadFromLocalStorage();
            }
        } else {
            this.loadFromLocalStorage();
        }
    }

    // Carrega dados do localStorage (fallback)
    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('casal-mel-data');
            if (data) {
                const parsed = JSON.parse(data);
                this.eventos = parsed.eventos || [];
                this.shows = parsed.shows || [];
                debug('Dados carregados do localStorage:', { eventos: this.eventos.length, shows: this.shows.length });
            } else {
                // Carrega dados padrão
                this.loadDefaultData();
            }
        } catch (error) {
            debug('Erro ao carregar dados:', error);
            this.loadDefaultData();
        }
    }

    // Carrega dados padrão (vazio - não carrega dados mockados)
    loadDefaultData() {
        this.eventos = [];
        this.shows = [];
        debug('Sistema inicializado sem dados padrão - aguardando dados do Supabase');
    }

    // Converte dados do Supabase para formato interno
    convertFromSupabase(data, type) {
        return {
            id: data.id,
            titulo: data.titulo || '',
            data: data.data || '',
            diaSemana: data.dia_semana || '',
            local: data.local || '',
            descricao: data.descricao || '',
            whatsapp: data.whatsapp || '',
            imagem: data.imagem || '',
            ativo: data.ativo !== undefined ? data.ativo : true,
            criadoEm: data.criado_em || new Date().toISOString()
        };
    }

    // Converte dados internos para formato do Supabase
    convertToSupabase(data) {
        return {
            titulo: data.titulo || '',
            data: data.data || '',
            dia_semana: data.diaSemana || '',
            local: data.local || '',
            descricao: data.descricao || '',
            whatsapp: data.whatsapp || '',
            imagem: data.imagem || '',
            ativo: data.ativo !== undefined ? data.ativo : true
        };
    }

    // Salva dados no Supabase ou localStorage
    async saveData() {
        if (this.useSupabase && this.supabase) {
            try {
                // Sincroniza eventos
                const eventosSupabase = this.eventos.map(e => this.convertToSupabase(e));
                
                // Para cada evento, verifica se existe ou cria/atualiza
                for (let i = 0; i < this.eventos.length; i++) {
                    const evento = this.eventos[i];
                    const eventoData = this.convertToSupabase(evento);
                    
                    if (evento.id) {
                        // Atualiza existente
                        const { error } = await this.supabase
                            .from('eventos')
                            .update(eventoData)
                            .eq('id', evento.id);
                        
                        if (error) {
                            debug('Erro ao atualizar evento no Supabase:', error);
                        }
                    } else {
                        // Cria novo
                        const { data, error } = await this.supabase
                            .from('eventos')
                            .insert([eventoData])
                            .select()
                            .single();
                        
                        if (error) {
                            debug('Erro ao criar evento no Supabase:', error);
                        } else if (data) {
                            // Atualiza o ID local
                            this.eventos[i].id = data.id;
                        }
                    }
                }

                // Sincroniza shows
                for (let i = 0; i < this.shows.length; i++) {
                    const show = this.shows[i];
                    const showData = this.convertToSupabase(show);
                    
                    if (show.id) {
                        // Atualiza existente
                        const { error } = await this.supabase
                            .from('shows')
                            .update(showData)
                            .eq('id', show.id);
                        
                        if (error) {
                            debug('Erro ao atualizar show no Supabase:', error);
                        }
                    } else {
                        // Cria novo
                        const { data, error } = await this.supabase
                            .from('shows')
                            .insert([showData])
                            .select()
                            .single();
                        
                        if (error) {
                            debug('Erro ao criar show no Supabase:', error);
                        } else if (data) {
                            // Atualiza o ID local
                            this.shows[i].id = data.id;
                        }
                    }
                }

                console.log('[CASAL MEL] ✅ Dados salvos no Supabase com sucesso');
                debug('Dados salvos no Supabase');
                
                // Salva cache no localStorage
                this.saveCache();
                
                // Dispara evento de sincronização
                this.triggerSync();
            } catch (error) {
                console.error('[CASAL MEL] ❌ Erro ao salvar no Supabase:', error);
                debug('Erro ao salvar no Supabase:', error);
                // Fallback para localStorage
                this.saveToLocalStorage();
            }
        } else {
            this.saveToLocalStorage();
        }
    }

    // Salva cache no localStorage
    saveCache() {
        try {
            const data = {
                eventos: this.eventos,
                shows: this.shows,
                lastUpdate: Date.now()
            };
            localStorage.setItem('casal-mel-data', JSON.stringify(data));
        } catch (error) {
            debug('Erro ao salvar cache:', error);
        }
    }

    // Salva dados no localStorage (fallback)
    saveToLocalStorage() {
        try {
            const data = {
                eventos: this.eventos,
                shows: this.shows,
                lastUpdate: Date.now()
            };
            localStorage.setItem('casal-mel-data', JSON.stringify(data));
            debug('Dados salvos no localStorage');
            
            // Dispara evento de sincronização
            this.triggerSync();
        } catch (error) {
            debug('Erro ao salvar dados:', error);
        }
    }

    // Dispara sincronização
    triggerSync() {
        // CustomEvent
        window.dispatchEvent(new CustomEvent('data-updated', {
            detail: { eventos: this.eventos, shows: this.shows }
        }));

        // BroadcastChannel
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                const channel = new BroadcastChannel('casal-mel-sync');
                channel.postMessage({
                    type: 'data-updated',
                    eventos: this.eventos,
                    shows: this.shows
                });
                channel.close();
            } catch (error) {
                debug('Erro no BroadcastChannel:', error);
            }
        }

        // localStorage trigger
        localStorage.setItem('casal-mel-sync', Date.now().toString());
        localStorage.removeItem('casal-mel-sync');
    }

    // ========================================
    // EVENTOS
    // ========================================

    // Adiciona evento
    async addEvento(evento) {
        let novoEvento = {
            ...evento,
            id: this.useSupabase ? null : this.getNextEventoId(), // ID será gerado pelo Supabase
            ativo: true,
            criadoEm: new Date().toISOString()
        };
        
        // Se usar Supabase, insere diretamente
        if (this.useSupabase && this.supabase) {
            try {
                console.log('[CASAL MEL] 🔄 Tentando salvar evento no Supabase...', novoEvento);
                const eventoData = this.convertToSupabase(novoEvento);
                console.log('[CASAL MEL] 📤 Dados convertidos para Supabase:', eventoData);
                const { data, error } = await this.supabase
                    .from('eventos')
                    .insert([eventoData])
                    .select()
                    .single();
                console.log('[CASAL MEL] 📥 Resposta do Supabase:', { data, error });
                
                if (error) {
                    console.error('[CASAL MEL] ❌ Erro ao adicionar evento no Supabase:', error);
                    debug('Erro ao adicionar evento no Supabase:', error);
                    // Fallback para local
                    novoEvento.id = this.getNextEventoId();
                    this.eventos.push(novoEvento);
                    await this.saveData();
                } else if (data) {
                    // Converte de volta para formato interno
                    novoEvento = this.convertFromSupabase(data, 'evento');
                    this.eventos.push(novoEvento);
                    console.log('[CASAL MEL] ✅ Evento salvo no Supabase com sucesso:', novoEvento);
                    this.saveCache();
                    this.triggerSync();
                } else {
                    console.error('[CASAL MEL] ❌ Nenhum dado retornado do Supabase ao adicionar evento');
                    novoEvento.id = this.getNextEventoId();
                    this.eventos.push(novoEvento);
                    await this.saveData();
                }
            } catch (error) {
                debug('Erro ao adicionar evento:', error);
                novoEvento.id = this.getNextEventoId();
                this.eventos.push(novoEvento);
                await this.saveData();
            }
        } else {
            console.warn('[CASAL MEL] ⚠️ Supabase não disponível, salvando apenas no localStorage');
        this.eventos.push(novoEvento);
            await this.saveData();
        }
        
        debug('Evento adicionado:', novoEvento);
        return novoEvento;
    }

    // Atualiza evento
    async updateEvento(id, updates) {
        const index = this.eventos.findIndex(e => e.id === id);
        if (index !== -1) {
            this.eventos[index] = { ...this.eventos[index], ...updates };
            
            // Se usar Supabase, atualiza diretamente
            if (this.useSupabase && this.supabase) {
                try {
                    const eventoData = this.convertToSupabase(this.eventos[index]);
                    const { error } = await this.supabase
                        .from('eventos')
                        .update(eventoData)
                        .eq('id', id);
                    
                    if (error) {
                        debug('Erro ao atualizar evento no Supabase:', error);
                        await this.saveData(); // Fallback
                    } else {
                        this.saveCache();
                        this.triggerSync();
                    }
                } catch (error) {
                    debug('Erro ao atualizar evento:', error);
                    await this.saveData(); // Fallback
                }
            } else {
                await this.saveData();
            }
            
            debug('Evento atualizado:', this.eventos[index]);
            return this.eventos[index];
        }
        return null;
    }

    // Remove evento
    async removeEvento(id) {
        const index = this.eventos.findIndex(e => e.id === id);
        if (index !== -1) {
            const evento = this.eventos[index];
            
            // Se usar Supabase, remove diretamente
            if (this.useSupabase && this.supabase) {
                try {
                    const { error } = await this.supabase
                        .from('eventos')
                        .delete()
                        .eq('id', id);
                    
                    if (error) {
                        debug('Erro ao remover evento do Supabase:', error);
                        // Fallback para local
                        this.eventos.splice(index, 1);
                        await this.saveData();
                    } else {
                        this.eventos.splice(index, 1);
                        this.saveCache();
                        this.triggerSync();
                    }
                } catch (error) {
                    debug('Erro ao remover evento:', error);
                    this.eventos.splice(index, 1);
                    await this.saveData();
                }
            } else {
                this.eventos.splice(index, 1);
                await this.saveData();
            }
            
            debug('Evento removido:', evento);
            return evento;
        }
        return null;
    }

    // Obtém evento por ID
    getEvento(id) {
        return this.eventos.find(e => e.id === id);
    }

    // Obtém todos os eventos ativos
    getEventosAtivos() {
        return this.eventos.filter(e => e.ativo);
    }

    // ========================================
    // SHOWS
    // ========================================

    // Adiciona show
    async addShow(show) {
        let novoShow = {
            ...show,
            id: this.useSupabase ? null : this.getNextShowId(), // ID será gerado pelo Supabase
            ativo: true,
            criadoEm: new Date().toISOString()
        };
        
        // Se usar Supabase, insere diretamente
        if (this.useSupabase && this.supabase) {
            try {
                const showData = this.convertToSupabase(novoShow);
                const { data, error } = await this.supabase
                    .from('shows')
                    .insert([showData])
                    .select()
                    .single();
                
                if (error) {
                    console.error('[CASAL MEL] ❌ Erro ao adicionar show no Supabase:', error);
                    debug('Erro ao adicionar show no Supabase:', error);
                    // Fallback para local
                    novoShow.id = this.getNextShowId();
                    this.shows.push(novoShow);
                    await this.saveData();
                } else if (data) {
                    // Converte de volta para formato interno
                    novoShow = this.convertFromSupabase(data, 'show');
                    this.shows.push(novoShow);
                    console.log('[CASAL MEL] ✅ Show salvo no Supabase com sucesso:', novoShow);
                    this.saveCache();
                    this.triggerSync();
                } else {
                    console.error('[CASAL MEL] ❌ Nenhum dado retornado do Supabase ao adicionar show');
                    novoShow.id = this.getNextShowId();
                    this.shows.push(novoShow);
                    await this.saveData();
                }
            } catch (error) {
                debug('Erro ao adicionar show:', error);
                novoShow.id = this.getNextShowId();
                this.shows.push(novoShow);
                await this.saveData();
            }
        } else {
            console.warn('[CASAL MEL] ⚠️ Supabase não disponível, salvando apenas no localStorage');
        this.shows.push(novoShow);
            await this.saveData();
        }
        
        debug('Show adicionado:', novoShow);
        return novoShow;
    }

    // Atualiza show
    async updateShow(id, updates) {
        const index = this.shows.findIndex(s => s.id === id);
        if (index !== -1) {
            this.shows[index] = { ...this.shows[index], ...updates };
            
            // Se usar Supabase, atualiza diretamente
            if (this.useSupabase && this.supabase) {
                try {
                    const showData = this.convertToSupabase(this.shows[index]);
                    const { error } = await this.supabase
                        .from('shows')
                        .update(showData)
                        .eq('id', id);
                    
                    if (error) {
                        debug('Erro ao atualizar show no Supabase:', error);
                        await this.saveData(); // Fallback
                    } else {
                        this.saveCache();
                        this.triggerSync();
                    }
                } catch (error) {
                    debug('Erro ao atualizar show:', error);
                    await this.saveData(); // Fallback
                }
            } else {
                await this.saveData();
            }
            
            debug('Show atualizado:', this.shows[index]);
            return this.shows[index];
        }
        return null;
    }

    // Remove show
    async removeShow(id) {
        const index = this.shows.findIndex(s => s.id === id);
        if (index !== -1) {
            const show = this.shows[index];
            
            // Se usar Supabase, remove diretamente
            if (this.useSupabase && this.supabase) {
                try {
                    const { error } = await this.supabase
                        .from('shows')
                        .delete()
                        .eq('id', id);
                    
                    if (error) {
                        debug('Erro ao remover show do Supabase:', error);
                        // Fallback para local
                        this.shows.splice(index, 1);
                        await this.saveData();
                    } else {
                        this.shows.splice(index, 1);
                        this.saveCache();
                        this.triggerSync();
                    }
                } catch (error) {
                    debug('Erro ao remover show:', error);
                    this.shows.splice(index, 1);
                    await this.saveData();
                }
            } else {
                this.shows.splice(index, 1);
                await this.saveData();
            }
            
            debug('Show removido:', show);
            return show;
        }
        return null;
    }

    // Obtém show por ID
    getShow(id) {
        return this.shows.find(s => s.id === id);
    }

    // Obtém todos os shows ativos
    getShowsAtivos() {
        return this.shows.filter(s => s.ativo);
    }

    // ========================================
    // UTILITÁRIOS
    // ========================================

    // Obtém próximo ID de evento
    getNextEventoId() {
        return Math.max(...this.eventos.map(e => e.id), 0) + 1;
    }

    // Obtém próximo ID de show
    getNextShowId() {
        return Math.max(...this.shows.map(s => s.id), 0) + 1;
    }

    // Limpa todos os dados
    clearAll() {
        this.eventos = [];
        this.shows = [];
        this.saveData();
        debug('Todos os dados foram limpos');
    }

    // Recarrega dados padrão
    reloadDefaultData() {
        this.loadDefaultData();
        debug('Dados padrão recarregados');
    }
}

// Instância global do gerenciador de dados
// Proteção contra erros de inicialização
try {
    window.dataManager = new DataManager();
    console.log('[CASAL MEL] ✅ DataManager inicializado:', window.dataManager);
} catch (error) {
    console.error('[CASAL MEL] ❌ Erro ao inicializar DataManager:', error);
    // Cria uma instância básica para não quebrar o site
    window.dataManager = {
        eventos: [],
        shows: [],
        getEventosAtivos: () => [],
        getShowsAtivos: () => [],
        getEvento: () => null,
        getShow: () => null
    };
}
