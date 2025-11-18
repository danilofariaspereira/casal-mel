// ========================================
// SISTEMA DE BACKUP/EXPORTAÇÃO - CASAL MEL
// ========================================

class BackupSystem {
    constructor() {
        this.init();
    }

    init() {
        debug('Inicializando sistema de backup');
    }

    // Exportar todos os dados
    exportAllData() {
        try {
            const data = {
                eventos: window.dataManager.eventos,
                shows: window.dataManager.shows,
                usuarios: window.auth.getSavedUsers(),
                config: {
                    version: window.CASAL_MEL_CONFIG.version,
                    exportDate: new Date().toISOString(),
                    exportType: 'full'
                }
            };

            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `casal-mel-backup-${new Date().toISOString().split('T')[0]}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            window.showSuccess('Backup exportado com sucesso!');
            debug('Backup exportado:', data);
            return true;
        } catch (error) {
            debug('Erro ao exportar backup:', error);
            window.showError('Erro ao exportar backup: ' + error.message);
            return false;
        }
    }

    // Exportar apenas eventos
    exportEventos() {
        try {
            const data = {
                eventos: window.dataManager.eventos,
                config: {
                    version: window.CASAL_MEL_CONFIG.version,
                    exportDate: new Date().toISOString(),
                    exportType: 'eventos'
                }
            };

            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `casal-mel-eventos-${new Date().toISOString().split('T')[0]}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            window.showSuccess('Eventos exportados com sucesso!');
            debug('Eventos exportados:', data);
            return true;
        } catch (error) {
            debug('Erro ao exportar eventos:', error);
            window.showError('Erro ao exportar eventos: ' + error.message);
            return false;
        }
    }

