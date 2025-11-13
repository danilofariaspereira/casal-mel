// ========================================
// CONFIGURAÇÃO GLOBAL - CASAL MEL
// ========================================

window.CASAL_MEL_CONFIG = {
    // Configurações do sistema
    version: '2.0.0',
    debug: true,
    
    // URLs base
    baseUrl: window.location.origin,
    
    // Caminho das imagens
    imgPath: 'img/',
    
    // Configurações de login
    login: {
        adminUser: {
            username: 'admincasalmel',
            password: 'casalmel#2025@admin#',
            name: 'Admin Casal Mel'
        }
    },
    
    // Dados padrão dos eventos
    defaultData: {
        eventos: [
            {
                id: 1,
                titulo: "Noite de Gala Casal Mel",
                data: "20 de Janeiro de 2024",
                local: "Mansão Imperial, Rio de Janeiro",
                descricao: "Uma noite inesquecível com música ao vivo, jantar requintado e a presença especial do Casal Mel. Vista seu melhor traje e venha celebrar conosco!",
                whatsapp: "21967187138",
                imagem: "img/espaco-01.jpeg",
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 2,
                titulo: "Transmissão dos Jogos",
                data: "25 de Janeiro de 2024",
                local: "Casa do Casal Mel, Rio de Janeiro",
                descricao: "TRANSMISSÃO DOS JOGOS\nSORTEIOS DE BALDE DE CERVEJAS P/ QUEM ESTIVER C/ CAMISA DE TIME (QUALQUER TIME)\nPALPITE PREMIADO\nCHEGUE ANTES DO JOGO COMEÇAR, FAÇA SEU PALPITE PREMIADO, ACERTOU O PLACAR GANHOU R$100\nDEGUSTAÇÃO DE CALDO🍵\nQUARTO DA SACANAGEM HOTWIFE SRA.MEL🔥😈\nDJ FABYANO🎶🎤\nPiscina, Cabines Glory Hole, Quarto de Casal, Quarto Aquário, Quarto Coletivo\nValores: 👇🏼\n🕺💃 CASAL ENTRADA GRÁTIS A NOITE TODA S/ BEBIDAS E COOLER, C/ COLLER E BEBIDAS R$50,00\n💃 SOLTEIRAS ENTRADA GRÁTIS A NOITE TODA S/ COOLER E BEBIDAS, C/ COOLER E BEBIDAS R$20\n🕺 SOLTEIROS R$80 ANTECIPADO NO PIX, NA HORA R$100",
                whatsapp: "21967187138",
                imagem: "img/espaco-02.jpeg",
                ativo: true,
                criadoEm: new Date().toISOString()
            }
        ],
        shows: [
            {
                id: 1,
                titulo: "Show Acústico Sra. Mel",
                data: "15 de Fevereiro de 2024",
                local: "Teatro Municipal, Rio de Janeiro",
                descricao: "Um show intimista e acústico com a Sra. Mel apresentando seus maiores sucessos. Uma noite de música, emoção e conexão especial.",
                whatsapp: "21967187138",
                imagem: "img/espaco-03.jpeg",
                ativo: true,
                criadoEm: new Date().toISOString()
            }
        ]
    }
};

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

// Função para obter URL da imagem
function getImageUrl(imagePath) {
    // Se não há imagem ou é null/undefined, retorna imagem padrão
    if (!imagePath || imagePath === null || imagePath === undefined) {
        return 'img/espaco-01.jpeg';
    }
    
    // Converte para string se não for
    const path = String(imagePath);
    
    // Substituição de imagens antigas removidas
    const legacyImages = {
        'img/evento-01.jpeg': 'img/espaco-01.jpeg',
        'img/evento-02.jpeg': 'img/espaco-02.jpeg',
        'img/evento-03.jpeg': 'img/espaco-03.jpeg',
        'img/evento-04.jpeg': 'img/espaco-04.jpeg'
    };
    if (legacyImages[path]) {
        return legacyImages[path];
    }

    // Se já é uma URL completa, retorna como está
    if (path.startsWith('http') || path.startsWith('data:')) {
        return path;
    }
    
    // Se começa com 'img/', usa o caminho relativo
    if (path.startsWith('img/')) {
        return path;
    }
    
    // Caso contrário, adiciona o caminho da pasta img
    return window.CASAL_MEL_CONFIG.imgPath + path;
}

// Função para obter URL base
function getBaseUrl() {
    return window.CASAL_MEL_CONFIG.baseUrl;
}

// Função para debug
function debug(message, data = null) {
    if (window.CASAL_MEL_CONFIG.debug) {
        console.log(`[CASAL MEL] ${message}`, data || '');
    }
}

// Exportar funções globalmente
window.getImageUrl = getImageUrl;
window.getBaseUrl = getBaseUrl;
window.debug = debug;