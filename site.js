// ========================================
// SITE PÚBLICO - CASAL MEL
// ========================================

class SiteController {
    constructor() {
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
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                const menu = document.getElementById('mobile-menu');
                if (menu) {
                    menu.classList.toggle('hidden');
                }
            });
        }

        // Fechar menu ao clicar em um link
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
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
        // Aguarda o dataManager estar disponível
        if (window.dataManager) {
            debug('Carregando dados no site');
            this.renderEventos();
            this.renderShows();
        } else {
            debug('DataManager não disponível, tentando novamente...');
            // Tenta novamente após um pequeno delay
            setTimeout(() => {
                this.loadData();
            }, 100);
        }
    }

    renderEventos() {
        const container = document.getElementById('eventos-container');
        if (!container) {
            debug('Container de eventos não encontrado');
            return;
        }

        const eventos = window.dataManager ? window.dataManager.getEventosAtivos() : [];
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
            
            return `
                <div class="event-card">
                    <div class="image-container">
                        <img src="${imagemUrl}" alt="${evento.titulo}" class="event-image">
                    </div>
                    <div class="content">
                        <h3>${evento.titulo}</h3>
                        <p>
                            <i class="fas fa-calendar mr-2"></i>${evento.data}
                        </p>
                        <p>
                            <i class="fas fa-map-marker-alt mr-2"></i>${evento.local}
                        </p>
                        <button onclick="openEventoModal(${evento.id})" class="btn">
                            <i class="fas fa-info-circle mr-2"></i>Saiba Mais
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderShows() {
        const container = document.getElementById('shows-container');
        if (!container) {
            debug('Container de shows não encontrado');
            return;
        }

        const shows = window.dataManager ? window.dataManager.getShowsAtivos() : [];
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
            
            return `
                <div class="show-card">
                    <div class="image-container">
                        <img src="${imagemUrl}" alt="${show.titulo}" class="show-image">
                    </div>
                    <div class="content">
                        <h3>${show.titulo}</h3>
                        <p>
                            <i class="fas fa-calendar mr-2"></i>${show.data}
                        </p>
                        <p>
                            <i class="fas fa-map-marker-alt mr-2"></i>${show.local}
                        </p>
                        <button onclick="openShowModal(${show.id})" class="btn">
                            <i class="fas fa-info-circle mr-2"></i>Saiba Mais
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    openEventoModal(id) {
        const evento = window.dataManager.getEvento(id);
        if (!evento) return;

        // Esconde o menu
        const header = document.querySelector('header');
        if (header) {
            header.style.display = 'none';
        }

        // Preenche modal
        document.getElementById('modal-titulo-evento').textContent = evento.titulo;
        document.getElementById('modal-descricao-evento').innerHTML = evento.descricao.replace(/\n/g, '<br>');
        document.getElementById('modal-data-evento').textContent = `Data: ${evento.data}`;
        document.getElementById('modal-local-evento').textContent = `Local: ${evento.local}`;
        document.getElementById('modal-imagem-evento').src = getImageUrl(evento.imagem);
        
        // Configura WhatsApp
        const mensagem = encodeURIComponent("Olá, vim através do seu site. Gostaria de saber mais informações sobre eventos.");
        document.getElementById('modal-whatsapp-evento').href = `https://wa.me/55${evento.whatsapp}?text=${mensagem}`;
        
        // Abre modal
        document.getElementById('evento-modal').classList.remove('hidden');
        document.getElementById('evento-modal').classList.add('flex');
    }

    openShowModal(id) {
        const show = window.dataManager.getShow(id);
        if (!show) return;

        // Esconde o menu
        const header = document.querySelector('header');
        if (header) {
            header.style.display = 'none';
        }

        // Preenche modal
        document.getElementById('modal-titulo-show').textContent = show.titulo;
        document.getElementById('modal-descricao-show').innerHTML = show.descricao.replace(/\n/g, '<br>');
        document.getElementById('modal-data-show').textContent = `Data: ${show.data}`;
        document.getElementById('modal-local-show').textContent = `Local: ${show.local}`;
        document.getElementById('modal-imagem-show').src = getImageUrl(show.imagem);
        
        // Configura WhatsApp
        const mensagem = encodeURIComponent("Olá, vim através do seu site. Gostaria de saber mais sobre shows.");
        document.getElementById('modal-whatsapp-show').href = `https://wa.me/55${show.whatsapp}?text=${mensagem}`;
        
        // Abre modal
        document.getElementById('show-modal').classList.remove('hidden');
        document.getElementById('show-modal').classList.add('flex');
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

// Funções globais
function openEventoModal(id) {
    window.siteController.openEventoModal(id);
}

function openShowModal(id) {
    window.siteController.openShowModal(id);
}

function closeModal(modalId) {
    window.siteController.closeModal(modalId);
}

function fecharModal(modalId) {
    window.siteController.closeModal(modalId);
}

function fecharModalAoClicarFora(event, modalId) {
    if (event.target.id === modalId) {
        window.siteController.closeModal(modalId);
    }
}

// Inicializa o controlador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.siteController = new SiteController();
});
