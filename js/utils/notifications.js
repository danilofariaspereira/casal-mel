// ========================================
// SISTEMA DE NOTIFICAÇÕES - CASAL MEL
// ========================================

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.init();
    }

    init() {
        debug('Inicializando sistema de notificações');
        this.createContainer();
        this.setupStyles();
    }

    createContainer() {
        // Cria o container de notificações se não existir
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(container);
            this.container = container;
        } else {
            this.container = document.getElementById('notification-container');
        }
    }

    setupStyles() {
        // Adiciona estilos CSS se não existirem
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 12px;
                    padding: 16px 20px;
                    margin-bottom: 8px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    min-width: 300px;
                    max-width: 400px;
                    transform: translateX(100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .notification.show {
                    transform: translateX(0);
                    opacity: 1;
                }

                .notification.hide {
                    transform: translateX(100%);
                    opacity: 0;
                }

                .notification.success {
                    border-left: 4px solid #10b981;
                }

                .notification.error {
                    border-left: 4px solid #ef4444;
                }

                .notification.warning {
                    border-left: 4px solid #f59e0b;
                }

                .notification.info {
                    border-left: 4px solid #3b82f6;
                }

                .notification-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }

                .notification-title {
                    font-weight: 600;
                    font-size: 14px;
                    color: #1f2937;
                    display: flex;
                    align-items: center;
                }

                .notification-icon {
                    margin-right: 8px;
                    font-size: 16px;
                }

                .notification-close {
                    background: none;
                    border: none;
                    color: #6b7280;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                }

                .notification-close:hover {
                    background: rgba(0, 0, 0, 0.1);
                    color: #374151;
                }

                .notification-message {
                    color: #4b5563;
                    font-size: 13px;
                    line-height: 1.4;
                }

                .notification-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 0 0 12px 12px;
                    transition: width linear;
                }

                .notification.success .notification-progress {
                    background: #10b981;
                }

                .notification.error .notification-progress {
                    background: #ef4444;
                }

                .notification.warning .notification-progress {
                    background: #f59e0b;
                }

                .notification.info .notification-progress {
                    background: #3b82f6;
                }

                @media (max-width: 768px) {
                    .notification {
                        min-width: 280px;
                        max-width: calc(100vw - 32px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    show(message, type = 'info', duration = 5000, title = null) {
        const id = Date.now() + Math.random();
        const notification = {
            id,
            message,
            type,
            duration,
            title: title || this.getDefaultTitle(type),
            timestamp: new Date()
        };

        this.notifications.push(notification);
        this.renderNotification(notification);
        
        // Auto remove após a duração especificada
        if (duration > 0) {
            setTimeout(() => {
                this.hide(id);
            }, duration);
        }

        debug('Notificação criada:', notification);
        return id;
    }

    success(message, duration = 5000, title = null) {
        return this.show(message, 'success', duration, title);
    }

    error(message, duration = 7000, title = null) {
        return this.show(message, 'error', duration, title);
    }

    warning(message, duration = 6000, title = null) {
        return this.show(message, 'warning', duration, title);
    }

    info(message, duration = 5000, title = null) {
        return this.show(message, 'info', duration, title);
    }

    getDefaultTitle(type) {
        const titles = {
            success: 'Sucesso',
            error: 'Erro',
            warning: 'Atenção',
            info: 'Informação'
        };
        return titles[type] || 'Notificação';
    }

    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || 'fas fa-info-circle';
    }

    renderNotification(notification) {
        const element = document.createElement('div');
        element.className = `notification ${notification.type}`;
        element.id = `notification-${notification.id}`;
        
        element.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">
                    <i class="${this.getIcon(notification.type)} notification-icon"></i>
                    ${notification.title}
                </div>
                <button class="notification-close" onclick="window.notificationSystem.hide(${notification.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-progress" style="width: 100%"></div>
        `;

        this.container.appendChild(element);

        // Anima a entrada
        setTimeout(() => {
            element.classList.add('show');
        }, 10);

        // Anima a barra de progresso
        if (notification.duration > 0) {
            setTimeout(() => {
                const progress = element.querySelector('.notification-progress');
                if (progress) {
                    progress.style.transition = `width ${notification.duration}ms linear`;
                    progress.style.width = '0%';
                }
            }, 100);
        }
    }

    hide(id) {
        const element = document.getElementById(`notification-${id}`);
        if (element) {
            element.classList.add('hide');
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 300);
        }

        // Remove da lista
        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    clear() {
        this.notifications.forEach(notification => {
            this.hide(notification.id);
        });
    }

    // Métodos de conveniência para uso global
    static success(message, duration, title) {
        return window.notificationSystem.success(message, duration, title);
    }

    static error(message, duration, title) {
        return window.notificationSystem.error(message, duration, title);
    }

    static warning(message, duration, title) {
        return window.notificationSystem.warning(message, duration, title);
    }

    static info(message, duration, title) {
        return window.notificationSystem.info(message, duration, title);
    }

    static hide(id) {
        return window.notificationSystem.hide(id);
    }

    static clear() {
        return window.notificationSystem.clear();
    }
}

// Instância global do sistema de notificações
window.notificationSystem = new NotificationSystem();

// Funções globais para facilitar o uso
window.showNotification = (message, type, duration, title) => {
    return window.notificationSystem.show(message, type, duration, title);
};

window.showSuccess = (message, duration, title) => {
    return window.notificationSystem.success(message, duration, title);
};

window.showError = (message, duration, title) => {
    return window.notificationSystem.error(message, duration, title);
};

window.showWarning = (message, duration, title) => {
    return window.notificationSystem.warning(message, duration, title);
};

window.showInfo = (message, duration, title) => {
    return window.notificationSystem.info(message, duration, title);
};

window.hideNotification = (id) => {
    return window.notificationSystem.hide(id);
};

window.clearNotifications = () => {
    return window.notificationSystem.clear();
};

debug('Sistema de notificações inicializado');

