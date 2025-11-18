# Guia de Configuração do Supabase - Casal Mel

Este guia explica como configurar o Supabase para usar como banco de dados do sistema Casal Mel.

## 📋 Pré-requisitos

1. Conta no Supabase (já criada)
2. Projeto Supabase criado: `bjkworafyogeszdvulvu`

## 🔧 Passo 1: Configurar o Banco de Dados

1. Acesse o painel do Supabase: https://supabase.com/dashboard/project/bjkworafyogeszdvulvu
2. Vá em **SQL Editor** (no menu lateral)
3. Abra o arquivo `supabase-schema.sql` que está na raiz do projeto
4. Copie todo o conteúdo do arquivo SQL
5. Cole no SQL Editor e clique em **RUN** para executar

Isso criará as tabelas `eventos` e `shows` com todas as configurações necessárias.

## 🔑 Passo 2: Obter as Credenciais do Supabase

1. No painel do Supabase, vá em **Settings** → **API**
2. Você encontrará:
   - **Project URL**: Algo como `https://bjkworafyogeszdvulvu.supabase.co`
   - **anon/public key**: Uma chave longa que começa com `eyJ...`

## ⚙️ Passo 3: Configurar as Credenciais no Projeto

1. Abra o arquivo `supabase-config.js`
2. Substitua `SUA_ANON_KEY_AQUI` pela **anon/public key** que você copiou
3. Verifique se a URL está correta (já deve estar configurada)

Exemplo:
```javascript
window.SUPABASE_CONFIG = {
    url: 'https://bjkworafyogeszdvulvu.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Cole sua chave aqui
};
```

## 🚀 Passo 4: Testar a Integração

1. Abra o arquivo `admin.html` no navegador
2. Faça login no sistema
3. Tente adicionar um evento ou show
4. Abra o console do navegador (F12) e verifique se há mensagens de debug
5. No painel do Supabase, vá em **Table Editor** e verifique se os dados foram salvos

## 📊 Verificando os Dados no Supabase

1. No painel do Supabase, vá em **Table Editor**
2. Você verá as tabelas `eventos` e `shows`
3. Clique em cada tabela para ver os dados salvos

## 🔄 Migração de Dados do localStorage

Se você já tem dados salvos no localStorage:

1. Os dados existentes serão automaticamente carregados do localStorage na primeira vez
2. Quando você salvar um novo evento/show, ele será salvo no Supabase
3. Para migrar todos os dados existentes:
   - No painel admin, recarregue a página
   - Os dados serão carregados do localStorage
   - Edite e salve cada evento/show para migrá-los para o Supabase

## ⚠️ Troubleshooting

### Erro: "Supabase não inicializado"
- Verifique se as credenciais estão corretas em `supabase-config.js`
- Verifique se o script do Supabase está carregado (verifique o console do navegador)

### Erro: "permission denied" ou "row level security"
- Verifique se executou o SQL do `supabase-schema.sql` corretamente
- As políticas de segurança (RLS) podem estar bloqueando. Verifique as políticas na aba **Authentication** → **Policies**

### Os dados não aparecem no Supabase
- Verifique o console do navegador para erros
- Verifique se a tabela foi criada corretamente
- Verifique se as políticas RLS permitem inserção/atualização

### O sistema ainda usa localStorage
- Se as credenciais não estiverem configuradas, o sistema usa localStorage como fallback
- Isso é intencional para manter o sistema funcionando mesmo sem Supabase configurado

## 📝 Estrutura das Tabelas

### Tabela `eventos`
- `id` (SERIAL PRIMARY KEY)
- `titulo` (TEXT)
- `data` (TEXT)
- `dia_semana` (TEXT)
- `local` (TEXT)
- `descricao` (TEXT)
- `whatsapp` (TEXT)
- `imagem` (TEXT) - Armazena data URL ou URL da imagem
- `ativo` (BOOLEAN)
- `criado_em` (TIMESTAMP)
- `atualizado_em` (TIMESTAMP)

### Tabela `shows`
- Mesma estrutura da tabela `eventos`

## 🔐 Segurança

- As políticas RLS estão configuradas para permitir leitura e escrita públicas
- Se precisar de mais segurança, ajuste as políticas no painel do Supabase
- Nunca compartilhe a chave `anonKey` publicamente (ela já está exposta no código, mas é a chave pública/anônima)

## 💡 Dicas

- O sistema mantém um cache no localStorage para melhor performance
- Se o Supabase estiver offline, o sistema usa localStorage como fallback
- Todos os dados são sincronizados automaticamente quando salvos

## 📞 Suporte

Se encontrar problemas, verifique:
1. Console do navegador (F12) para mensagens de erro
2. Logs do Supabase no painel
3. Se todas as etapas foram seguidas corretamente

