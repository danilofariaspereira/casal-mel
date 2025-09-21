// Configuração global do projeto
window.CASAL_MEL_CONFIG = {
    // URLs base para diferentes ambientes
    baseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? '' 
        : window.location.origin,
    
    // Caminho das imagens
    imgPath: 'img/',
    
    // Dados padrão
    defaultData: {
        eventos: [
            {
                id: 1,
                titulo: "Noite de Gala Casal Mel",
                data: "20 de Janeiro de 2024",
                local: "Mansão Imperial, Rio de Janeiro",
                descricao: "Uma noite inesquecível com música ao vivo, jantar requintado e a presença especial do Casal Mel. Vista seu melhor traje e venha celebrar conosco!",
                whatsapp: "21967187138",
                imagem: "img/evento-01.jpeg"
            },
            {
                id: 2,
                titulo: "Transmissão dos Jogos",
                data: "25 de Janeiro de 2024",
                local: "Casa do Casal Mel, Rio de Janeiro",
                descricao: "TRANSMISSÃO DOS JOGOS\nSORTEIOS DE BALDE DE CERVEJAS P/ QUEM ESTIVER C/ CAMISA DE TIME (QUALQUER TIME)\nPALPITE PREMIADO\nCHEGUE ANTES DO JOGO COMEÇAR, FAÇA SEU PALPITE PREMIADO, ACERTOU O PLACAR GANHOU R$100\nDEGUSTAÇÃO DE CALDO🍵\nQUARTO DA SACANAGEM HOTWIFE SRA.MEL🔥😈\nDJ FABYANO🎶🎤\nPiscina, Cabines Glory Hole, Quarto de Casal, Quarto Aquário, Quarto Coletivo\nValores: 👇🏼\n🕺💃 CASAL ENTRADA GRÁTIS A NOITE TODA S/ BEBIDAS E COOLER, C/ COLLER E BEBIDAS R$50,00\n💃 SOLTEIRAS ENTRADA GRÁTIS A NOITE TODA S/ COOLER E BEBIDAS, C/ COOLER E BEBIDAS R$20\n🕺 SOLTEIROS R$80 ANTECIPADO NO PIX, NA HORA R$100",
                whatsapp: "21967187138",
                imagem: "img/evento-02.jpeg"
            },
            {
                id: 3,
                titulo: "Festa Aquática",
                data: "30 de Janeiro de 2024",
                local: "Piscina Privativa, Rio de Janeiro",
                descricao: "Uma festa aquática exclusiva com piscina aquecida, drinks especiais e muita diversão. Traga sua roupa de banho e venha se refrescar conosco!",
                whatsapp: "21971494252",
                imagem: "img/evento-03.jpeg"
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
                imagem: "img/evento-04.jpeg"
            },
            {
                id: 2,
                titulo: "Noite de Jazz",
                data: "22 de Fevereiro de 2024",
                local: "Clube de Jazz, Rio de Janeiro",
                descricao: "Uma noite especial de jazz com a Sra. Mel e convidados especiais. Ambiente sofisticado e música de qualidade.",
                whatsapp: "21967187138",
                imagem: "img/evento-01.jpeg"
            }
        ]
    }
};

// Função para obter URL completa da imagem
function getImageUrl(imagePath) {
    if (!imagePath) return '';
    
    // Se já é uma URL completa, retorna como está
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
        return imagePath;
    }
    
    // Se começa com 'img/', usa o caminho relativo
    if (imagePath.startsWith('img/')) {
        return imagePath;
    }
    
    // Caso contrário, adiciona o caminho da pasta img
    return window.CASAL_MEL_CONFIG.imgPath + imagePath;
}

// Função para obter URL base
function getBaseUrl() {
    return window.CASAL_MEL_CONFIG.baseUrl;
}

// Exportar funções globalmente
window.getImageUrl = getImageUrl;
window.getBaseUrl = getBaseUrl;