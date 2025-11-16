// ========================================
// PAINEL ADMINISTRATIVO - CASAL MEL
// ========================================

class AdminController {
    constructor() {
        this.currentEventoId = null;
        this.currentShowId = null;
        this.init();
    }

    init() {
        debug('Inicializando painel administrativo');
        this.checkAuth();
        this.setupEventListeners();
        
        // Aguarda o dataManager estar disponível
        if (window.dataManager) {
            this.loadData();
        } else {
            setTimeout(() => {
                this.init();
            }, 100);
            return;
        }
        
        this.setupSync();
    }

    checkAuth() {
        if (!window.auth.isLoggedIn()) {
            debug('Usuário não logado, redirecionando...');
            window.location.href = 'login.html';
            return;
        }

        // Mostra informações do usuário
        const user = window.auth.getCurrentUser();
        document.getElementById('user-info').textContent = `Olá, ${user.name}`;
    }

    setupEventListeners() {
        // Formulário de evento
        document.getElementById('evento-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEvento();
        });

        // Formulário de show
        document.getElementById('show-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveShow();
        });

        // Upload de imagem - evento
        document.getElementById('evento-imagem').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'evento-imagem-preview');
        });

        // Upload de imagem - show
        document.getElementById('show-imagem').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'show-imagem-preview');
        });

        // Listener para mostrar/ocultar campos quando "Aguardando próxima data" for selecionado
        const showDiaSemanaSelect = document.getElementById('show-dia-semana');
        if (showDiaSemanaSelect) {
            showDiaSemanaSelect.addEventListener('change', (e) => {
                this.toggleShowCampos(e.target.value);
            });
        }

        // Menu mobile
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });
    }

    toggleShowCampos(diaSemana) {
        const isAguardando = diaSemana === 'Aguardando próxima data';
        const dataField = document.getElementById('show-data-field');
        const camposAdicionais = document.getElementById('show-campos-adicionais');
        const descricaoField = document.getElementById('show-descricao-field');
        const dataInput = document.getElementById('show-data');
        const localInput = document.getElementById('show-local');
        const whatsappInput = document.getElementById('show-whatsapp');

        if (isAguardando) {
            // Ocultar campos e tornar opcionais
            if (dataField) dataField.style.display = 'none';
            if (camposAdicionais) camposAdicionais.style.display = 'none';
            if (descricaoField) descricaoField.style.display = 'none';
            if (dataInput) dataInput.removeAttribute('required');
            if (localInput) localInput.removeAttribute('required');
            if (whatsappInput) whatsappInput.removeAttribute('required');
        } else {
            // Mostrar campos e tornar obrigatórios
            if (dataField) dataField.style.display = 'block';
            if (camposAdicionais) camposAdicionais.style.display = 'grid';
            if (descricaoField) descricaoField.style.display = 'block';
            if (dataInput) dataInput.setAttribute('required', 'required');
            if (localInput) localInput.setAttribute('required', 'required');
            if (whatsappInput) whatsappInput.setAttribute('required', 'required');
        }
    }

    setupSync() {
        // Escuta atualizações de dados
        window.addEventListener('data-updated', (e) => {
            debug('Dados atualizados via evento');
            this.loadData();
        });

        // Escuta BroadcastChannel
        if (typeof BroadcastChannel !== 'undefined') {
            const channel = new BroadcastChannel('casal-mel-sync');
            channel.addEventListener('message', (e) => {
                if (e.data.type === 'data-updated') {
                    debug('Dados atualizados via BroadcastChannel');
                    this.loadData();
                }
            });
        }

        // Escuta localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'casal-mel-sync') {
                debug('Dados atualizados via localStorage');
                this.loadData();
            }
        });

        // Polling para verificar mudanças
        setInterval(() => {
            this.checkForDataChanges();
        }, 2000);
    }

    checkForDataChanges() {
        const data = localStorage.getItem('casal-mel-data');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                const lastUpdate = parsed.lastUpdate || 0;
                const currentUpdate = window.lastAdminDataUpdate || 0;
                
                if (lastUpdate > currentUpdate) {
                    debug('Mudança detectada via polling');
                    this.loadData();
                    window.lastAdminDataUpdate = lastUpdate;
                }
            } catch (error) {
                debug('Erro ao verificar mudanças:', error);
            }
        }
    }

    loadData() {
        this.updateDashboard();
        this.renderEventos();
        this.renderShows();
        this.updateBackupStats();
    }

    updateDashboard() {
        const eventos = window.dataManager.getEventosAtivos();
        const shows = window.dataManager.getShowsAtivos();
        
        document.getElementById('total-eventos').textContent = window.dataManager.eventos.length;
        document.getElementById('total-shows').textContent = window.dataManager.shows.length;
        document.getElementById('eventos-ativos').textContent = eventos.length;
        document.getElementById('shows-ativos').textContent = shows.length;
    }

    renderEventos() {
        const container = document.getElementById('eventos-lista');
        if (!container) return;
        
        const eventos = window.dataManager ? window.dataManager.eventos : [];
    
        if (eventos.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-gray-500 text-xl">Nenhum evento cadastrado</p></div>';
            return;
        }
    
        container.innerHTML = eventos.map(evento => {
            const diaSemanaBadge = evento.diaSemana ? `<span class="text-xs px-2 py-1 rounded-full bg-yellow-500 text-black font-semibold mr-2">${evento.diaSemana}</span>` : '';
            return `
            <div class="card p-4">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="font-semibold text-gray-800 text-lg">${evento.titulo}</h3>
                    <div class="flex space-x-2">
                        <button onclick="editEvento(${evento.id})" class="text-blue-600 hover:text-blue-800 p-1">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteEvento(${evento.id})" class="text-red-600 hover:text-red-800 p-1">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="flex items-center mb-2">
                    ${diaSemanaBadge}
                    <p class="text-sm text-gray-600"><i class="fas fa-calendar mr-2"></i>${evento.data}</p>
                </div>
                <p class="text-sm text-gray-600 mb-3"><i class="fas fa-map-marker-alt mr-2"></i>${evento.local}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-gray-500">ID: ${evento.id}</span>
                    <span class="text-xs px-2 py-1 rounded-full ${evento.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${evento.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
            </div>
        `;
        }).join('');
    }

    renderShows() {
        const container = document.getElementById('shows-lista');
        if (!container) return;
        
        const shows = window.dataManager ? window.dataManager.shows : [];
    
        if (shows.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-gray-500 text-xl">Nenhum show cadastrado</p></div>';
            return;
        }
    
        container.innerHTML = shows.map(show => {
            const diaSemanaBadge = show.diaSemana ? `<span class="text-xs px-2 py-1 rounded-full bg-yellow-500 text-black font-semibold mr-2">${show.diaSemana}</span>` : '';
            return `
            <div class="card p-4">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="font-semibold text-gray-800 text-lg">${show.titulo}</h3>
                    <div class="flex space-x-2">
                        <button onclick="editShow(${show.id})" class="text-blue-600 hover:text-blue-800 p-1">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteShow(${show.id})" class="text-red-600 hover:text-red-800 p-1">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="flex items-center mb-2">
                    ${diaSemanaBadge}
                    <p class="text-sm text-gray-600"><i class="fas fa-calendar mr-2"></i>${show.data}</p>
                </div>
                <p class="text-sm text-gray-600 mb-3"><i class="fas fa-map-marker-alt mr-2"></i>${show.local}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-gray-500">ID: ${show.id}</span>
                    <span class="text-xs px-2 py-1 rounded-full ${show.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${show.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
            </div>
        `;
        }).join('');
    }

