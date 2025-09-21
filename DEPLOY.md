# 🚀 Guia de Deploy - Site Casal Mel

## 📋 Pré-requisitos

- Conta no GitHub (para versionamento)
- Conta em um dos serviços de deploy (Vercel, Netlify ou Render)
- Projeto configurado com Supabase (opcional)

## 🎯 Opções de Deploy Gratuito

### 1. **Vercel (Recomendado)**

#### Passo a Passo:
1. **Instale o Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **No diretório do projeto:**
   ```bash
   vercel
   ```

3. **Siga as instruções:**
   - Link com GitHub (recomendado)
   - Escolha o framework: "Other"
   - Build Command: (deixe vazio)
   - Output Directory: `.`

4. **Configure variáveis de ambiente (se usar Supabase):**
   - Acesse o dashboard do Vercel
   - Vá em Settings > Environment Variables
   - Adicione:
     - `SUPABASE_URL`: URL do seu projeto Supabase
     - `SUPABASE_ANON_KEY`: Chave anônima do Supabase

#### Vantagens:
- ✅ Deploy automático via GitHub
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Domínio personalizado gratuito
- ✅ Performance otimizada

---

### 2. **Netlify**

#### Passo a Passo:
1. **Conecte seu repositório:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte com GitHub

2. **Configure o build:**
   - Build Command: (deixe vazio)
   - Publish Directory: `.`
   - Deploy Command: (deixe vazio)

3. **Configure variáveis de ambiente:**
   - Site Settings > Environment Variables
   - Adicione as variáveis do Supabase

#### Vantagens:
- ✅ Interface amigável
- ✅ Deploy contínuo
- ✅ Formulários estáticos
- ✅ Funções serverless

---

### 3. **Render**

#### Passo a Passo:
1. **Conecte seu repositório:**
   - Acesse [render.com](https://render.com)
   - Clique em "New +" > "Static Site"
   - Conecte com GitHub

2. **Configure:**
   - Name: `casal-mel-site`
   - Branch: `main`
   - Build Command: (deixe vazio)
   - Publish Directory: `.`

3. **Configure variáveis de ambiente:**
   - Environment > Add Environment Variable

#### Vantagens:
- ✅ Simplicidade
- ✅ Deploy automático
- ✅ SSL automático

---

## ⚙️ Configuração do Supabase (Opcional)

### 1. **Crie um projeto no Supabase:**
- Acesse [supabase.com](https://supabase.com)
- Crie uma nova conta/projeto
- Anote a URL e chave anônima

### 2. **Configure as tabelas:**
Execute os SQLs no editor SQL do Supabase:

```sql
-- Tabela eventos
CREATE TABLE eventos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  data TEXT,
  local TEXT,
  imagem TEXT,
  whatsapp TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela shows
CREATE TABLE shows (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  imagem TEXT,
  whatsapp TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela banners
CREATE TABLE banners (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  imagem TEXT NOT NULL,
  ordem INTEGER DEFAULT 1,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. **Configure o arquivo config.js:**
```javascript
const SUPABASE_CONFIG = {
  url: 'https://seu-projeto.supabase.co',
  anonKey: 'sua-chave-anonima-aqui',
  // ...
};

const DEV_CONFIG = {
  useSupabase: true, // Mude para true
  fallbackToSheets: true
};
```

---

## 🔧 Configurações Pós-Deploy

### 1. **Domínio Personalizado:**
- **Vercel:** Settings > Domains
- **Netlify:** Site Settings > Domain Management
- **Render:** Settings > Custom Domains

### 2. **SSL/HTTPS:**
- Todos os serviços fornecem SSL automático
- Certificados renovam automaticamente

### 3. **Monitoramento:**
- **Vercel:** Analytics no dashboard
- **Netlify:** Analytics no dashboard
- **Render:** Logs no dashboard

---

## 📊 Otimizações de Performance

### 1. **Imagens:**
- Use formatos WebP quando possível
- Otimize tamanhos (máximo 800px de largura)
- Use lazy loading (já implementado)

### 2. **CSS/JS:**
- Minificação automática nos serviços
- CDN global incluído
- Cache otimizado

### 3. **SEO:**
- Meta tags otimizadas ✅
- Structured data implementado ✅
- Sitemap.xml incluído ✅
- Robots.txt configurado ✅

---

## 🚨 Troubleshooting

### Problema: Site não carrega
**Solução:**
- Verifique se todos os arquivos estão no repositório
- Confirme se o build command está correto
- Verifique os logs de deploy

### Problema: Supabase não conecta
**Solução:**
- Verifique as variáveis de ambiente
- Confirme se as tabelas existem
- Teste a conexão localmente primeiro

### Problema: Imagens não aparecem
**Solução:**
- Verifique os caminhos das imagens
- Confirme se as imagens estão no repositório
- Use URLs absolutas se necessário

---

## 📈 Próximos Passos

1. **Teste o site** após o deploy
2. **Configure o domínio** personalizado
3. **Adicione conteúdo** via painel admin
4. **Monitore performance** e analytics
5. **Configure backup** dos dados

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs de deploy
2. Teste localmente primeiro
3. Consulte a documentação do serviço escolhido
4. Verifique as configurações do Supabase

**Boa sorte com o deploy! 🚀**
