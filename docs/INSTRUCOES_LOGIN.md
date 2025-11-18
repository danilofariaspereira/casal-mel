# 🔐 Instruções de Login - Casal Mel

## 📋 Credenciais de Teste

### Usuário Padrão:
- **Email**: `teste@teste`
- **Senha**: `123456`
- **Nome**: Usuário Teste

## 🚀 Como Acessar:

1. **Acesse**: `http://localhost:8000/login.html`
2. **Digite as credenciais** acima
3. **Clique em "Entrar"**

## 🔑 Opções de Login:

### 1. Login Tradicional
- Use as credenciais de teste acima
- Ou crie uma nova conta clicando em "Criar conta"

### 2. Login com Google (Simulado)
- Clique no botão "Entrar com Google"
- Será criado um usuário simulado automaticamente
- Email: `usuario@gmail.com`
- Nome: `Usuário Google`

## 🎯 Funcionalidades Disponíveis:

### No Admin (`admin.html`):
- ✅ Adicionar/editar/remover eventos
- ✅ Adicionar/editar/remover shows
- ✅ Upload de imagens
- ✅ Sistema de backup
- ✅ Sincronização em tempo real com o site

### No Site (`index.html`):
- ✅ Visualização dos eventos e shows
- ✅ Modais com detalhes
- ✅ Links para WhatsApp
- ✅ Design responsivo

## 🔄 Sincronização:

- As mudanças no admin aparecem automaticamente no site
- Sistema de polling a cada 2 segundos
- BroadcastChannel para comunicação entre abas
- localStorage para persistência de dados

## 🎨 Cores Implementadas:

- **Preto**: `#000000` e `#1a1a1a`
- **Amarelo**: `#f59e0b` e `#d97706`
- **Gradientes**: Tons mais escuros no hover

## 📱 Responsividade:

- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ Menu hambúrguer no mobile

## 🛠️ Tecnologias:

- HTML5
- CSS3 (Tailwind + Custom)
- JavaScript ES6+
- localStorage
- BroadcastChannel API
- FileReader API

## 🚀 Deploy Gratuito:

O projeto está configurado para deploy gratuito em:
- **Netlify**: `netlify.toml`
- **Vercel**: `vercel.json`
- **GitHub Pages**: Compatível

## 📞 Suporte:

Para dúvidas ou problemas, verifique:
1. Console do navegador (F12)
2. Debug ativado no `config.js`
3. Logs aparecem com prefixo `[CASAL MEL]`
