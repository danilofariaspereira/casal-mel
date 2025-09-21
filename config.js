// ========================================
// CONFIGURAÇÕES DO SUPABASE
// ========================================

// IMPORTANTE: Substitua estas configurações pelas suas credenciais do Supabase
const SUPABASE_CONFIG = {
  url: 'https://seu-projeto.supabase.co', // Substitua pela URL do seu projeto
  anonKey: 'sua-chave-anonima-aqui', // Substitua pela sua chave anônima
  tables: {
    eventos: 'eventos',
    shows: 'shows', 
    banners: 'banners',
    admin_users: 'admin_users'
  }
};

// Configurações de desenvolvimento
const DEV_CONFIG = {
  useSupabase: false, // Mude para true quando configurar o Supabase
  fallbackToSheets: true // Usa Google Sheets como fallback
};

// Exporta as configurações
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_CONFIG, DEV_CONFIG };
} else {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
  window.DEV_CONFIG = DEV_CONFIG;
}

