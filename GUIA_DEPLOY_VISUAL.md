# 🚀 Guia Visual de Deploy - Casal Mel

## 📋 **PASSO A PASSO COMPLETO:**

### **Passo 1: Criar Repositório no GitHub**

1. **Acesse**: [github.com](https://github.com)
2. **Faça login** com sua conta
3. **Clique** no botão verde "New" (canto superior esquerdo)

![GitHub New Repository](https://via.placeholder.com/600x300/2d3748/ffffff?text=Clique+em+New+Repository)

4. **Preencha o formulário**:
   - **Repository name**: `casal-mel-eventos`
   - **Description**: `Site do Casal Mel - Eventos exclusivos e experiências únicas`
   - **Private**: ✅ Marque como privado
   - **NÃO** marque "Add a README file"
   - **NÃO** marque "Add .gitignore"
   - **NÃO** marque "Choose a license"

![GitHub Repository Form](https://via.placeholder.com/600x400/2d3748/ffffff?text=Preencha+o+formulário+com+os+dados)

5. **Clique** "Create repository"

### **Passo 2: Enviar Arquivos para o GitHub**

**Execute este comando no PowerShell:**

```powershell
git push -u origin main
```

### **Passo 3: Deploy no Vercel (RECOMENDADO)**

1. **Acesse**: [vercel.com](https://vercel.com)
2. **Clique** "Sign up with GitHub"

![Vercel Sign Up](https://via.placeholder.com/600x300/000000/ffffff?text=Sign+up+with+GitHub)

3. **Autorize** o Vercel a acessar seus repositórios
4. **Clique** "New Project"

![Vercel New Project](https://via.placeholder.com/600x300/000000/ffffff?text=New+Project)

5. **Selecione** o repositório `casal-mel-eventos`

![Vercel Select Repository](https://via.placeholder.com/600x300/000000/ffffff?text=Selecione+casal-mel-eventos)

6. **Configure o projeto**:
   - **Framework Preset**: Other
   - **Build Command**: `echo 'Static site'`
   - **Output Directory**: `.`
   - **Install Command**: (deixe vazio)

![Vercel Configuration](https://via.placeholder.com/600x400/000000/ffffff?text=Configure+o+projeto)

7. **Clique** "Deploy"

![Vercel Deploy](https://via.placeholder.com/600x200/000000/ffffff?text=Deploy)

### **Passo 4: Deploy no Netlify (Alternativa)**

1. **Acesse**: [netlify.com](https://netlify.com)
2. **Clique** "Sign up with GitHub"

![Netlify Sign Up](https://via.placeholder.com/600x300/00ad9f/ffffff?text=Sign+up+with+GitHub)

3. **Autorize** o Netlify a acessar seus repositórios
4. **Clique** "New site from Git"

![Netlify New Site](https://via.placeholder.com/600x300/00ad9f/ffffff?text=New+site+from+Git)

5. **Selecione** GitHub e depois `casal-mel-eventos`

![Netlify Select Repository](https://via.placeholder.com/600x300/00ad9f/ffffff?text=Selecione+casal-mel-eventos)

6. **Configure o build**:
   - **Build Command**: `echo 'Static site'`
   - **Publish Directory**: `.`

![Netlify Configuration](https://via.placeholder.com/600x400/00ad9f/ffffff?text=Configure+o+build)

7. **Clique** "Deploy site"

![Netlify Deploy](https://via.placeholder.com/600x200/00ad9f/ffffff?text=Deploy+site)

## 🎯 **URLs Finais:**

### **Vercel:**
- **Site**: `https://casal-mel-eventos.vercel.app`
- **Admin**: `https://casal-mel-eventos.vercel.app/admin.html`

### **Netlify:**
- **Site**: `https://casal-mel-eventos.netlify.app`
- **Admin**: `https://casal-mel-eventos.netlify.app/admin.html`

## 🔐 **Acesso Admin:**
- **Login**: `sra.mel.admin.com.ber`
- **Senha**: `123456`

## ✅ **Verificações:**

### **1. Repositório GitHub:**
- Acesse: `https://github.com/danilofariaspereira/casal-mel-eventos`
- Deve mostrar todos os arquivos do projeto

### **2. Deploy Vercel:**
- Dashboard deve mostrar "Deployed" em verde
- URL deve funcionar perfeitamente

### **3. Deploy Netlify:**
- Dashboard deve mostrar "Published" em verde
- URL deve funcionar perfeitamente

## 🆘 **Problemas Comuns:**

### **Erro 404:**
- Repositório não foi criado no GitHub
- Arquivos não foram enviados para o GitHub

### **Deploy falha:**
- Verifique se `index.html` está na raiz
- Verifique se não há erros de sintaxe

### **Site não carrega:**
- Aguarde alguns minutos após o deploy
- Verifique os logs no dashboard

## 📞 **Suporte:**

- **WhatsApp**: (21) 96718-7138 (MEL)
- **WhatsApp**: (21) 97149-4252 (CASAL MEL)

---

**🎉 Após seguir estes passos, seu site estará funcionando perfeitamente!**
