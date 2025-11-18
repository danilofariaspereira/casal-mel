# 🔑 Como Encontrar a Chave do Supabase - Guia Passo a Passo

## 📍 Passo 1: Acesse o Painel do Supabase

1. Abra seu navegador e acesse: https://supabase.com/dashboard
2. Faça login na sua conta (se necessário)

## 📍 Passo 2: Acesse o Projeto

1. Na lista de projetos, clique no projeto: **bjkworafyogeszdvulvu**
   - Ou acesse diretamente: https://supabase.com/dashboard/project/bjkworafyogeszdvulvu

## 📍 Passo 3: Vá para Settings → API

1. No menu lateral esquerdo, clique em **Settings** (Configurações)
2. Depois clique em **API** (é a primeira opção dentro de Settings)

   **Ou acesse diretamente:**
   ```
   https://supabase.com/dashboard/project/bjkworafyogeszdvulvu/settings/api
   ```

## 📍 Passo 4: Encontre a Chave "anon public"

Na página de API, você verá uma seção chamada **"Project API keys"** com várias chaves.

Você precisa da chave **"anon public"** (não a "service_role secret"!):

```
┌─────────────────────────────────────────┐
│ Project API keys                        │
├─────────────────────────────────────────┤
│                                         │
│ anon public                             │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← ESTA É A CHAVE QUE VOCÊ PRECISA!
│                                         │
│ service_role secret                     │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← NÃO USE ESTA!
│                                         │
└─────────────────────────────────────────┘
```

## 📍 Passo 5: Copie a Chave

1. Ao lado da chave "anon public", há um botão com um ícone de **cópia** (📋) ou você pode selecionar o texto
2. Clique para copiar toda a chave
3. A chave é longa e começa com `eyJ...`

## 📍 Passo 6: Cole no Arquivo de Configuração

1. Abra o arquivo `supabase-config.js` no seu projeto
2. Procure a linha:
   ```javascript
   anonKey: 'SUA_ANON_KEY_AQUI'
   ```
3. Substitua `SUA_ANON_KEY_AQUI` pela chave que você copiou

**Exemplo de como deve ficar:**
```javascript
window.SUPABASE_CONFIG = {
    url: 'https://bjkworafyogeszdvulvu.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3dvcmFmeW9nemR2dWx2dSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ2MTI3ODk2LCJleHAiOjE5NjE3MDM4OTZ9.abc123xyz...' // Sua chave aqui
};
```

## ⚠️ Importante!

- ✅ Use a chave **"anon public"** (segura para usar no frontend)
- ❌ **NUNCA** use a chave **"service_role secret"** no código do navegador!
- ✅ A chave "anon public" é segura para usar no código JavaScript do frontend

## 📸 Imagem de Referência

A página de API do Supabase tem essa estrutura:

```
┌──────────────────────────────────────────────────┐
│ Settings / API                                   │
├──────────────────────────────────────────────────┤
│                                                  │
│ Project URL                                      │
│ https://bjkworafyogeszdvulvu.supabase.co        │
│                                                  │
│ Project API keys                                 │
│                                                  │
│ ┌──────────────────────────────────────────┐   │
│ │ anon public                              │   │
│ │ [Mostrar] [Copiar]                       │   │
│ │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← COPIE ESTA
│ └──────────────────────────────────────────┘   │
│                                                  │
│ ┌──────────────────────────────────────────┐   │
│ │ service_role secret                      │   │
│ │ [Mostrar] [Copiar]                       │   │
│ │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← NÃO USE ESTA
│ └──────────────────────────────────────────┘   │
│                                                  │
└──────────────────────────────────────────────────┘
```

## 🔗 Links Diretos

- **Settings → API**: https://supabase.com/dashboard/project/bjkworafyogeszdvulvu/settings/api
- **Painel do Projeto**: https://supabase.com/dashboard/project/bjkworafyogeszdvulvu

## ✅ Verificação

Depois de colar a chave, abra o console do navegador (F12) quando carregar o site. Se você vir:
- `[CASAL MEL] Supabase inicializado com sucesso` → ✅ Funcionou!
- `[CASAL MEL] ⚠️ Configure as credenciais do Supabase` → ❌ Precisa configurar ainda

---

**Dica:** Se você não conseguir encontrar, pode me enviar uma captura de tela da página Settings → API (escondendo a chave completa) que eu te ajudo a identificar!

