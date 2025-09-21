# 🚀 Guia Completo de Deploy - Casal Mel

## 📋 Opções de Deploy Gratuito

### **1. Vercel (RECOMENDADO) ⭐**

#### **Vantagens:**
- ✅ **100% gratuito** para projetos pessoais
- ✅ **Repositório privado** suportado
- ✅ **Deploy automático** do GitHub
- ✅ **HTTPS** automático
- ✅ **Domínio personalizado** gratuito
- ✅ **CDN global** (sites rápidos)
- ✅ **Preview de branches** (teste antes de publicar)

#### **Como fazer:**
1. **Acesse**: [vercel.com](https://vercel.com)
2. **Cadastre-se** com GitHub
3. **Clique** em "New Project"
4. **Selecione** seu repositório privado
5. **Configure**:
   - Framework: Other
   - Build Command: `echo 'Static site'`
   - Output Directory: `.`
6. **Deploy** automático!

#### **URL do site:**
- `https://casal-mel-eventos.vercel.app` (ou nome personalizado)

---

### **2. Netlify**

#### **Vantagens:**
- ✅ **100% gratuito** para projetos pessoais
- ✅ **Repositório privado** suportado
- ✅ **Deploy automático** do GitHub
- ✅ **HTTPS** automático
- ✅ **Formulários** gratuitos
- ✅ **CDN global**

#### **Como fazer:**
1. **Acesse**: [netlify.com](https://netlify.com)
2. **Cadastre-se** com GitHub
3. **Clique** em "New site from Git"
4. **Selecione** seu repositório privado
5. **Configure**:
   - Build Command: `echo 'Static site'`
   - Publish Directory: `.`
6. **Deploy** automático!

#### **URL do site:**
- `https://casal-mel-eventos.netlify.app` (ou nome personalizado)

---

### **3. GitHub Pages**

#### **Vantagens:**
- ✅ **100% gratuito**
- ✅ **HTTPS** automático
- ✅ **Integração** com GitHub
- ❌ **Apenas repositórios públicos** (gratuito)

#### **Como fazer:**
1. **Vá** para Settings do repositório
2. **Clique** em Pages (lateral esquerda)
3. **Selecione** Source: Deploy from a branch
4. **Escolha** Branch: main
5. **Clique** Save
6. **Aguarde** alguns minutos

#### **URL do site:**
- `https://seuusuario.github.io/casal-mel-eventos`

---

## 🔐 Repositório Privado

### **Como tornar privado:**
1. **Vá** para o repositório no GitHub
2. **Clique** em Settings (aba superior)
3. **Role** até "Danger Zone"
4. **Clique** em "Change repository visibility"
5. **Selecione** "Make private"
6. **Confirme** a mudança

### **Deploy com repositório privado:**
- ✅ **Vercel**: Suporta repositórios privados
- ✅ **Netlify**: Suporta repositórios privados
- ❌ **GitHub Pages**: Apenas repositórios públicos (gratuito)

---

## 🛠️ Configuração do Projeto

### **Arquivos criados:**
- ✅ `vercel.json` - Configuração Vercel
- ✅ `netlify.toml` - Configuração Netlify
- ✅ `package.json` - Dependências Node.js
- ✅ `README.md` - Documentação
- ✅ `.gitignore` - Arquivos ignorados

### **Estrutura final:**
```
casal-mel-eventos/
├── index.html          # Site principal
├── admin.html          # Painel admin
├── login.html          # Login admin
├── style.css           # Estilos
├── script.js           # JavaScript principal
├── admin.js            # JavaScript admin
├── img/                # Imagens
├── vercel.json         # Config Vercel
├── netlify.toml        # Config Netlify
├── package.json        # Dependências
├── README.md           # Documentação
└── .gitignore          # Git ignore
```

---

## 🚀 Passo a Passo Completo

### **1. Preparar Repositório:**
```bash
# Inicializar Git (se não tiver)
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit - Casal Mel Eventos"

# Conectar ao GitHub
git remote add origin https://github.com/seuusuario/casal-mel-eventos.git

# Push para GitHub
git push -u origin main
```

### **2. Tornar Repositório Privado:**
1. GitHub → Settings → Danger Zone
2. "Change repository visibility"
3. "Make private"

### **3. Deploy no Vercel:**
1. [vercel.com](https://vercel.com) → Sign up with GitHub
2. "New Project" → Select repository
3. Configure:
   - Framework: Other
   - Build Command: `echo 'Static site'`
   - Output Directory: `.`
4. Deploy!

### **4. Deploy no Netlify (alternativa):**
1. [netlify.com](https://netlify.com) → Sign up with GitHub
2. "New site from Git" → Select repository
3. Configure:
   - Build Command: `echo 'Static site'`
   - Publish Directory: `.`
4. Deploy!

---

## 🔧 Configurações Avançadas

### **Domínio Personalizado:**
1. **Vercel**: Settings → Domains → Add domain
2. **Netlify**: Site settings → Domain management → Add custom domain

### **Variáveis de Ambiente:**
- **Vercel**: Settings → Environment Variables
- **Netlify**: Site settings → Environment variables

### **Deploy Automático:**
- **Push para main**: Deploy automático
- **Pull Request**: Preview automático
- **Branch específica**: Deploy manual

---

## 📱 Testando o Deploy

### **1. Site Principal:**
- Acesse: `https://seu-site.vercel.app`
- Teste: Navegação, modais, responsividade

### **2. Admin:**
- Acesse: `https://seu-site.vercel.app/admin.html`
- Login: `sra.mel.admin.com.ber` / `123456`
- Teste: CRUD de eventos e shows

### **3. Mobile:**
- Teste em diferentes dispositivos
- Verifique responsividade
- Teste menu hambúrguer

---

## 🎯 Próximos Passos

### **1. Configurar Domínio:**
- Comprar domínio personalizado
- Configurar DNS
- Ativar HTTPS

### **2. Otimizações:**
- Compressão de imagens
- Minificação de CSS/JS
- Cache de arquivos estáticos

### **3. Monitoramento:**
- Google Analytics
- Vercel Analytics
- Netlify Analytics

---

## 🆘 Suporte

### **Problemas Comuns:**
1. **Deploy falha**: Verifique se todos os arquivos estão no repositório
2. **Site não carrega**: Verifique se o arquivo principal é `index.html`
3. **Admin não funciona**: Verifique se `admin.js` está carregando

### **Contato:**
- **WhatsApp**: (21) 96718-7138 (MEL)
- **WhatsApp**: (21) 97149-4252 (CASAL MEL)

---

**🎉 Seu site estará no ar em poucos minutos!**
