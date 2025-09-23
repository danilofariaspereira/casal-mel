// ========================================
// SISTEMA DE DADOS - CASAL MEL
// ========================================

class DataManager {
    constructor() {
        this.eventos = [];
        this.shows = [];
        this.init();
    }

    init() {
        debug('Inicializando sistema de dados');
        this.loadData();
    }

    // Carrega dados do localStorage
    loadData() {
        try {
            const data = localStorage.getItem('casal-mel-data');
            if (data) {
                const parsed = JSON.parse(data);
                this.eventos = parsed.eventos || [];
                this.shows = parsed.shows || [];
                debug('Dados carregados:', { eventos: this.eventos.length, shows: this.shows.length });
                debug('Eventos carregados:', this.eventos);
                debug('Shows carregados:', this.shows);
            } else {
                // Carrega dados padrão
                this.loadDefaultData();
            }
        } catch (error) {
            debug('Erro ao carregar dados:', error);
            this.loadDefaultData();
        }
    }

    // Carrega dados padrão
    loadDefaultData() {
        this.eventos = [...window.CASAL_MEL_CONFIG.defaultData.eventos];
        this.shows = [...window.CASAL_MEL_CONFIG.defaultData.shows];
        this.saveData();
        debug('Dados padrão carregados');
    }

    // Salva dados no localStorage
    saveData() {
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
    addEvento(evento) {
        const novoEvento = {
            ...evento,
            id: this.getNextEventoId(),
            ativo: true,
            criadoEm: new Date().toISOString()
        };
        
        this.eventos.push(novoEvento);
        this.saveData();
        debug('Evento adicionado:', novoEvento);
        return novoEvento;
    }

    // Atualiza evento
    updateEvento(id, updates) {
        const index = this.eventos.findIndex(e => e.id === id);
        if (index !== -1) {
            this.eventos[index] = { ...this.eventos[index], ...updates };
            this.saveData();
            debug('Evento atualizado:', this.eventos[index]);
            return this.eventos[index];
        }
        return null;
    }

    // Remove evento
    removeEvento(id) {
        const index = this.eventos.findIndex(e => e.id === id);
        if (index !== -1) {
            const evento = this.eventos.splice(index, 1)[0];
            this.saveData();
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
    addShow(show) {
        const novoShow = {
            ...show,
            id: this.getNextShowId(),
            ativo: true,
            criadoEm: new Date().toISOString()
        };
        
        this.shows.push(novoShow);
        this.saveData();
        debug('Show adicionado:', novoShow);
        return novoShow;
    }

    // Atualiza show
    updateShow(id, updates) {
        const index = this.shows.findIndex(s => s.id === id);
        if (index !== -1) {
            this.shows[index] = { ...this.shows[index], ...updates };
            this.saveData();
            debug('Show atualizado:', this.shows[index]);
            return this.shows[index];
        }
        return null;
    }

    // Remove show
    removeShow(id) {
        const index = this.shows.findIndex(s => s.id === id);
        if (index !== -1) {
            const show = this.shows.splice(index, 1)[0];
            this.saveData();
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
window.dataManager = new DataManager();

// Debug para verificar se foi inicializado
console.log('DataManager inicializado:', window.dataManager);
