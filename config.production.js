// ========================================
// CONFIGURAÇÃO DE PRODUÇÃO - CASAL MEL
// ========================================

window.CASAL_MEL_CONFIG = {
    // Configurações do sistema
    version: '2.0.0',
    debug: false, // Desabilitado em produção
    
    // URLs base
    baseUrl: window.location.origin,
    
    // Caminho das imagens
    imgPath: 'img/',
    
    // Configurações de login
    login: {
        // Usuário de teste padrão
        testUser: {
            email: 'teste@teste',
            password: '123456',
            name: 'Usuário Teste'
        },
        // Configuração do Google (para implementar depois)
        googleClientId: 'YOUR_GOOGLE_CLIENT_ID'
    },
    
    // Configurações de produção
    production: {
        // Backup automático a cada 30 minutos
        autoBackupInterval: 30 * 60 * 1000,
        
        // Polling de sincronização mais lento em produção
        syncInterval: 5000, // 5 segundos
        
        // Limite de upload de imagem (5MB)
        maxImageSize: 5 * 1024 * 1024,
        
        // Timeout para operações
        timeout: 10000, // 10 segundos
        
        // Compressão de imagens
        compressImages: true,
        imageQuality: 0.8
    },
    
    // Configurações de segurança
    security: {
        // Validação de inputs
        validateInputs: true,
        
        // Sanitização de dados
        sanitizeData: true,
        
        // Rate limiting (opcional)
        rateLimit: {
            enabled: false,
            maxRequests: 100,
            windowMs: 60000 // 1 minuto
        }
    },
    
    // Configurações de performance
    performance: {
        // Lazy loading de imagens
        lazyLoading: true,
        
        // Preload de recursos críticos
        preloadCritical: true,
        
        // Cache de dados
        dataCache: true,
        cacheTimeout: 5 * 60 * 1000 // 5 minutos
    },
    
    // Configurações de notificações
    notifications: {
        // Notificações push
        pushEnabled: false,
        
        // Notificações in-app
        inAppEnabled: true,
        
        // Duração das notificações
        duration: 5000 // 5 segundos
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
                titulo: "Transmissão de Jogos",
                data: "25 de Janeiro de 2024",
                local: "Casa do Casal Mel",
                descricao: "Venha assistir aos melhores jogos conosco! Ambiente climatizado, petiscos deliciosos e muita diversão. Traga sua torcida!",
                whatsapp: "21967187138",
                imagem: "img/espaco-02.jpeg",
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 3,
                titulo: "Degustação Especial",
                data: "30 de Janeiro de 2024",
                local: "Casa do Casal Mel",
                descricao: "Uma experiência gastronômica única! Degustação de vinhos, queijos artesanais e pratos especiais preparados pelo Casal Mel.",
                whatsapp: "21967187138",
                imagem: "img/espaco-03.jpeg",
                ativo: true,
                criadoEm: new Date().toISOString()
            }
        ],
        shows: [
            {
                id: 1,
                titulo: "Show Acústico",
                data: "15 de Fevereiro de 2024",
                local: "Casa do Casal Mel",
                descricao: "Uma noite de música acústica com repertório especial. Ambiente intimista e acolhedor para uma experiência única.",
                whatsapp: "21967187138",
                imagem: "img/espaco-04.jpeg",
                ativo: true,
                criadoEm: new Date().toISOString()
            }
        ]
    }
};

// ========================================
// FUNÇÕES DE PRODUÇÃO
// ========================================

// Função para log em produção (apenas erros)
function logProduction(message, type = 'info') {
    if (type === 'error' || type === 'warn') {
        console.log(`[CASAL MEL PROD] ${message}`);
    }
}

// Função para backup automático
function setupAutoBackup() {
    if (window.CASAL_MEL_CONFIG.production.autoBackupInterval > 0) {
        setInterval(() => {
            try {
                const data = localStorage.getItem('casal-mel-data');
                if (data) {
                    // Aqui você pode implementar backup para serviço externo
                    logProduction('Backup automático realizado', 'info');
                }
            } catch (error) {
                logProduction('Erro no backup automático: ' + error.message, 'error');
            }
        }, window.CASAL_MEL_CONFIG.production.autoBackupInterval);
    }
}

// Função para compressão de imagens
function compressImage(file, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Função para validação de dados
function validateProductionData(data) {
    if (!window.CASAL_MEL_CONFIG.security.validateInputs) return true;
    
    try {
        // Validação básica
        if (!data || typeof data !== 'object') {
            throw new Error('Dados inválidos');
        }
        
        // Validação de eventos
        if (data.eventos && Array.isArray(data.eventos)) {
            data.eventos.forEach(evento => {
                if (!evento.titulo || evento.titulo.length < 3) {
                    throw new Error('Título do evento deve ter pelo menos 3 caracteres');
                }
                if (!evento.data || !evento.local) {
                    throw new Error('Data e local são obrigatórios');
                }
            });
        }
        
        // Validação de shows
        if (data.shows && Array.isArray(data.shows)) {
            data.shows.forEach(show => {
                if (!show.titulo || show.titulo.length < 3) {
                    throw new Error('Título do show deve ter pelo menos 3 caracteres');
                }
                if (!show.data || !show.local) {
                    throw new Error('Data e local são obrigatórios');
                }
            });
        }
        
        return true;
    } catch (error) {
        logProduction('Erro de validação: ' + error.message, 'error');
        return false;
    }
}

// Função para sanitização de dados
function sanitizeProductionData(data) {
    if (!window.CASAL_MEL_CONFIG.security.sanitizeData) return data;
    
    try {
        // Sanitização básica
        const sanitized = JSON.parse(JSON.stringify(data));
        
        // Sanitizar strings
        function sanitizeString(str) {
            if (typeof str !== 'string') return str;
            return str
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<[^>]*>/g, '')
                .trim();
        }
        
        // Aplicar sanitização recursivamente
        function sanitizeObject(obj) {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    obj[key] = sanitizeString(obj[key]);
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    sanitizeObject(obj[key]);
                }
            }
        }
        
        sanitizeObject(sanitized);
        return sanitized;
    } catch (error) {
        logProduction('Erro na sanitização: ' + error.message, 'error');
        return data;
    }
}

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

// Inicializar configurações de produção
document.addEventListener('DOMContentLoaded', () => {
    logProduction('Configuração de produção carregada', 'info');
    setupAutoBackup();
});

// Exportar funções para uso global
window.CASAL_MEL_PRODUCTION = {
    log: logProduction,
    validate: validateProductionData,
    sanitize: sanitizeProductionData,
    compressImage: compressImage
};

// Exportar funções globalmente
window.getImageUrl = getImageUrl;
window.getBaseUrl = getBaseUrl;
window.debug = debug;
