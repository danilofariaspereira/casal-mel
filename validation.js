// ========================================
// SISTEMA DE VALIDAÇÃO - CASAL MEL
// ========================================

class ValidationSystem {
    constructor() {
        this.rules = {};
        this.messages = {};
        this.init();
    }

    init() {
        debug('Inicializando sistema de validação');
        this.setupDefaultRules();
        this.setupDefaultMessages();
    }

    setupDefaultRules() {
        this.rules = {
            required: (value) => {
                return value !== null && value !== undefined && value.toString().trim() !== '';
            },
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            minLength: (value, min) => {
                return value && value.length >= min;
            },
            maxLength: (value, max) => {
                return !value || value.length <= max;
            },
            phone: (value) => {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
            },
            whatsapp: (value) => {
                const whatsappRegex = /^[\d\s\-\+\(\)]+$/;
                const cleanValue = value.replace(/\D/g, '');
                return whatsappRegex.test(value) && cleanValue.length >= 10 && cleanValue.length <= 15;
            },
            url: (value) => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            },
            image: (file) => {
                if (!file) return true; // Arquivo opcional
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                const maxSize = 5 * 1024 * 1024; // 5MB
                return allowedTypes.includes(file.type) && file.size <= maxSize;
            },
            date: (value) => {
                if (!value) return true; // Data opcional
                const date = new Date(value);
                return !isNaN(date.getTime());
            },
            futureDate: (value) => {
                if (!value) return true; // Data opcional
                const date = new Date(value);
                const now = new Date();
                return !isNaN(date.getTime()) && date > now;
            }
        };
    }

    setupDefaultMessages() {
        this.messages = {
            required: 'Este campo é obrigatório',
            email: 'Digite um email válido',
            minLength: (min) => `Mínimo de ${min} caracteres`,
            maxLength: (max) => `Máximo de ${max} caracteres`,
            phone: 'Digite um telefone válido',
            whatsapp: 'Digite um WhatsApp válido (10-15 dígitos)',
            url: 'Digite uma URL válida',
            image: 'Selecione uma imagem válida (JPEG, PNG, GIF, WebP) com máximo 5MB',
            date: 'Digite uma data válida',
            futureDate: 'A data deve ser futura'
        };
    }

    validate(field, value, rules) {
        const errors = [];
        
        for (const rule of rules) {
            let ruleName, ruleValue;
            
            if (typeof rule === 'string') {
                ruleName = rule;
                ruleValue = null;
            } else if (Array.isArray(rule)) {
                [ruleName, ruleValue] = rule;
            } else {
                continue;
            }

            if (!this.rules[ruleName]) {
                debug(`Regra de validação não encontrada: ${ruleName}`);
                continue;
            }

            const isValid = this.rules[ruleName](value, ruleValue);
            
            if (!isValid) {
                let message = this.messages[ruleName];
                if (typeof message === 'function') {
                    message = message(ruleValue);
                }
                errors.push(message);
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    validateForm(formData, validationRules) {
        const results = {};
        let isFormValid = true;

        for (const [field, rules] of Object.entries(validationRules)) {
            const value = formData[field];
            const validation = this.validate(field, value, rules);
            
            results[field] = validation;
            
            if (!validation.isValid) {
                isFormValid = false;
            }
        }

        return {
            isValid: isFormValid,
            results: results
        };
    }

    // Validação específica para eventos
    validateEvento(eventoData) {
        const rules = {
            titulo: ['required', ['minLength', 3], ['maxLength', 100]],
            data: ['required'],
            local: ['required', ['minLength', 3], ['maxLength', 200]],
            descricao: ['required', ['minLength', 10], ['maxLength', 2000]],
            whatsapp: ['required', 'whatsapp'],
            imagem: ['image']
        };

        return this.validateForm(eventoData, rules);
    }

    // Validação específica para shows
    validateShow(showData) {
        const rules = {
            titulo: ['required', ['minLength', 3], ['maxLength', 100]],
            data: ['required'],
            local: ['required', ['minLength', 3], ['maxLength', 200]],
            descricao: ['required', ['minLength', 10], ['maxLength', 2000]],
            whatsapp: ['required', 'whatsapp'],
            imagem: ['image']
        };

        return this.validateForm(showData, rules);
    }

    // Validação específica para login
    validateLogin(loginData) {
        const rules = {
            username: ['required'],
            password: ['required']
        };

        return this.validateForm(loginData, rules);
    }

    // Validação específica para registro
    validateRegister(registerData) {
        const rules = {
            name: ['required', ['minLength', 2], ['maxLength', 100]],
            email: ['required', 'email'],
            password: ['required', ['minLength', 6], ['maxLength', 50]]
        };

        return this.validateForm(registerData, rules);
    }

    // Aplicar validação em tempo real
    setupRealTimeValidation(formElement, validationRules) {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            const fieldName = input.name || input.id;
            if (!fieldName || !validationRules[fieldName]) return;

            input.addEventListener('blur', () => {
                this.validateField(input, validationRules[fieldName]);
            });

            input.addEventListener('input', () => {
                // Remove mensagens de erro ao digitar
                this.clearFieldError(input);
            });
        });
    }

    validateField(input, rules) {
        const value = input.type === 'file' ? input.files[0] : input.value;
        const validation = this.validate(input.name || input.id, value, rules);
        
        this.clearFieldError(input);
        
        if (!validation.isValid) {
            this.showFieldError(input, validation.errors[0]);
        }
        
        return validation;
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        
        input.classList.add('border-red-500');
        input.parentNode.appendChild(errorElement);
    }

    clearFieldError(input) {
        input.classList.remove('border-red-500');
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Validação de arquivo de imagem
    validateImageFile(file) {
        if (!file) return { isValid: true, errors: [] };
        
        const errors = [];
        
        // Verificar tipo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            errors.push('Formato de arquivo não suportado. Use JPEG, PNG, GIF ou WebP.');
        }
        
        // Verificar tamanho (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            errors.push('Arquivo muito grande. Máximo 5MB.');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Sanitizar dados
    sanitize(data) {
        const sanitized = {};
        
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string') {
                // Remove tags HTML e caracteres perigosos
                sanitized[key] = value
                    .replace(/<[^>]*>/g, '') // Remove HTML tags
                    .replace(/[<>]/g, '') // Remove < e >
                    .trim();
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }
}

// Instância global do sistema de validação
window.validationSystem = new ValidationSystem();

// Funções globais para facilitar o uso
window.validateEvento = (data) => {
    return window.validationSystem.validateEvento(data);
};

window.validateShow = (data) => {
    return window.validationSystem.validateShow(data);
};

window.validateLogin = (data) => {
    return window.validationSystem.validateLogin(data);
};

window.validateRegister = (data) => {
    return window.validationSystem.validateRegister(data);
};

window.validateImageFile = (file) => {
    return window.validationSystem.validateImageFile(file);
};

window.sanitizeData = (data) => {
    return window.validationSystem.sanitize(data);
};

debug('Sistema de validação inicializado');

