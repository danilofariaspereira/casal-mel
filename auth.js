// ========================================
// SISTEMA DE AUTENTICAÇÃO - CASAL MEL
// ========================================

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        debug('Inicializando sistema de autenticação');
        this.loadUserFromStorage();
    }

    // Carrega usuário do localStorage
    loadUserFromStorage() {
        try {
            const userData = localStorage.getItem('casal-mel-user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                if (this.isAuthorizedUser(parsedUser)) {
                    this.currentUser = parsedUser;
                    debug('Usuário carregado do storage:', this.currentUser);
                } else {
                    debug('Usuário não autorizado encontrado no storage. Limpando dados.');
                    localStorage.removeItem('casal-mel-user');
                    this.currentUser = null;
                }
            }
        } catch (error) {
            debug('Erro ao carregar usuário:', error);
            this.currentUser = null;
        }
    }

    // Salva usuário no localStorage
    saveUserToStorage(user) {
        try {
            localStorage.setItem('casal-mel-user', JSON.stringify(user));
            debug('Usuário salvo no storage:', user);
        } catch (error) {
            debug('Erro ao salvar usuário:', error);
        }
    }

    // Login com email e senha
    login(username, password) {
        debug('Tentativa de login:', { username, password: '***' });
        
        const adminUser = window.CASAL_MEL_CONFIG.login.adminUser;
        const normalizedInput = (username || '').trim().toLowerCase();
        const normalizedAdmin = adminUser.username.toLowerCase();
        
        if (normalizedInput === normalizedAdmin && password === adminUser.password) {
            const user = {
                id: 'admin',
                username: adminUser.username,
                name: adminUser.name,
                loginTime: new Date().toISOString(),
                role: 'admin'
            };
            
            this.currentUser = user;
            this.saveUserToStorage(user);
            
            debug('Login realizado com sucesso:', user);
            return { success: true, user: user };
        }
        
        debug('Login falhou - credenciais inválidas');
        return { success: false, message: 'Usuário ou senha incorretos' };
    }

    // Registro de novo usuário
    register(name, email, password) {
        debug('Tentativa de registro bloqueada', { name, email, password: '***' });
        return { success: false, message: 'Criação de novas contas está desabilitada' };
    }

    // Obtém usuários salvos
    getSavedUsers() {
        return [];
    }

    // Logout
    logout() {
        debug('Logout realizado');
        this.currentUser = null;
        localStorage.removeItem('casal-mel-user');
    }

    // Verifica se está logado
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Obtém usuário atual
    getCurrentUser() {
        return this.currentUser;
    }

    // Verifica se é usuário de teste
    isTestUser() {
        return false;
    }

    // Verifica se é usuário do Google
    isGoogleUser() {
        return false;
    }

    // Verifica se usuário é autorizado
    isAuthorizedUser(user) {
        if (!user) return false;
        const adminUser = window.CASAL_MEL_CONFIG.login.adminUser;
        const storedUsername = (user.username || user.email || '').toLowerCase();
        return storedUsername === adminUser.username.toLowerCase();
    }
}

// Instância global do sistema de autenticação
window.auth = new AuthSystem();


