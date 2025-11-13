// ========================================
// SISTEMA DE LOGIN - CASAL MEL
// ========================================

class LoginController {
    constructor() {
        this.loginForm = null;
        this.usernameInput = null;
        this.passwordInput = null;
        this.init();
    }

    init() {
        debug('Inicializando sistema de login');
        this.setupEventListeners();
        this.checkAuth();
    }

    setupEventListeners() {
        // Referências aos elementos do formulário
        this.loginForm = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');

        if (!this.loginForm || !this.usernameInput || !this.passwordInput) {
            debug('Elementos do formulário de login não encontrados', {
                hasForm: !!this.loginForm,
                hasUsername: !!this.usernameInput,
                hasPassword: !!this.passwordInput
            });
            return;
        }

        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    checkAuth() {
        // Se já está logado, redireciona para o admin
        if (window.auth.isLoggedIn()) {
            debug('Usuário já logado, redirecionando...');
            window.location.href = 'admin.html';
        }
    }

    async handleLogin() {
        if (!this.usernameInput || !this.passwordInput) {
            this.showError('Formulário de login não encontrado. Recarregue a página.');
            return;
        }

        const username = this.usernameInput.value;
        const password = this.passwordInput.value;

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
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        debug('Página sem formulário de login detectada. Controlador não inicializado.');
        return;
    }

    new LoginController();
});

