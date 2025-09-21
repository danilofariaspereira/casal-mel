// ========================================
// CLIENTE SUPABASE
// ========================================

class SupabaseClient {
  constructor() {
    this.supabase = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Carrega o Supabase apenas se estiver configurado
      if (window.SUPABASE_CONFIG && window.DEV_CONFIG?.useSupabase) {
        const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2');
        
        this.supabase = createClient(
          window.SUPABASE_CONFIG.url,
          window.SUPABASE_CONFIG.anonKey
        );
        
        this.initialized = true;
        console.log('Supabase inicializado com sucesso!');
      } else {
        console.log('Supabase não configurado, usando Google Sheets como fallback');
      }
    } catch (error) {
      console.error('Erro ao inicializar Supabase:', error);
      this.initialized = false;
    }
  }

  async buscarDados(tabela) {
    if (!this.initialized || !this.supabase) {
      throw new Error('Supabase não inicializado');
    }

    try {
      const { data, error } = await this.supabase
        .from(tabela)
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Erro ao buscar dados da tabela ${tabela}:`, error);
      throw error;
    }
  }

  async inserirDados(tabela, dados) {
    if (!this.initialized || !this.supabase) {
      throw new Error('Supabase não inicializado');
    }

    try {
      const { data, error } = await this.supabase
        .from(tabela)
        .insert(dados)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Erro ao inserir dados na tabela ${tabela}:`, error);
      throw error;
    }
  }

  async atualizarDados(tabela, id, dados) {
    if (!this.initialized || !this.supabase) {
      throw new Error('Supabase não inicializado');
    }

    try {
      const { data, error } = await this.supabase
        .from(tabela)
        .update(dados)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar dados na tabela ${tabela}:`, error);
      throw error;
    }
  }

  async deletarDados(tabela, id) {
    if (!this.initialized || !this.supabase) {
      throw new Error('Supabase não inicializado');
    }

    try {
      const { error } = await this.supabase
        .from(tabela)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Erro ao deletar dados da tabela ${tabela}:`, error);
      throw error;
    }
  }

  // Métodos específicos para cada tipo de dados
  async buscarEventos() {
    return await this.buscarDados(window.SUPABASE_CONFIG.tables.eventos);
  }

  async buscarShows() {
    return await this.buscarDados(window.SUPABASE_CONFIG.tables.shows);
  }

  async buscarBanners() {
    return await this.buscarDados(window.SUPABASE_CONFIG.tables.banners);
  }

  async inserirEvento(evento) {
    return await this.inserirDados(window.SUPABASE_CONFIG.tables.eventos, evento);
  }

  async inserirShow(show) {
    return await this.inserirDados(window.SUPABASE_CONFIG.tables.shows, show);
  }

  async inserirBanner(banner) {
    return await this.inserirDados(window.SUPABASE_CONFIG.tables.banners, banner);
  }

  async atualizarEvento(id, evento) {
    return await this.atualizarDados(window.SUPABASE_CONFIG.tables.eventos, id, evento);
  }

  async atualizarShow(id, show) {
    return await this.atualizarDados(window.SUPABASE_CONFIG.tables.shows, id, show);
  }

  async atualizarBanner(id, banner) {
    return await this.atualizarDados(window.SUPABASE_CONFIG.tables.banners, id, banner);
  }

  async deletarEvento(id) {
    return await this.deletarDados(window.SUPABASE_CONFIG.tables.eventos, id);
  }

  async deletarShow(id) {
    return await this.deletarDados(window.SUPABASE_CONFIG.tables.shows, id);
  }

  async deletarBanner(id) {
    return await this.deletarDados(window.SUPABASE_CONFIG.tables.banners, id);
  }
}

// Instância global do cliente Supabase
window.supabaseClient = new SupabaseClient();

