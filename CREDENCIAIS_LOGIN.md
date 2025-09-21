# 🔐 CREDENCIAIS DE LOGIN - ADMIN CASAL MEL

## 📋 Credenciais Configuradas

### **Usuário**
```
sra.mel.admin.com.ber
```

### **Senha**
```
123456
```

## 🚀 Como Acessar

1. **Abra o arquivo**: `login.html`
2. **Digite o usuário**: `sra.mel.admin.com.ber`
3. **Digite a senha**: `123456`
4. **Clique em "Entrar"**

## 🔧 Configuração Técnica

### **Arquivo**: `login.html`
```javascript
const validCredentials = {
    username: 'sra.mel.admin.com.ber',
    password: '123456'
};
```

### **Validação**
- **Usuário**: Deve ser exatamente `sra.mel.admin.com.ber`
- **Senha**: Deve ser exatamente `123456`
- **Sessão**: Mantém login por 24 horas
- **Redirecionamento**: Vai para `admin.html` após login

## 🎯 Funcionalidades

### **Após Login**
- ✅ **Acesso ao Dashboard** - Estatísticas e visão geral
- ✅ **Gerenciar Eventos** - Adicionar, editar, deletar
- ✅ **Gerenciar Shows** - Adicionar, editar, deletar
- ✅ **Menu Lateral** - Navegação intuitiva
- ✅ **Sincronização** - Com o site principal

### **Segurança**
- **Validação local** - JavaScript no cliente
- **Sessão persistente** - localStorage por 24h
- **Logout automático** - Após expiração
- **Redirecionamento** - Força login se não autenticado

## 📱 Acesso

### **Desktop**
1. Abra `login.html` no navegador
2. Digite as credenciais
3. Clique em "Entrar"
4. Acesse o admin com menu lateral

### **Mobile**
1. Mesmo processo do desktop
2. Menu lateral responsivo
3. Interface adaptada para touch

## 🔄 Alteração de Credenciais

Para alterar as credenciais, edite o arquivo `login.html`:

```javascript
const validCredentials = {
    username: 'NOVO_USUARIO',
    password: 'NOVA_SENHA'
};
```

## 📅 Data da Configuração

**Data**: 2024-12-19  
**Status**: ✅ Configurado  
**Testado**: ✅ Sim  
**Funcionando**: ✅ Sim  

---

**Credenciais configuradas com sucesso!** 🎉

**Usuário**: `sra.mel.admin.com.ber`  
**Senha**: `123456`
