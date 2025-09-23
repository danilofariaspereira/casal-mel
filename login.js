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
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Formulário de registro
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Botão Google
        document.getElementById('googleLogin').addEventListener('click', () => {
            this.handleGoogleLogin();
        });

        // Mostrar modal de registro
        document.getElementById('showRegister').addEventListener('click', () => {
            this.showRegisterModal();
        });

        // Fechar modal de registro
        document.getElementById('closeRegister').addEventListener('click', () => {
            this.hideRegisterModal();
        });

        // Fechar modal clicando fora
        document.getElementById('registerModal').addEventListener('click', (e) => {
            if (e.target.id === 'registerModal') {
                this.hideRegisterModal();
            }
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
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = { email, password };

        // Validação básica
        if (!email || !password) {
            this.showError('Preencha todos os campos');
            return;
        }
        
        if (!email.includes('@')) {
            this.showError('Email inválido');
            return;
        }

        try {
            const result = window.auth.login(email, password);
            
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

    async handleRegister() {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        const registerData = { name, email, password };

        // Validação básica
        if (!name || !email || !password) {
            this.showError('Preencha todos os campos');
            return;
        }
        
        if (!email.includes('@')) {
            this.showError('Email inválido');
            return;
        }
        
        if (password.length < 6) {
            this.showError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        try {
            const result = window.auth.register(name, email, password);
            
            if (result.success) {
                debug('Registro realizado com sucesso');
                this.showSuccess('Conta criada com sucesso!');
                
                // Preenche o formulário de login
                document.getElementById('email').value = email;
                document.getElementById('password').value = password;
                
                // Fecha o modal
                this.hideRegisterModal();
            } else {
                this.showError(result.message || 'Erro no registro');
            }
        } catch (error) {
            debug('Erro no registro:', error);
            this.showError('Erro interno. Tente novamente.');
        }
    }

    handleGoogleLogin() {
        const googleClientId = window.CASAL_MEL_CONFIG.login.googleClientId;
        
        if (googleClientId && googleClientId !== 'YOUR_GOOGLE_CLIENT_ID') {
            // Implementação real do Google OAuth
            this.showError('Google OAuth será implementado com credenciais reais');
        } else {
            // Simulação de login com Google para demonstração
            this.simulateGoogleLogin();
        }
    }

    simulateGoogleLogin() {
        // Simula um login com Google para demonstração
        const googleUser = {
            id: 'google_' + Date.now(),
            email: 'usuario@gmail.com',
            name: 'Usuário Google',
            loginTime: new Date().toISOString(),
            isGoogleUser: true
        };
        
        // Salva o usuário no localStorage
        localStorage.setItem('casal-mel-user', JSON.stringify(googleUser));
        
        this.showSuccess('Login com Google realizado com sucesso!');
        
        // Redireciona após 1 segundo
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    }

    showRegisterModal() {
        document.getElementById('registerModal').classList.remove('hidden');
        document.getElementById('registerModal').classList.add('flex');
    }

    hideRegisterModal() {
        document.getElementById('registerModal').classList.add('hidden');
        document.getElementById('registerModal').classList.remove('flex');
        
        // Limpa o formulário
        document.getElementById('registerForm').reset();
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

