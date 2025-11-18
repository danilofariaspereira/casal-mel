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
    
    // Dados padrão dos eventos (vazio - dados vêm apenas do Supabase)
    defaultData: {
        eventos: [],
        shows: []
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