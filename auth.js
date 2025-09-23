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
                this.currentUser = JSON.parse(userData);
                debug('Usuário carregado do storage:', this.currentUser);
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
    login(email, password) {
        debug('Tentativa de login:', { email, password: '***' });
        
        // Verifica usuário de teste
        if (email === window.CASAL_MEL_CONFIG.login.testUser.email && 
            password === window.CASAL_MEL_CONFIG.login.testUser.password) {
            
            const user = {
                id: 1,
                email: email,
                name: window.CASAL_MEL_CONFIG.login.testUser.name,
                loginTime: new Date().toISOString(),
                isTestUser: true
            };
            
            this.currentUser = user;
            this.saveUserToStorage(user);
            
            debug('Login realizado com sucesso:', user);
            return { success: true, user: user };
        }
        
        // Verifica outros usuários salvos
        const savedUsers = this.getSavedUsers();
        const user = savedUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            const userData = {
                id: user.id,
                email: user.email,
                name: user.name,
                loginTime: new Date().toISOString(),
                isTestUser: false
            };
            
            this.currentUser = userData;
            this.saveUserToStorage(userData);
            
            debug('Login realizado com sucesso:', userData);
            return { success: true, user: userData };
        }
        
        debug('Login falhou - credenciais inválidas');
        return { success: false, message: 'Email ou senha incorretos' };
    }

    // Registro de novo usuário
    register(name, email, password) {
        debug('Tentativa de registro:', { name, email, password: '***' });
        
        // Verifica se email já existe
        const savedUsers = this.getSavedUsers();
        if (savedUsers.find(u => u.email === email)) {
            return { success: false, message: 'Email já cadastrado' };
        }
        
        // Cria novo usuário
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        // Salva usuário
        savedUsers.push(newUser);
        localStorage.setItem('casal-mel-users', JSON.stringify(savedUsers));
        
        debug('Usuário registrado com sucesso:', newUser);
        return { success: true, message: 'Usuário registrado com sucesso' };
    }

    // Obtém usuários salvos
    getSavedUsers() {
        try {
            const users = localStorage.getItem('casal-mel-users');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            debug('Erro ao carregar usuários:', error);
            return [];
        }
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
        return this.currentUser && this.currentUser.isTestUser;
    }

    // Verifica se é usuário do Google
    isGoogleUser() {
        return this.currentUser && this.currentUser.isGoogleUser;
    }
}

// Instância global do sistema de autenticação
window.auth = new AuthSystem();


