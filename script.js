// ========================================
// SISTEMA DE DADOS LOCAL - CASAL MEL
// ========================================

// Dados iniciais
let eventos = [];
let shows = [];

// ========================================
// INICIALIZAÇÃO
// ========================================

function inicializarAplicacao() {
    console.log('🚀 Inicializando aplicação Casal Mel...');
    
    // Carrega dados do localStorage primeiro
    carregarDadosDoLocalStorage();
    
    // Carrega dados padrão se não houver dados salvos
    if (eventos.length === 0 && shows.length === 0) {
        carregarDadosPadrao();
    }
    
    // Inicializa componentes
    renderizarCardsEventos();
    renderizarCardsShows();
    
    // Inicializa menu mobile
    inicializarMenuMobile();
    
    // Inicializa modais
    inicializarModais();
    
    console.log('✅ Aplicação inicializada com sucesso!');
}

// ========================================
// SISTEMA DE DADOS
// ========================================

function carregarDadosDoLocalStorage() {
    try {
        const dadosSalvos = localStorage.getItem('casal-mel-dados');
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            eventos = dados.eventos || [];
            shows = dados.shows || [];
            console.log('📦 Dados carregados do localStorage:', dados);
        }
    } catch (error) {
        console.error('❌ Erro ao carregar dados do localStorage:', error);
    }
}

function salvarDadosNoLocalStorage() {
    try {
        const dados = {
            eventos: eventos,
            shows: shows,
            ultimaAtualizacao: Date.now()
        };
        localStorage.setItem('casal-mel-dados', JSON.stringify(dados));
        console.log('💾 Dados salvos no localStorage:', dados);
    } catch (error) {
        console.error('❌ Erro ao salvar dados no localStorage:', error);
    }
}

function carregarDadosPadrao() {
    // Dados padrão usando as imagens existentes
    eventos = [
        {
            id: 1,
            titulo: "Evento de Exemplo",
            data: "15 de Janeiro de 2024",
            local: "Local do Evento",
            descricao: "Descrição do evento de exemplo",
            imagem: "img/evento-01.jpeg",
            whatsapp: "21967187138"
        },
        {
            id: 2,
            titulo: "Transmissão dos Jogos",
            data: "20 de Janeiro de 2024",
            local: "Local Especial",
            descricao: "TRANSMISSÃO DOS JOGOS\n\nSORTEIOS DE BALDE DE CERVEJAS P/ QUEM ESTIVER C/ CAMISA DE TIME (QUALQUER TIME)\n\nPALPITE PREMIADO\nCHEGUE ANTES DO JOGO COMEÇAR, FAÇA SEU PALPITE PREMIADO, ACERTOU O PLACAR GANHOU R$100\n\nDEGUSTAÇÃO DE CALDO🍵\n\nQUARTO DA SACANAGEM HOTWIFE  SRA.MEL🔥😈\n\nDJ FABYANO🎶🎤\n\nPiscina, Cabines Glory Hole, Quarto de Casal, Quarto Aquário, Quarto Coletivo\n\nValores: 👇🏼\n\n🕺💃 CASAL ENTRADA GRÁTIS A NOITE TODA S/ BEBIDAS E COOLER, C/ COLLER E BEBIDAS R$50,00\n\n💃 SOLTEIRAS ENTRADA GRÁTIS A NOITE TODA S/ COOLER E BEBIDAS, C/ COOLER E BEBIDAS   R$20\n\n🕺 SOLTEIROS R$80 ANTECIPADO NO PIX, NA HORA R$100",
            imagem: "img/evento-02.jpeg",
            whatsapp: "21967187138"
        }
    ];
    
    shows = [
        {
            id: 1,
            titulo: "Show de Exemplo",
            data: "20 de Janeiro de 2024",
            local: "Local do Show",
            descricao: "Descrição do show de exemplo",
            imagem: "img/evento-03.jpeg",
            whatsapp: "21967187138"
        },
        {
            id: 2,
            titulo: "DJ Fabyano",
            data: "25 de Janeiro de 2024",
            local: "Local Especial",
            descricao: "Show exclusivo com DJ Fabyano\n\nMúsica ao vivo e muito mais!\n\nVenha se divertir conosco!",
            imagem: "img/evento-04.jpeg",
            whatsapp: "21967187138"
        }
    ];
    
    console.log('📋 Dados padrão carregados');
    salvarDadosNoLocalStorage();
}

// ========================================
// RENDERIZAÇÃO DE EVENTOS
// ========================================

function renderizarCardsEventos() {
    const container = document.getElementById('eventos-container');
    if (!container) return;
    
    if (eventos.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-2xl text-gray-400">Nenhum evento disponível</p></div>';
        return;
    }
    
    container.innerHTML = eventos.map(evento => `
        <div class="event-card card-hover">
            <img src="${evento.imagem}" alt="${evento.titulo}" class="w-full h-64 object-cover">
            <div class="content">
                <h3 class="text-xl font-bold text-yellow-400 mb-2">${evento.titulo}</h3>
                <p class="text-gray-300 mb-2"><i class="fas fa-calendar mr-2"></i>${evento.data}</p>
                <p class="text-gray-300 mb-4"><i class="fas fa-map-marker-alt mr-2"></i>${evento.local}</p>
                <button onclick="abrirModalEvento(${evento.id})" class="btn">
                    Saiba Mais
                </button>
            </div>
        </div>
    `).join('');
}

