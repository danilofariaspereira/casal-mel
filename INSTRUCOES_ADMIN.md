# 📋 Instruções do Painel Administrativo

## 🎯 **Funcionalidades Implementadas**

### ✅ **Upload de Imagens do Computador**
- **Como usar:**
  1. Clique em "Escolher imagem do computador"
  2. Selecione uma imagem (JPG, PNG, GIF)
  3. A imagem será convertida automaticamente
  4. Aparecerá uma pré-visualização

- **Limitações:**
  - Tamanho máximo: 5MB
  - Formatos aceitos: JPG, PNG, GIF, WebP
  - A imagem é convertida para base64 (salva no banco)

### ✅ **Pré-visualização dos Eventos**
- **Como usar:**
  1. Preencha os dados do evento
  2. Clique em "Pré-visualizar"
  3. Veja como ficará na página principal
  4. Veja como ficará no modal de detalhes

- **O que mostra:**
  - Card do evento na seção de eventos
  - Modal de detalhes quando clicar em "Saiba Mais"
  - Layout responsivo (mobile e desktop)

### ✅ **Sincronização com Site Principal**
- **Como funciona:**
  1. Salve um evento no admin
  2. Os dados são salvos no localStorage
  3. A página principal carrega os dados automaticamente
  4. As mudanças aparecem instantaneamente

- **Requisitos:**
  - Abra o admin em uma nova aba (target="_blank")
  - Mantenha ambas as abas abertas
  - Os dados sincronizam automaticamente

## 🚀 **Como Usar o Sistema**

### **1. Acessar o Admin**
- Clique em "Admin" no menu do site
- Ou acesse diretamente: `admin.html`

### **2. Adicionar um Evento**
1. **Clique em "Novo Evento"**
2. **Preencha os dados:**
   - **Título:** Nome do evento
   - **Descrição:** Detalhes do evento
   - **Data:** Data do evento
   - **Local:** Local do evento
   - **Imagem:** Upload do computador OU URL
   - **WhatsApp:** Número para contato

3. **Pré-visualize:**
   - Clique em "Pré-visualizar"
   - Veja como ficará no site
   - Ajuste se necessário

4. **Salve:**
   - Clique em "Salvar"
   - O evento aparecerá no site automaticamente

### **3. Editar um Evento**
1. **Na lista de eventos:**
   - Clique no ícone de editar (lápis)
   - Ou clique no evento no dashboard

2. **Faça as alterações:**
   - Modifique os campos necessários
   - Use "Pré-visualizar" para ver as mudanças

3. **Salve:**
   - Clique em "Salvar"
   - As mudanças aparecerão no site

### **4. Gerenciar Banners**
1. **Vá para a seção "Banners"**
2. **Adicione um novo banner:**
   - Título do banner
   - Imagem (upload ou URL)
   - Ordem (1, 2, 3...)
   - Status (Ativo/Inativo)

3. **Os banners aparecerão no carrossel da primeira seção**

### **5. Gerenciar Shows**
1. **Vá para a seção "Shows"**
2. **Adicione um novo show:**
   - Nome do show
   - Imagem
   - WhatsApp para contato

3. **Os shows aparecerão no modal "Fale Conosco"**

## 🔍 **Sistema de Busca**

### **Busca Global (Dashboard)**
- Digite qualquer termo
- Busca em eventos, shows e banners
- Resultados em tempo real

### **Busca de Eventos**
- Digite o nome do evento
- Filtra a lista instantaneamente
- Funciona com títulos e descrições

## 📱 **Responsividade**

### **Desktop:**
- Layout completo com sidebar
- Modais otimizados
- Pré-visualização detalhada

### **Mobile:**
- Menu hambúrguer
- Layout adaptativo
- Touch-friendly

## 🔧 **Configurações**

### **Banco de Dados:**
1. **Vá para "Configurações"**
2. **Configure o Supabase:**
   - URL do projeto
   - Chave anônima
3. **Salve as configurações**

### **Fallback Google Sheets:**
- Se não configurar Supabase
- Usa Google Sheets automaticamente
- Funciona sem configuração adicional

## ⚠️ **Dicas Importantes**

### **Upload de Imagens:**
- ✅ Use imagens otimizadas (máximo 800px de largura)
- ✅ Formatos recomendados: JPG, PNG, WebP
- ✅ Tamanho máximo: 5MB
- ❌ Evite imagens muito pesadas

### **Pré-visualização:**
- ✅ Sempre pré-visualize antes de salvar
- ✅ Teste em mobile e desktop
- ✅ Verifique se a imagem está boa

### **Sincronização:**
- ✅ Mantenha o admin aberto em nova aba
- ✅ Os dados sincronizam automaticamente
- ✅ Não precisa recarregar a página

## 🚨 **Solução de Problemas**

### **Imagem não aparece:**
- Verifique se o arquivo é uma imagem válida
- Confirme se o tamanho é menor que 5MB
- Tente usar uma URL em vez de upload

### **Dados não sincronizam:**
- Recarregue a página principal
- Verifique se o admin está aberto
- Confirme se salvou corretamente

### **Pré-visualização não funciona:**
- Preencha pelo menos título e imagem
- Verifique se a imagem está carregada
- Tente recarregar a página

## 📞 **Suporte**

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Confirme se todos os campos estão preenchidos
3. Teste com uma imagem menor
4. Recarregue a página se necessário

**Sistema funcionando perfeitamente! 🎉**