    // Exportar apenas shows
    exportShows() {
        try {
            const data = {
                shows: window.dataManager.shows,
                config: {
                    version: window.CASAL_MEL_CONFIG.version,
                    exportDate: new Date().toISOString(),
                    exportType: 'shows'
                }
            };

            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `casal-mel-shows-${new Date().toISOString().split('T')[0]}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            window.showSuccess('Shows exportados com sucesso!');
            debug('Shows exportados:', data);
            return true;
        } catch (error) {
            debug('Erro ao exportar shows:', error);
            window.showError('Erro ao exportar shows: ' + error.message);
            return false;
        }
    }

    // Importar dados
    importData(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('Nenhum arquivo selecionado'));
                return;
            }

            if (file.type !== 'application/json') {
                reject(new Error('Arquivo deve ser do tipo JSON'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.processImportedData(data);
                    resolve(data);
                } catch (error) {
                    reject(new Error('Erro ao processar arquivo: ' + error.message));
                }
            };
            reader.onerror = () => {
                reject(new Error('Erro ao ler arquivo'));
            };
            reader.readAsText(file);
        });
    }

    // Processar dados importados
    processImportedData(data) {
        try {
            let imported = false;

            // Importar eventos
            if (data.eventos && Array.isArray(data.eventos)) {
                const existingIds = window.dataManager.eventos.map(e => e.id);
                const newEventos = data.eventos.filter(e => !existingIds.includes(e.id));
                
                newEventos.forEach(evento => {
                    window.dataManager.addEvento(evento);
                });
                
                if (newEventos.length > 0) {
                    window.showSuccess(`${newEventos.length} eventos importados com sucesso!`);
                    imported = true;
                }
            }

            // Importar shows
            if (data.shows && Array.isArray(data.shows)) {
                const existingIds = window.dataManager.shows.map(s => s.id);
                const newShows = data.shows.filter(s => !existingIds.includes(s.id));
                
                newShows.forEach(show => {
                    window.dataManager.addShow(show);
                });
                
                if (newShows.length > 0) {
                    window.showSuccess(`${newShows.length} shows importados com sucesso!`);
                    imported = true;
                }
            }

            if (!imported) {
                window.showWarning('Nenhum dado novo foi encontrado no arquivo');
            }

            debug('Dados importados:', data);
        } catch (error) {
            debug('Erro ao processar dados importados:', error);
            window.showError('Erro ao processar dados importados: ' + error.message);
        }
    }

    // Backup automático (localStorage)
    createAutoBackup() {
        try {
            const data = {
                eventos: window.dataManager.eventos,
                shows: window.dataManager.shows,
                timestamp: Date.now(),
                version: window.CASAL_MEL_CONFIG.version
            };

            localStorage.setItem('casal-mel-auto-backup', JSON.stringify(data));
            debug('Backup automático criado');
        } catch (error) {
            debug('Erro ao criar backup automático:', error);
        }
    }

    // Restaurar backup automático
    restoreAutoBackup() {
        try {
            const backupData = localStorage.getItem('casal-mel-auto-backup');
            if (!backupData) {
                window.showWarning('Nenhum backup automático encontrado');
                return false;
            }

            const data = JSON.parse(backupData);
            
            // Verificar se o backup é recente (últimas 24 horas)
            const backupAge = Date.now() - data.timestamp;
            const maxAge = 24 * 60 * 60 * 1000; // 24 horas
            
            if (backupAge > maxAge) {
                window.showWarning('Backup automático é muito antigo. Deseja continuar mesmo assim?');
                if (!confirm('Backup automático é muito antigo. Deseja continuar mesmo assim?')) {
                    return false;
                }
            }

            // Restaurar dados
            window.dataManager.eventos = data.eventos || [];
            window.dataManager.shows = data.shows || [];
            window.dataManager.saveData();

            window.showSuccess('Backup automático restaurado com sucesso!');
            debug('Backup automático restaurado:', data);
            return true;
        } catch (error) {
            debug('Erro ao restaurar backup automático:', error);
            window.showError('Erro ao restaurar backup automático: ' + error.message);
            return false;
        }
    }

    // Limpar dados
    clearAllData() {
        if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita!')) {
            if (confirm('CONFIRMAÇÃO FINAL: Todos os eventos e shows serão removidos permanentemente!')) {
                window.dataManager.clearAll();
                window.showSuccess('Todos os dados foram limpos');
                return true;
            }
        }
        return false;
    }

    // Estatísticas de backup
    getBackupStats() {
        const stats = {
            eventos: window.dataManager.eventos.length,
            shows: window.dataManager.shows.length,
            usuarios: window.auth.getSavedUsers().length,
            lastBackup: null,
            backupSize: 0
        };

        try {
            const backupData = localStorage.getItem('casal-mel-auto-backup');
            if (backupData) {
                const data = JSON.parse(backupData);
                stats.lastBackup = new Date(data.timestamp);
                stats.backupSize = new Blob([backupData]).size;
            }
        } catch (error) {
            debug('Erro ao obter estatísticas de backup:', error);
        }

        return stats;
    }

    // Configurar backup automático
    setupAutoBackup(intervalMinutes = 60) {
        // Limpar interval anterior se existir
        if (window.autoBackupInterval) {
            clearInterval(window.autoBackupInterval);
        }

        // Criar novo interval
        window.autoBackupInterval = setInterval(() => {
            this.createAutoBackup();
        }, intervalMinutes * 60 * 1000);

        debug(`Backup automático configurado para ${intervalMinutes} minutos`);
    }

    // Parar backup automático
    stopAutoBackup() {
        if (window.autoBackupInterval) {
            clearInterval(window.autoBackupInterval);
            window.autoBackupInterval = null;
            debug('Backup automático parado');
        }
    }
}

// Instância global do sistema de backup
window.backupSystem = new BackupSystem();

// Funções globais para facilitar o uso
window.exportAllData = () => {
    return window.backupSystem.exportAllData();
};

window.exportEventos = () => {
    return window.backupSystem.exportEventos();
};

window.exportShows = () => {
    return window.backupSystem.exportShows();
};

window.importData = (file) => {
    return window.backupSystem.importData(file);
};

window.restoreAutoBackup = () => {
    return window.backupSystem.restoreAutoBackup();
};

window.clearAllData = () => {
    return window.backupSystem.clearAllData();
};

window.getBackupStats = () => {
    return window.backupSystem.getBackupStats();
};

// Configurar backup automático a cada 2 horas
window.backupSystem.setupAutoBackup(120);

debug('Sistema de backup inicializado');

