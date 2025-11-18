// ========================================
// SITE PÚBLICO - CASAL MEL
// ========================================

class SiteController {
    constructor() {
        this.espacoImages = [
            'img/espaco-01.jpeg',
            'img/espaco-02.jpeg',
            'img/espaco-03.jpeg',
            'img/espaco-04.jpeg',
            'img/espaco-05.jpeg',
            'img/espaco-06.jpeg'
        ];
        this.whatsappContato = '5521967187138';
        this.init();
    }

    init() {
        debug('Inicializando site público');
        this.setupEventListeners();
        this.loadData();
        this.setupSync();
    }

    setupEventListeners() {
        // Menu mobile
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            const openMenu = () => {
                mobileMenu.classList.remove('hidden');
                requestAnimationFrame(() => {
                    mobileMenu.classList.add('show');
                });
                mobileMenuBtn.classList.add('rotated');
            };

            const closeMenu = () => {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('rotated');
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 300);
            };

            mobileMenuBtn.addEventListener('click', () => {
                if (mobileMenu.classList.contains('show')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMenu();
                });
            });
        }

        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fechar modais ao clicar fora
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeModal(e.target.id);
            }
        });

        // Fechar modais com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modais = document.querySelectorAll('.modal-backdrop');
                modais.forEach(modal => {
                    if (!modal.classList.contains('hidden')) {
                        this.closeModal(modal.id);
                    }
                });
            }
        });

        const espacoBtn = document.getElementById('open-espaco-modal');
        if (espacoBtn) {
            espacoBtn.addEventListener('click', () => {
                this.openEspacoModal();
            });
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

        // Polling de backup
        setInterval(() => {
            this.checkForUpdates();
        }, 2000); // Reduzido para 2 segundos para melhor sincronização

        // Força carregamento inicial após 1 segundo
        setTimeout(() => {
            debug('Forçando carregamento inicial dos dados');
            this.loadData();
        }, 1000);
    }

    checkForUpdates() {
        const data = localStorage.getItem('casal-mel-data');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                const lastUpdate = parsed.lastUpdate || 0;
                const currentUpdate = window.lastDataUpdate || 0;
                
                if (lastUpdate > currentUpdate) {
                    debug('Atualização detectada via polling');
                    this.loadData();
                    window.lastDataUpdate = lastUpdate;
                }
            } catch (error) {
                debug('Erro ao verificar atualizações:', error);
            }
        }
    }

    loadData() {
        try {
            // Aguarda o dataManager estar disponível
            if (window.dataManager) {
                debug('Carregando dados no site');
                this.renderEventos();
                this.renderShows();
            } else {
                debug('DataManager não disponível, tentando novamente...');
                // Tenta novamente após um pequeno delay (máximo 5 segundos)
                if (!this.loadDataAttempts) this.loadDataAttempts = 0;
                this.loadDataAttempts++;
                
                if (this.loadDataAttempts < 50) { // 50 tentativas = 5 segundos
                    setTimeout(() => {
                        this.loadData();
                    }, 100);
                } else {
                    console.error('[CASAL MEL] ❌ DataManager não carregou após 5 segundos');
                    // Renderiza mensagem de erro ou dados vazios
                    this.renderEventos();
                    this.renderShows();
                }
            }
        } catch (error) {
            console.error('[CASAL MEL] ❌ Erro ao carregar dados no site:', error);
            // Renderiza mesmo com erro para não quebrar o site
            this.renderEventos();
            this.renderShows();
        }
    }

    renderEventos() {
        try {
            const container = document.getElementById('eventos-container');
            if (!container) {
                debug('Container de eventos não encontrado');
                return;
            }

            const eventos = (window.dataManager && typeof window.dataManager.getEventosAtivos === 'function') 
                ? window.dataManager.getEventosAtivos() 
                : [];
            debug('Renderizando eventos:', eventos);

            if (eventos.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-calendar-alt text-6xl text-white text-opacity-50 mb-4"></i>
                        <p class="text-2xl text-white text-opacity-75">Nenhum evento disponível no momento</p>
                        <p class="text-white text-opacity-50 mt-2">Volte em breve para novos eventos!</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = eventos.map(evento => {
                const imagemUrl = getImageUrl(evento.imagem);
                debug('Imagem do evento:', { evento: evento.titulo, imagem: evento.imagem, url: imagemUrl });
                
                const diaSemanaBadge = evento.diaSemana ? `
                    <div class="dia-semana-badge-top">
                        <i class="fas fa-calendar-day mr-2"></i>${evento.diaSemana}
                    </div>
                ` : '';
                
                return `
                    <div class="event-card">
                        ${diaSemanaBadge}
                        <div class="image-container">
                            <img src="${imagemUrl}" alt="${evento.titulo || 'Evento'}" class="event-image" loading="lazy">
                        </div>
                        <div class="content">
                            <button onclick="openEventoModal(${evento.id})" class="btn">
                                <i class="fas fa-info-circle mr-2"></i>Saiba Mais
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        } catch (error) {
            console.error('[CASAL MEL] ❌ Erro ao renderizar eventos:', error);
            const container = document.getElementById('eventos-container');
            if (container) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
                        <p class="text-xl text-white text-opacity-75">Erro ao carregar eventos</p>
                    </div>
                `;
            }
        }
    }

    renderShows() {
        try {
            const container = document.getElementById('shows-container');
            if (!container) {
                debug('Container de shows não encontrado');
                return;
            }

            const shows = (window.dataManager && typeof window.dataManager.getShowsAtivos === 'function') 
                ? window.dataManager.getShowsAtivos() 
                : [];
            debug('Renderizando shows:', shows);

            if (shows.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-music text-6xl text-white text-opacity-50 mb-4"></i>
                        <p class="text-2xl text-white text-opacity-75">Nenhum show disponível no momento</p>
                        <p class="text-white text-opacity-50 mt-2">Volte em breve para novos shows!</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = shows.map(show => {
                const imagemUrl = getImageUrl(show.imagem);
                debug('Imagem do show:', { show: show.titulo, imagem: show.imagem, url: imagemUrl });
                
                const diaSemanaBadge = show.diaSemana ? `
                    <div class="dia-semana-badge-top">
                        <i class="fas fa-calendar-day mr-2"></i>${show.diaSemana}
                    </div>
                ` : '';
                
                return `
                    <div class="show-card">
                        ${diaSemanaBadge}
                        <div class="image-container">
                            <img src="${imagemUrl}" alt="${show.titulo || 'Show'}" class="show-image" loading="lazy">
                        </div>
                        <div class="content">
                            <button onclick="openShowModal(${show.id})" class="btn">
                                <i class="fas fa-info-circle mr-2"></i>Saiba Mais
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        } catch (error) {
            console.error('[CASAL MEL] ❌ Erro ao renderizar shows:', error);
            const container = document.getElementById('shows-container');
            if (container) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
                        <p class="text-xl text-white text-opacity-75">Erro ao carregar shows</p>
                    </div>
                `;
            }
        }
    }

    openEventoModal(id) {
        try {
            if (!window.dataManager || typeof window.dataManager.getEvento !== 'function') {
                console.error('[CASAL MEL] ❌ DataManager não disponível');
                return;
            }
            
            const evento = window.dataManager.getEvento(id);
            if (!evento) {
                console.warn('[CASAL MEL] ⚠️ Evento não encontrado:', id);
                return;
            }

            // Esconde o menu
            const header = document.querySelector('header');
            if (header) {
                header.style.display = 'none';
            }

            // Preenche modal
            const tituloEl = document.getElementById('modal-titulo-evento');
            const descricaoEl = document.getElementById('modal-descricao-evento');
            const dataEl = document.getElementById('modal-data-evento');
            const localEl = document.getElementById('modal-local-evento');
            const imagemEl = document.getElementById('modal-imagem-evento');
            
            if (tituloEl) tituloEl.textContent = evento.titulo || '';
            if (descricaoEl) descricaoEl.innerHTML = (evento.descricao || '').replace(/\n/g, '<br>');
            const dataTexto = evento.diaSemana ? `${evento.diaSemana} - ${evento.data}` : (evento.data || '');
            if (dataEl) dataEl.textContent = `Data: ${dataTexto}`;
            if (localEl) localEl.textContent = `Local: ${evento.local || ''}`;
            if (imagemEl) imagemEl.src = getImageUrl(evento.imagem);

        const botaoEvento = document.getElementById('modal-whatsapp-evento');
        if (botaoEvento) {
            const mensagem = encodeURIComponent('Olá, Casal Mel, vim através do site de vocês e gostaria de saber mais sobre o evento.');
            const url = `https://wa.me/${this.whatsappContato}?text=${mensagem}`;
            botaoEvento.href = url;
            botaoEvento.onclick = (event) => {
                event.preventDefault();
                window.open(url, '_blank', 'noopener');
            };
        }

            // Abre modal
            const modal = document.getElementById('evento-modal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        } catch (error) {
            console.error('[CASAL MEL] ❌ Erro ao abrir modal de evento:', error);
        }
    }

    openEspacoModal() {
        const modal = document.getElementById('espaco-modal');
        if (!modal) {
            return;
        }

        const gallery = document.getElementById('espaco-gallery');
        if (gallery) {
            gallery.innerHTML = this.espacoImages.map((src, index) => {
                const imagemUrl = getImageUrl(src);
                return `
                    <figure class="espaco-thumb">
                        <img src="${imagemUrl}" alt="Foto do nosso espaço ${index + 1}" loading="lazy">
                    </figure>
                `;
            }).join('');
        }

        const header = document.querySelector('header');
        if (header) {
            header.style.display = 'none';
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    openShowModal(id) {
        try {
            if (!window.dataManager || typeof window.dataManager.getShow !== 'function') {
                console.error('[CASAL MEL] ❌ DataManager não disponível');
                return;
            }
            
            const show = window.dataManager.getShow(id);
            if (!show) {
                console.warn('[CASAL MEL] ⚠️ Show não encontrado:', id);
                return;
            }

            // Esconde o menu
            const header = document.querySelector('header');
            if (header) {
                header.style.display = 'none';
            }

            // Preenche modal
            const tituloEl = document.getElementById('modal-titulo-show');
            const descricaoEl = document.getElementById('modal-descricao-show');
            const dataEl = document.getElementById('modal-data-show');
            const localEl = document.getElementById('modal-local-show');
            const imagemEl = document.getElementById('modal-imagem-show');
            
            if (tituloEl) tituloEl.textContent = show.titulo || '';
            if (descricaoEl) descricaoEl.innerHTML = (show.descricao || '').replace(/\n/g, '<br>');
            const dataTexto = show.diaSemana ? `${show.diaSemana} - ${show.data}` : (show.data || '');
            if (dataEl) dataEl.textContent = `Data: ${dataTexto}`;
            if (localEl) localEl.textContent = `Local: ${show.local || ''}`;
            if (imagemEl) imagemEl.src = getImageUrl(show.imagem);

        const botaoShow = document.getElementById('modal-whatsapp-show');
        if (botaoShow) {
            const mensagem = encodeURIComponent('Olá, Casal Mel, vim através do site de vocês e gostaria de saber mais sobre o show.');
            const url = `https://wa.me/${this.whatsappContato}?text=${mensagem}`;
            botaoShow.href = url;
            botaoShow.onclick = (event) => {
                event.preventDefault();
                window.open(url, '_blank', 'noopener');
            };
        }

            // Abre modal
            const modal = document.getElementById('show-modal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        } catch (error) {
            console.error('[CASAL MEL] ❌ Erro ao abrir modal de show:', error);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Mostra o menu novamente
        const header = document.querySelector('header');
        if (header) {
            header.style.display = 'block';
        }
    }
}

// Funções globais com proteção contra erros
function openEventoModal(id) {
    try {
        if (window.siteController && typeof window.siteController.openEventoModal === 'function') {
            window.siteController.openEventoModal(id);
        } else {
            console.error('[CASAL MEL] ❌ SiteController não disponível');
        }
    } catch (error) {
        console.error('[CASAL MEL] ❌ Erro ao abrir modal de evento:', error);
    }
}

function openShowModal(id) {
    try {
        if (window.siteController && typeof window.siteController.openShowModal === 'function') {
            window.siteController.openShowModal(id);
        } else {
            console.error('[CASAL MEL] ❌ SiteController não disponível');
        }
    } catch (error) {
        console.error('[CASAL MEL] ❌ Erro ao abrir modal de show:', error);
    }
}

function openEspacoModal() {
    try {
        if (window.siteController && typeof window.siteController.openEspacoModal === 'function') {
            window.siteController.openEspacoModal();
        } else {
            console.error('[CASAL MEL] ❌ SiteController não disponível');
        }
    } catch (error) {
        console.error('[CASAL MEL] ❌ Erro ao abrir modal de espaço:', error);
    }
}

function closeModal(modalId) {
    try {
        if (window.siteController && typeof window.siteController.closeModal === 'function') {
            window.siteController.closeModal(modalId);
        }
    } catch (error) {
        console.error('[CASAL MEL] ❌ Erro ao fechar modal:', error);
        // Fallback: fecha modal diretamente
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
}

function fecharModal(modalId) {
    closeModal(modalId);
}

function fecharModalAoClicarFora(event, modalId) {
    try {
        if (event && event.target && event.target.id === modalId) {
            closeModal(modalId);
        }
    } catch (error) {
        console.error('[CASAL MEL] ❌ Erro ao fechar modal:', error);
    }
}

// Inicializa o controlador quando o DOM estiver carregado
// Usa múltiplos métodos para garantir que funcione em todos os navegadores/mobile
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteController);
} else {
    // DOM já carregado
    initSiteController();
}

function initSiteController() {
    try {
        window.siteController = new SiteController();
    } catch (error) {
        console.error('[CASAL MEL] ❌ Erro ao inicializar SiteController:', error);
        // Tenta novamente após um delay
        setTimeout(() => {
            try {
                window.siteController = new SiteController();
            } catch (retryError) {
                console.error('[CASAL MEL] ❌ Erro ao reinicializar SiteController:', retryError);
            }
        }, 500);
    }
}
