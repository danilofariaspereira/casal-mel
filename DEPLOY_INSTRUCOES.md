# 🚀 Instruções de Deploy - Casal Mel

## 📋 **Pré-requisitos**

- ✅ Arquivos do projeto prontos
- ✅ Conta no Vercel/Netlify/Render (gratuita)
- ✅ Navegador moderno

## 🎯 **Opções de Deploy Gratuito**

### **1. Vercel (Recomendado) ⭐**

#### **Método 1: Upload Direto**
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/Google
3. Clique em "New Project"
4. Arraste a pasta do projeto
5. Clique em "Deploy"
6. ✅ **Pronto!** URL gerada automaticamente

#### **Método 2: GitHub + Vercel**
1. Crie repositório no GitHub
2. Faça upload dos arquivos
3. Conecte o repositório ao Vercel
4. Deploy automático a cada push

### **2. Netlify**

#### **Método 1: Drag & Drop**
1. Acesse [netlify.com](https://netlify.com)
2. Faça login
3. Arraste a pasta para a área de deploy
4. ✅ **Pronto!** URL gerada automaticamente

#### **Método 2: GitHub + Netlify**
1. Conecte repositório GitHub
2. Deploy automático
3. URL personalizada

### **3. Render**

1. Acesse [render.com](https://render.com)
2. Crie conta gratuita
3. Conecte repositório GitHub
4. Selecione "Static Site"
5. Deploy automático

## 🔧 **Configurações Recomendadas**

### **Vercel (Configuração Automática)**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ]
}
```

### **Netlify (netlify.toml)**
```toml
[build]
  publish = "."
  command = "echo 'Static site'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📱 **Teste Pós-Deploy**

### **1. Site Principal**
- [ ] Carregamento da página
- [ ] Carousel de banners funcionando
- [ ] Eventos aparecendo
- [ ] Shows aparecendo
- [ ] Modais abrindo
- [ ] Responsividade mobile

### **2. Dashboard Admin**
- [ ] Acesso ao admin.html
- [ ] Criação de evento
- [ ] Upload de imagem
- [ ] Sincronização com site
- [ ] Edição de dados
- [ ] Exclusão de dados

### **3. Funcionalidades**
- [ ] Dados salvos no localStorage
- [ ] Sincronização automática
- [ ] Upload de imagens
- [ ] Formatação de texto
- [ ] Links do WhatsApp

## 🎨 **Personalização Pós-Deploy**

### **1. Alterar Cores**
Edite `style.css`:
```css
:root {
  --cor-primaria: #f59e0b;
  --cor-secundaria: #1f2937;
  --cor-fundo: #111827;
}
```

### **2. Alterar Textos**
Edite `index.html` e `admin.html`:
- Títulos das seções
- Textos de botões
- Informações de contato

### **3. Adicionar Novas Seções**
1. Crie nova seção no HTML
2. Adicione estilos no CSS
3. Implemente funcionalidade no JS

## 🔄 **Atualizações**

### **Vercel**
- Push para GitHub = Deploy automático
- Ou re-upload dos arquivos

### **Netlify**
- Push para GitHub = Deploy automático
- Ou drag & drop dos arquivos

### **Render**
- Push para GitHub = Deploy automático
- Ou re-upload via interface

## 📊 **Monitoramento**

### **Vercel**
- Dashboard com estatísticas
- Logs de deploy
- Analytics de performance

### **Netlify**
- Dashboard com métricas
- Logs de build
- Analytics de tráfego

### **Render**
- Dashboard com logs
- Métricas de uso
- Status de saúde

## 🛠️ **Solução de Problemas**

### **Problema: Site não carrega**
- ✅ Verifique se todos os arquivos foram enviados
- ✅ Confirme se o index.html está na raiz
- ✅ Teste localmente primeiro

### **Problema: Admin não funciona**
- ✅ Verifique se admin.html está acessível
- ✅ Confirme se JavaScript está habilitado
- ✅ Teste em modo incógnito

### **Problema: Imagens não aparecem**
- ✅ Verifique se as URLs estão corretas
- ✅ Confirme se as imagens foram enviadas
- ✅ Teste upload de nova imagem

### **Problema: Dados não salvam**
- ✅ Verifique se localStorage está habilitado
- ✅ Confirme se JavaScript está funcionando
- ✅ Teste em navegador diferente

## 🎉 **Deploy Concluído!**

Após o deploy, você terá:
- ✅ **URL pública** do site
- ✅ **URL do admin** (sua-url.com/admin.html)
- ✅ **Sistema funcionando** 100%
- ✅ **Deploy gratuito** e permanente

## 📞 **Suporte**

Se precisar de ajuda:
1. Verifique os logs de deploy
2. Teste localmente primeiro
3. Confirme se todos os arquivos foram enviados
4. Verifique se não há erros no console

---

**🚀 Seu site está pronto para o mundo!** 🌍
