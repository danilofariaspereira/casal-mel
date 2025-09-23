# 🔗 Guia de URLs - Casal Mel

## 📍 **Como Identificar as URLs**

### **1. Após Deploy no Netlify**

Quando você fizer o deploy no Netlify, você receberá uma URL automática:

```
https://nomedo-projeto.netlify.app
```

**Exemplo**: `https://casal-mel-eventos.netlify.app`

### **2. URLs do Sistema**

Com base na URL do Netlify, suas URLs serão:

#### **🌐 Site Público (Principal)**
```
https://nomedo-projeto.netlify.app/
```
- **Arquivo**: `index.html`
- **Função**: Site público para visitantes
- **Acesso**: Qualquer pessoa

#### **🔐 Login do Admin**
```
https://nomedo-projeto.netlify.app/login
```
- **Arquivo**: `login.html`
- **Função**: Página de login para administradores
- **Acesso**: Apenas com credenciais

#### **⚙️ Dashboard Admin**
```
https://nomedo-projeto.netlify.app/admin
```
- **Arquivo**: `admin.html`
- **Função**: Painel administrativo
- **Acesso**: Apenas após login

## 🎯 **Exemplo Prático**

Se seu projeto no Netlify for `https://casal-mel-eventos.netlify.app`:

### **URLs Finais:**
- **Site**: `https://casal-mel-eventos.netlify.app/`
- **Login**: `https://casal-mel-eventos.netlify.app/login`
- **Admin**: `https://casal-mel-eventos.netlify.app/admin`

## 🔧 **Como Configurar Domínio Personalizado**

### **1. No Netlify**
1. Acesse: Site Settings > Domain Management
2. Clique: "Add custom domain"
3. Digite: `seu-dominio.com`
4. Configure DNS conforme instruções

### **2. URLs com Domínio Personalizado**
- **Site**: `https://seu-dominio.com/`
- **Login**: `https://seu-dominio.com/login`
- **Admin**: `https://seu-dominio.com/admin`

## 📱 **Como Testar as URLs**

### **1. Testar Site Público**
```
1. Acesse: https://sua-url.netlify.app/
2. Deve aparecer: Página principal do Casal Mel
3. Verifique: Seções de eventos e shows
```

### **2. Testar Login**
```
1. Acesse: https://sua-url.netlify.app/login
2. Deve aparecer: Página de login
3. Teste: teste@teste / 123456
```

### **3. Testar Admin**
```
1. Acesse: https://sua-url.netlify.app/admin
2. Deve redirecionar: Para login (se não logado)
3. Após login: Dashboard administrativo
```

## 🔍 **Como Encontrar Sua URL**

### **1. No Netlify**
1. Acesse: https://netlify.com
2. Clique: "Sites"
3. Clique: No seu projeto
4. Veja: URL na parte superior

### **2. No GitHub**
1. Acesse: Seu repositório
2. Clique: "Settings"
3. Clique: "Pages"
4. Veja: URL do GitHub Pages (se usar)

### **3. No Vercel**
1. Acesse: https://vercel.com
2. Clique: No seu projeto
3. Veja: URL na parte superior

## 🚨 **Problemas Comuns**

### **URL Não Funciona**
- ✅ Verificar se o deploy foi concluído
- ✅ Verificar se o domínio está correto
- ✅ Verificar se há erros no console

### **Redirecionamento Não Funciona**
- ✅ Verificar arquivo `netlify.toml`
- ✅ Verificar se os arquivos existem
- ✅ Verificar configurações de redirect

### **Admin Não Carrega**
- ✅ Verificar se está logado
- ✅ Verificar credenciais
- ✅ Verificar localStorage

## 📋 **Checklist de URLs**

- [ ] Site público carrega
- [ ] Login funciona
- [ ] Admin acessível após login
- [ ] Redirecionamentos funcionam
- [ ] HTTPS ativado
- [ ] Domínio personalizado (opcional)

## 🎉 **Resumo**

### **URLs Padrão:**
```
Site:    https://projeto.netlify.app/
Login:   https://projeto.netlify.app/login
Admin:   https://projeto.netlify.app/admin
```

### **Com Domínio Personalizado:**
```
Site:    https://seu-dominio.com/
Login:   https://seu-dominio.com/login
Admin:   https://seu-dominio.com/admin
```

---

**💡 Dica**: Após o deploy, o Netlify sempre mostra a URL do seu site na dashboard!
