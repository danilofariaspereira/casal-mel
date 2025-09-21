// ========================================
// OTIMIZAÇÕES DE PERFORMANCE
// ========================================

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalImages = [
        './img/logo primeira seçao (1).png',
        './img/bacgrfaude primeira seçao (1).png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Debounce para busca
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimização de scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Cache de dados
const dataCache = {
    eventos: null,
    shows: null,
    banners: null,
    lastFetch: null,
    cacheTimeout: 5 * 60 * 1000 // 5 minutos
};

function getCachedData(key) {
    if (dataCache[key] && dataCache.lastFetch && 
        (Date.now() - dataCache.lastFetch) < dataCache.cacheTimeout) {
        return dataCache[key];
    }
    return null;
}

function setCachedData(key, data) {
    dataCache[key] = data;
    dataCache.lastFetch = Date.now();
}

// Otimização de renderização
function batchDOMUpdates(updates) {
    requestAnimationFrame(() => {
        updates.forEach(update => update());
    });
}

// Compressão de imagens (simulada)
function optimizeImageUrl(url, width = 800, quality = 80) {
    if (url.includes('drive.google.com')) {
        return `${url}&w=${width}&q=${quality}`;
    }
    return url;
}

// Inicialização das otimizações
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    preloadCriticalResources();
    initSmoothScroll();
    
    // Aplica debounce na busca global
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
        globalSearch.addEventListener('input', debounce(realizarBusca, 300));
    }
});

// Exporta funções para uso global
window.performanceUtils = {
    getCachedData,
    setCachedData,
    batchDOMUpdates,
    optimizeImageUrl,
    debounce
};