// ========================================
    // EVENTOS
// ========================================

    openEventModal(id = null) {
        this.currentEventoId = id;
    const modal = document.getElementById('evento-modal');
    const form = document.getElementById('evento-form');
    
    form.reset();
        this.hideImagePreview('evento-imagem-preview');
    
    if (id) {
            const evento = window.dataManager.getEvento(id);
        if (evento) {
                document.getElementById('evento-titulo').value = evento.titulo;
                document.getElementById('evento-data').value = evento.data;
                document.getElementById('evento-dia-semana').value = evento.diaSemana || '';
                document.getElementById('evento-local').value = evento.local;
                document.getElementById('evento-descricao').value = evento.descricao;
                document.getElementById('evento-whatsapp').value = evento.whatsapp;
                
                if (evento.imagem) {
                    this.showImagePreview(evento.imagem, 'evento-imagem-preview');
            }
        }
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

    async saveEvento() {
        const titulo = document.getElementById('evento-titulo').value;
        const data = document.getElementById('evento-data').value;
        const diaSemana = document.getElementById('evento-dia-semana').value;
        const local = document.getElementById('evento-local').value;
        const descricao = document.getElementById('evento-descricao').value;
        const whatsapp = document.getElementById('evento-whatsapp').value;
        const imagem = document.getElementById('evento-imagem').files[0];

        const eventoData = {
            titulo,
            data,
            diaSemana,
            local,
            descricao,
            whatsapp,
            imagem: imagem
        };

        // Validação básica
        if (!titulo || !data || !diaSemana || !local || !whatsapp) {
            this.showError('Preencha todos os campos obrigatórios');
            return;
        }

        // Sanitizar dados básicos
        const sanitizedData = {
            titulo: titulo.trim(),
            data: data.trim(),
            diaSemana: diaSemana.trim(),
            local: local.trim(),
            descricao: descricao.trim(),
            whatsapp: whatsapp.replace(/\D/g, '') // Remove caracteres não numéricos
        };

        let imagemData = null;
        if (imagem) {
            // Validação básica de imagem
            if (!imagem.type.startsWith('image/')) {
                this.showError('Por favor, selecione apenas arquivos de imagem');
                return;
            }
            
            if (imagem.size > 5 * 1024 * 1024) {
                this.showError('A imagem deve ter no máximo 5MB');
                return;
            }
            
            imagemData = await this.getImageData(imagem);
        }

        const finalData = {
            ...sanitizedData,
            imagem: imagemData
        };

        if (this.currentEventoId) {
            window.dataManager.updateEvento(this.currentEventoId, finalData);
            this.showSuccess('Evento atualizado com sucesso!');
        } else {
            window.dataManager.addEvento(finalData);
            this.showSuccess('Evento adicionado com sucesso!');
        }

        this.closeModal('evento-modal');
        this.loadData();
    }

    editEvento(id) {
        this.openEventModal(id);
    }

    deleteEvento(id) {
        if (confirm('Tem certeza que deseja deletar este evento?')) {
            window.dataManager.removeEvento(id);
            this.showSuccess('Evento deletado com sucesso!');
            this.loadData();
        }
    }

    // ========================================
    // SHOWS
    // ========================================

    openShowModal(id = null) {
        this.currentShowId = id;
        const modal = document.getElementById('show-modal');
        const form = document.getElementById('show-form');
        
        form.reset();
        this.hideImagePreview('show-imagem-preview');
        
        if (id) {
            const show = window.dataManager.getShow(id);
            if (show) {
                document.getElementById('show-titulo').value = show.titulo;
                document.getElementById('show-data').value = show.data || '';
                document.getElementById('show-dia-semana').value = show.diaSemana || '';
                document.getElementById('show-local').value = show.local || '';
                document.getElementById('show-descricao').value = show.descricao || '';
                document.getElementById('show-whatsapp').value = show.whatsapp || '';
                
                // Aplicar toggle baseado no dia da semana
                this.toggleShowCampos(show.diaSemana || '');
                
                if (show.imagem) {
                    this.showImagePreview(show.imagem, 'show-imagem-preview');
                }
            }
        } else {
            // Resetar campos ao abrir modal novo
            this.toggleShowCampos('');
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    async saveShow() {
        const titulo = document.getElementById('show-titulo').value;
        const data = document.getElementById('show-data').value;
        const diaSemana = document.getElementById('show-dia-semana').value;
        const local = document.getElementById('show-local').value;
        const descricao = document.getElementById('show-descricao').value;
        const whatsapp = document.getElementById('show-whatsapp').value;
        const imagem = document.getElementById('show-imagem').files[0];

        const isAguardando = diaSemana === 'Aguardando próxima data';

        // Validação básica
        if (!titulo || !diaSemana) {
            this.showError('Preencha o título e o dia da semana');
            return;
        }

        // Se não for "Aguardando próxima data", validar campos obrigatórios
        if (!isAguardando) {
            if (!data || !local || !whatsapp) {
                this.showError('Preencha todos os campos obrigatórios');
                return;
            }
        }

        // Validação de imagem (sempre obrigatória)
        if (!imagem) {
            // Verificar se já existe imagem salva (ao editar)
            const showExistente = this.currentShowId ? window.dataManager.getShow(this.currentShowId) : null;
            if (!showExistente || !showExistente.imagem) {
                this.showError('A imagem é obrigatória');
                return;
            }
        }

        // Sanitizar dados básicos
        const sanitizedData = {
            titulo: titulo.trim(),
            data: isAguardando ? '' : data.trim(),
            diaSemana: diaSemana.trim(),
            local: isAguardando ? '' : local.trim(),
            descricao: isAguardando ? '' : descricao.trim(),
            whatsapp: isAguardando ? '' : whatsapp.replace(/\D/g, '') // Remove caracteres não numéricos
        };

        let imagemData = null;
        if (imagem) {
            // Validação básica de imagem
            if (!imagem.type.startsWith('image/')) {
                this.showError('Por favor, selecione apenas arquivos de imagem');
                return;
            }
            
            if (imagem.size > 5 * 1024 * 1024) {
                this.showError('A imagem deve ter no máximo 5MB');
                return;
            }
            
            imagemData = await this.getImageData(imagem);
        } else if (this.currentShowId) {
            // Se estiver editando e não selecionou nova imagem, preservar a existente
            const showExistente = window.dataManager.getShow(this.currentShowId);
            if (showExistente && showExistente.imagem) {
                imagemData = showExistente.imagem;
            }
        }

        const finalData = {
            ...sanitizedData,
            imagem: imagemData
        };

        if (this.currentShowId) {
            window.dataManager.updateShow(this.currentShowId, finalData);
            this.showSuccess('Show atualizado com sucesso!');
        } else {
            window.dataManager.addShow(finalData);
            this.showSuccess('Show adicionado com sucesso!');
        }

        this.closeModal('show-modal');
        this.loadData();
    }

    editShow(id) {
        this.openShowModal(id);
    }

    deleteShow(id) {
    if (confirm('Tem certeza que deseja deletar este show?')) {
            window.dataManager.removeShow(id);
            this.showSuccess('Show deletado com sucesso!');
            this.loadData();
    }
}

// ========================================
    // UTILITÁRIOS
// ========================================

    getImageData(file) {
        if (!file) return Promise.resolve(null);
        
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    handleImageUpload(event, previewId) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
            this.showError('Por favor, selecione apenas arquivos de imagem');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
            this.showError('A imagem deve ter no máximo 5MB');
        return;
    }
    
    const reader = new FileReader();
        reader.onload = (e) => {
            this.showImagePreview(e.target.result, previewId);
    };
    reader.readAsDataURL(file);
}

    showImagePreview(src, previewId) {
    const preview = document.getElementById(previewId);
    const img = document.getElementById(previewId + '-img');
    
    if (preview && img) {
        img.src = src;
        preview.classList.remove('hidden');
    }
}

    hideImagePreview(previewId) {
        const preview = document.getElementById(previewId);
        if (preview) {
            preview.classList.add('hidden');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    showError(message) {
        window.showError(message);
    }

    showSuccess(message) {
        window.showSuccess(message);
    }

    syncData() {
        window.dataManager.triggerSync();
        this.showSuccess('Dados sincronizados com sucesso!');
    }

    updateBackupStats() {
        const stats = window.getBackupStats();
        
        document.getElementById('backup-eventos-count').textContent = stats.eventos;
        document.getElementById('backup-shows-count').textContent = stats.shows;
        
        if (stats.lastBackup) {
            const lastBackup = new Date(stats.lastBackup);
            const now = new Date();
            const diffMinutes = Math.floor((now - lastBackup) / (1000 * 60));
            
            if (diffMinutes < 60) {
                document.getElementById('backup-last-time').textContent = `${diffMinutes} min atrás`;
            } else if (diffMinutes < 1440) {
                const hours = Math.floor(diffMinutes / 60);
                document.getElementById('backup-last-time').textContent = `${hours}h atrás`;
            } else {
                const days = Math.floor(diffMinutes / 1440);
                document.getElementById('backup-last-time').textContent = `${days} dias atrás`;
            }
        } else {
            document.getElementById('backup-last-time').textContent = 'Nunca';
        }
    }

    handleImport() {
        const fileInput = document.getElementById('import-file');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showError('Selecione um arquivo para importar');
            return;
        }

        window.importData(file)
            .then(() => {
                this.loadData();
                fileInput.value = ''; // Limpa o input
            })
            .catch(error => {
                this.showError(error.message);
            });
    }

    logout() {
        window.auth.logout();
        window.location.href = 'login.html';
    }
}

// Funções globais
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const titles = {
        'dashboard': 'Dashboard',
        'eventos': 'Eventos',
        'shows': 'Shows',
        'backup': 'Backup',
        'configuracoes': 'Configurações'
    };
    document.getElementById('page-title').textContent = titles[sectionId];
}

function openEventModal(id = null) {
    window.adminController.openEventModal(id);
}

function openShowModal(id = null) {
    window.adminController.openShowModal(id);
}

function editEvento(id) {
    window.adminController.editEvento(id);
}

function deleteEvento(id) {
    window.adminController.deleteEvento(id);
}

function editShow(id) {
    window.adminController.editShow(id);
}

function deleteShow(id) {
    window.adminController.deleteShow(id);
}

function closeModal(modalId) {
    window.adminController.closeModal(modalId);
}

function syncData() {
    window.adminController.syncData();
}

function logout() {
    window.adminController.logout();
}

function handleImport() {
    window.adminController.handleImport();
}

// Inicializa o controlador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.adminController = new AdminController();
});