function abrirModalEvento(id) {
    const evento = eventos.find(e => e.id === id);
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
    document.getElementById('modal-imagem-evento').src = evento.imagem;
    // Define o número do WhatsApp baseado no tipo de evento
    const numeroWhatsApp = evento.whatsapp === '21967187138' ? '21967187138' : '21971494252';
    const mensagemEvento = encodeURIComponent("Olá, vim através do seu site. Gostaria de saber mais informações sobre eventos.");
    document.getElementById('modal-whatsapp-evento').href = `https://wa.me/55${numeroWhatsApp}?text=${mensagemEvento}`;
    
    // Abre modal
    document.getElementById('evento-modal').classList.remove('hidden');
    document.getElementById('evento-modal').classList.add('flex');
}

// ========================================
// RENDERIZAÇÃO DE SHOWS
// ========================================

function renderizarCardsShows() {
    const container = document.getElementById('shows-container');
    if (!container) return;
    
    if (shows.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-2xl text-gray-400">Nenhum show disponível</p></div>';
        return;
    }
    
    container.innerHTML = shows.map(show => `
        <div class="show-card card-hover">
            <img src="${show.imagem}" alt="${show.titulo}" class="w-full h-64 object-cover">
            <div class="content">
                <h3 class="text-xl font-bold text-yellow-400 mb-2">${show.titulo}</h3>
                <p class="text-gray-300 mb-2"><i class="fas fa-calendar mr-2"></i>${show.data}</p>
                <p class="text-gray-300 mb-4"><i class="fas fa-map-marker-alt mr-2"></i>${show.local}</p>
                <button onclick="abrirModalShow(${show.id})" class="btn">
                    Saiba Mais
                </button>
            </div>
        </div>
    `).join('');
}

function abrirModalShow(id) {
    const show = shows.find(s => s.id === id);
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
    document.getElementById('modal-imagem-show').src = show.imagem;
    // Define o número do WhatsApp baseado no tipo de show
    const numeroWhatsApp = show.whatsapp === '21967187138' ? '21967187138' : '21971494252';
    const mensagemShow = encodeURIComponent("Olá, vim através do seu site. Gostaria de saber mais sobre shows.");
    document.getElementById('modal-whatsapp-show').href = `https://wa.me/55${numeroWhatsApp}?text=${mensagemShow}`;
    
    // Abre modal
    document.getElementById('show-modal').classList.remove('hidden');
    document.getElementById('show-modal').classList.add('flex');
}

// ========================================
// SISTEMA DE MODAIS
// ========================================

function fecharModal(modalId) {
    console.log('🔒 Fechando modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        console.log('✅ Modal fechado:', modalId);
        
        // Mostra o menu novamente
        const header = document.querySelector('header');
        if (header) {
            header.style.display = 'block';
        }
    } else {
        console.log('❌ Modal não encontrado:', modalId);
    }
}

function fecharModalAoClicarFora(event, modalId) {
    if (event.target.id === modalId) {
        fecharModal(modalId);
    }
}

function inicializarModais() {
    // Fecha modal ao clicar fora
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-backdrop')) {
            fecharModal(e.target.id);
        }
    });
    
    // Fecha modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modais = document.querySelectorAll('.modal-backdrop');
            modais.forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    fecharModal(modal.id);
                }
            });
    }
  });
}

// ========================================
// MENU MOBILE
// ========================================

function inicializarMenuMobile() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    if (button && menu) {
        button.addEventListener('click', function() {
            // Toggle do menu
            menu.classList.toggle('hidden');
            menu.classList.toggle('show');
            
            // Rotaciona o ícone do hambúrguer
            button.classList.toggle('rotated');
            
            // Muda o ícone
            const icon = button.querySelector('i');
            if (menu.classList.contains('show')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Fecha o menu ao clicar em um link
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.add('hidden');
                menu.classList.remove('show');
                button.classList.remove('rotated');
                const icon = button.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!button.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
                menu.classList.remove('show');
                button.classList.remove('rotated');
                const icon = button.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// ========================================
// SISTEMA DE SINCRONIZAÇÃO
// ========================================

// Escuta atualizações do admin
function escutarAtualizacoesDoAdmin() {
    // Verifica localStorage periodicamente
    setInterval(function() {
        const dadosSalvos = localStorage.getItem('casal-mel-dados');
        if (dadosSalvos) {
            try {
                const dados = JSON.parse(dadosSalvos);
                const ultimaAtualizacao = dados.ultimaAtualizacao || 0;
                const ultimaAtualizacaoLocal = window.ultimaAtualizacaoLocal || 0;
                
                if (ultimaAtualizacao > ultimaAtualizacaoLocal) {
                    eventos = dados.eventos || eventos;
                    shows = dados.shows || shows;
                    
                    // Atualiza os componentes
                    renderizarCardsEventos();
                    renderizarCardsShows();
                    
                    window.ultimaAtualizacaoLocal = ultimaAtualizacao;
                    console.log('🔄 Dados atualizados via localStorage');
                }
            } catch (error) {
                console.error('❌ Erro ao verificar localStorage:', error);
            }
        }
    }, 2000); // Verifica a cada 2 segundos
}

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacao();
    escutarAtualizacoesDoAdmin();
});

// ========================================
// FUNÇÕES GLOBAIS (para uso nos modais)
// ========================================

// Funções globais para fechar modais
window.fecharModal = fecharModal;
window.fecharModalAoClicarFora = fecharModalAoClicarFora;