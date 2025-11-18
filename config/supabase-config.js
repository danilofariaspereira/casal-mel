// ========================================
// CONFIGURAÇÃO SUPABASE - CASAL MEL
// ========================================

// IMPORTANTE: Substitua estas credenciais pelas do seu projeto Supabase
// Encontre-as em: https://supabase.com/dashboard/project/bjkworafyogeszdvulvu/settings/api

window.SUPABASE_CONFIG = {
    url: 'https://bjkworafyogeszdvulvu.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3dvcmFmeW9nZXN6ZHZ1bHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0Mjk4MDEsImV4cCI6MjA3OTAwNTgwMX0.NS2lpCrhSpN9BPLSk_9w_HlBor8Zsj2Ei29vJ4Kwymc'
};

// Verificar se as credenciais foram configuradas
if (window.SUPABASE_CONFIG.anonKey === 'SUA_ANON_KEY_AQUI') {
    console.warn('[CASAL MEL] ⚠️ Configure as credenciais do Supabase em config/supabase-config.js');
}

