# 🎉 Casal Mel - Sistema de Eventos

Sistema de gerenciamento de eventos e shows com integração Supabase.

## 📁 Estrutura do Projeto

```
casal-mel/
├── 📄 index.html          # Site público
├── 📄 admin.html          # Painel administrativo
├── 📄 login.html          # Página de login
├── 📄 urls.html           # Página de URLs do sistema
├── 📄 style.css           # Estilos globais
│
├── 📁 js/                 # Arquivos JavaScript
│   ├── 📁 config/         # Configurações
│   │   ├── config.js
│   │   └── config.production.js
│   ├── 📁 core/           # Código principal
│   │   ├── data.js        # Gerenciador de dados (Supabase)
│   │   └── auth.js        # Sistema de autenticação
│   ├── 📁 admin/          # Painel administrativo
│   │   ├── admin.js
│   │   └── login.js
│   ├── 📁 public/         # Site público
│   │   └── site.js
│   └── 📁 utils/          # Utilitários
│       ├── notifications.js
│       ├── validation.js
│       └── backup.js
│
├── 📁 config/             # Configurações do Supabase
│   ├── supabase-config.js
│   └── supabase-schema.sql
│
├── 📁 docs/               # Documentação
│   ├── COMO_ENCONTRAR_CHAVE_SUPABASE.md
│   ├── GUIA_SUPABASE.md
│   ├── GUIA_DEPLOY_COMPLETO.md
│   ├── GUIA_URLS.md
│   ├── INSTRUCOES_LOGIN.md
│   ├── README_DEPLOY.md
│   └── TESTE_SINCRONIZACAO.md
│
├── 📁 img/                # Imagens
│
├── 📄 package.json        # Dependências
├── 📄 netlify.toml        # Configuração Netlify
├── 📄 vercel.json         # Configuração Vercel
└── 📄 deploy.sh           # Script de deploy
```

## 🚀 Início Rápido

### 1. Configurar Supabase

1. Execute o SQL em `config/supabase-schema.sql` no Supabase
2. Configure as credenciais em `config/supabase-config.js`

### 2. Executar Localmente

```bash
npm install
npm run dev
```

### 3. Acessar o Sistema

- **Site Público**: http://localhost:8000
- **Login Admin**: http://localhost:8000/login.html
- **Dashboard**: http://localhost:8000/admin.html

## 🔑 Credenciais

- **Usuário**: `admincasalmel`
- **Senha**: `casalmel#2025@admin#`

## 📚 Documentação

Consulte a pasta `docs/` para documentação completa:
- `GUIA_SUPABASE.md` - Como configurar o Supabase
- `GUIA_DEPLOY_COMPLETO.md` - Como fazer deploy
- `COMO_ENCONTRAR_CHAVE_SUPABASE.md` - Como encontrar a chave do Supabase

## 🛠️ Tecnologias

- HTML5 + CSS3
- JavaScript (Vanilla)
- Supabase (Banco de dados)
- Tailwind CSS (CDN)
- Font Awesome (CDN)

## 📝 Licença

MIT

