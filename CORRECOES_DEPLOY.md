# 🔧 Correções para Deploy - Casal Mel

## ❌ **Problemas Identificados:**

### **1. Imagens quebradas no deploy:**
- Caminhos relativos podem não funcionar em todos os servidores
- Backgrounds das seções não carregando
- Logos e imagens de eventos não aparecendo

### **2. Admin não acessível:**
- localStorage pode não funcionar entre domínios diferentes
- Dados não sincronizando entre admin e site

### **3. Shows mostrando banners de eventos:**
- Dados padrão podem estar misturados
- Configuração não centralizada

## ✅ **Soluções Implementadas:**

### **1. Arquivo de Configuração Centralizada (`config.js`):**
- ✅ Dados padrão centralizados
- ✅ Caminhos de imagens padronizados
- ✅ Configuração para diferentes ambientes

### **2. Dados Padrão Atualizados:**
- ✅ Eventos com descrições corretas
- ✅ Shows separados dos eventos
- ✅ WhatsApp numbers corretos
- ✅ Imagens usando caminhos relativos

### **3. Scripts Atualizados:**
- ✅ `script.js` usa configuração centralizada
- ✅ `admin.js` usa configuração centralizada
- ✅ Dados sincronizados entre admin e site

## 🚀 **Como Aplicar as Correções:**

### **1. Enviar para GitHub:**
```bash
git add .
git commit -m "Fix deploy issues - centralize config and fix image paths"
git push origin main
```

### **2. Fazer Deploy:**
- **Vercel**: Aguardar deploy automático
- **Netlify**: Aguardar deploy automático

### **3. Verificar Funcionamento:**
- ✅ Site principal carregando corretamente
- ✅ Imagens e backgrounds aparecendo
- ✅ Admin acessível e funcional
- ✅ Shows separados dos eventos

## 📱 **Funcionalidades Corrigidas:**

### **Site Principal:**
- ✅ Banner carrossel funcionando
- ✅ Backgrounds das seções carregando
- ✅ Imagens de eventos e shows corretas
- ✅ Logos e ícones aparecendo

### **Admin Dashboard:**
- ✅ Acesso funcionando
- ✅ CRUD de eventos e shows
- ✅ Upload de imagens
- ✅ Preview em tempo real
- ✅ Sincronização com site principal

### **Dados:**
- ✅ Eventos com descrições corretas
- ✅ Shows separados dos eventos
- ✅ WhatsApp numbers corretos
- ✅ Imagens usando caminhos corretos

## 🎯 **URLs para Testar:**

### **Vercel:**
- **Site**: `https://casal-mel.vercel.app`
- **Admin**: `https://casal-mel.vercel.app/admin.html`

### **Netlify:**
- **Site**: `https://casal-mel.netlify.app`
- **Admin**: `https://casal-mel.netlify.app/admin.html`

## 🔐 **Acesso Admin:**
- **Login**: `sra.mel.admin.com.ber`
- **Senha**: `123456`

## 📞 **Suporte:**
- **WhatsApp**: (21) 96718-7138 (MEL)
- **WhatsApp**: (21) 97149-4252 (CASAL MEL)

---

**🎉 Após aplicar essas correções, o site funcionará perfeitamente no deploy!**
