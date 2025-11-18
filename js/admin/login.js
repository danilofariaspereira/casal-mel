// ========================================
// SISTEMA DE LOGIN - CASAL MEL
// ========================================

class LoginController {
    constructor() {
        this.loginForm = null;
        this.usernameSelector = '#username, input[name="username"]';
        this.passwordSelector = '#password, input[name="password"]';
        this.handleLogin = this.handleLogin.bind(this);
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

        if (!this.loginForm) {
            debug('Formulário de login não encontrado');
            return;
        }

        this.loginForm.addEventListener('submit', this.handleLogin);
    }

    checkAuth() {
        // Se já está logado, redireciona para o admin
        if (window.auth.isLoggedIn()) {
            debug('Usuário já logado, redirecionando...');
            window.location.href = 'admin.html';
        }
    }

    async handleLogin(event) {
        event?.preventDefault();

        const form = event?.currentTarget || this.loginForm || document.getElementById('loginForm');
        if (!form) {
            this.showError('Formulário de login não encontrado. Recarregue a página.');
            return;
        }

        const usernameInput = form.querySelector(this.usernameSelector) || document.querySelector(this.usernameSelector);
        const passwordInput = form.querySelector(this.passwordSelector) || document.querySelector(this.passwordSelector);

        if (!usernameInput || !passwordInput) {
            this.showError('Campos de usuário ou senha não encontrados. Recarregue a página.');
            return;
        }

        const username = (usernameInput.value || '').trim();
        const password = passwordInput.value || '';

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

