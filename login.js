// ========================================
// SISTEMA DE LOGIN - CASAL MEL
// ========================================

class LoginController {
    constructor() {
        this.init();
    }

    init() {
        debug('Inicializando sistema de login');
        this.setupEventListeners();
        this.checkAuth();
    }

    setupEventListeners() {
        // Formulário de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    checkAuth() {
        // Se já está logado, redireciona para o admin
        if (window.auth.isLoggedIn()) {
            debug('Usuário já logado, redirecionando...');
            window.location.href = 'admin.html';
        }
    }

    async handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginData = { username, password };

        // Validação básica
        if (!username || !password) {
            this.showError('Preencha todos os campos');
            return;
        }

        try {
            const result = window.auth.login(username, password);
            
            if (result.success) {
                debug('Login realizado com sucesso');
                this.showSuccess('Login realizado com sucesso!');
                
                // Redireciona após 1 segundo
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1000);
            } else {
                this.showError(result.message || 'Erro no login');
            }
        } catch (error) {
            debug('Erro no login:', error);
            this.showError('Erro interno. Tente novamente.');
        }
    }

    showError(message) {
        window.showError(message);
    }

    showSuccess(message) {
        window.showSuccess(message);
    }
}

// Inicializa o controlador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new LoginController();
});

