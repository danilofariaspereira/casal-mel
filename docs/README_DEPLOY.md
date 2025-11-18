# 🚀 Deploy do Casal Mel - Guia Rápido

## ⚡ Deploy em 5 Minutos

### 1. **Preparar Repositório**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/casal-mel.git
git push -u origin main
```

### 2. **Deploy no Netlify**
1. Acesse: https://netlify.com
2. Clique: "New site from Git"
3. Conecte: Seu repositório GitHub
4. Deploy: Automático! 🎉

### 3. **Configurar Domínio**
1. Netlify: Site Settings > Domain Management
2. Adicionar: Seu domínio personalizado
3. DNS: Apontar para Netlify

## 🔗 URLs do Sistema

- **Site**: `https://seu-dominio.com/`
- **Login**: `https://seu-dominio.com/login`
- **Admin**: `https://seu-dominio.com/admin`

## 🔐 Credenciais de Acesso

- **Email**: `teste@teste`
- **Senha**: `123456`

## 📋 Checklist de Deploy

- [ ] Repositório Git criado
- [ ] Arquivos commitados
- [ ] Remote origin configurado
- [ ] Push realizado
- [ ] Deploy no Netlify/Vercel
- [ ] Domínio configurado
- [ ] HTTPS ativado
- [ ] Teste de funcionalidades

## 🛠️ Comandos Úteis

```bash
# Verificar status
git status

# Adicionar mudanças
git add .
git commit -m "Update"

# Fazer push
git push origin main

# Verificar logs
git log --oneline
```

## 🚨 Solução de Problemas

### Erro de Push
```bash
git pull origin main
git push origin main
```

### Deploy Falhou
1. Verificar console do Netlify
2. Verificar arquivos obrigatórios
3. Verificar configurações

### Site Não Carrega
1. Verificar DNS
2. Verificar HTTPS
3. Verificar redirecionamentos

## 📞 Suporte

- **Console**: F12 para debug
- **Logs**: Prefixo `[CASAL MEL]`
- **Documentação**: `GUIA_DEPLOY_COMPLETO.md`

---

**🎉 Pronto! Seu site está no ar!**
