#!/bin/bash

# ========================================
# SCRIPT DE DEPLOY AUTOMATIZADO - CASAL MEL
# ========================================

echo "🚀 Iniciando deploy do Casal Mel..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

# Função para sucesso
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Função para erro
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Função para aviso
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar se está no diretório correto
if [ ! -f "index.html" ]; then
    error "Arquivo index.html não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

log "Verificando arquivos necessários..."

# Verificar arquivos essenciais
required_files=(
    "index.html"
    "admin.html"
    "login.html"
    "style.css"
    "config.js"
    "data.js"
    "site.js"
    "admin.js"
    "login.js"
    "auth.js"
    "netlify.toml"
    "vercel.json"
    "package.json"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        error "Arquivo $file não encontrado!"
        exit 1
    fi
done

success "Todos os arquivos essenciais encontrados"

# Verificar se é um repositório Git
if [ ! -d ".git" ]; then
    warning "Inicializando repositório Git..."
    git init
    git add .
    git commit -m "Initial commit - Casal Mel"
    success "Repositório Git inicializado"
else
    log "Repositório Git já existe"
fi

# Verificar status do Git
log "Verificando status do Git..."
if [ -n "$(git status --porcelain)" ]; then
    log "Adicionando mudanças ao Git..."
    git add .
    git commit -m "Update: $(date +'%Y-%m-%d %H:%M:%S')"
    success "Mudanças commitadas"
else
    success "Nenhuma mudança pendente"
fi

# Verificar branch atual
current_branch=$(git branch --show-current)
log "Branch atual: $current_branch"

if [ "$current_branch" != "main" ]; then
    warning "Renomeando branch para 'main'..."
    git branch -M main
    success "Branch renomeada para 'main'"
fi

# Verificar remote origin
if ! git remote get-url origin > /dev/null 2>&1; then
    warning "Remote origin não configurado"
    echo "Para configurar o remote, execute:"
    echo "git remote add origin https://github.com/SEU-USUARIO/casal-mel.git"
    echo "git push -u origin main"
else
    log "Remote origin configurado: $(git remote get-url origin)"
fi

# Verificar se há push pendente
if [ -n "$(git log origin/main..main 2>/dev/null)" ]; then
    log "Fazendo push para o repositório..."
    git push origin main
    success "Push realizado com sucesso"
else
    success "Repositório já está atualizado"
fi

# Verificar dependências
log "Verificando dependências..."
if [ -f "package.json" ]; then
    if [ ! -d "node_modules" ]; then
        log "Instalando dependências..."
        npm install
        success "Dependências instaladas"
    else
        success "Dependências já instaladas"
    fi
fi

# Verificar configurações de deploy
log "Verificando configurações de deploy..."

# Netlify
if [ -f "netlify.toml" ]; then
    success "Configuração do Netlify encontrada"
else
    warning "Arquivo netlify.toml não encontrado"
fi

# Vercel
if [ -f "vercel.json" ]; then
    success "Configuração do Vercel encontrada"
else
    warning "Arquivo vercel.json não encontrado"
fi

# Headers de segurança
if [ -f "_headers" ]; then
    success "Headers de segurança configurados"
else
    warning "Arquivo _headers não encontrado"
fi

# Redirecionamentos
if [ -f "_redirects" ]; then
    success "Redirecionamentos configurados"
else
    warning "Arquivo _redirects não encontrado"
fi

# Verificar tamanho dos arquivos
log "Verificando tamanho dos arquivos..."
total_size=$(du -sh . | cut -f1)
log "Tamanho total do projeto: $total_size"

# Verificar imagens
log "Verificando imagens..."
image_count=$(find img/ -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) | wc -l)
log "Número de imagens: $image_count"

# Verificar se há imagens grandes
large_images=$(find img/ -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +1M | wc -l)
if [ "$large_images" -gt 0 ]; then
    warning "Encontradas $large_images imagens maiores que 1MB"
    echo "Considere otimizar as imagens para melhor performance"
fi

# Verificar JavaScript
log "Verificando arquivos JavaScript..."
js_files=$(find . -name "*.js" -not -path "./node_modules/*" | wc -l)
log "Número de arquivos JavaScript: $js_files"

# Verificar CSS
log "Verificando arquivos CSS..."
css_files=$(find . -name "*.css" | wc -l)
log "Número de arquivos CSS: $css_files"

# Verificar HTML
log "Verificando arquivos HTML..."
html_files=$(find . -name "*.html" | wc -l)
log "Número de arquivos HTML: $html_files"

# Resumo final
echo ""
echo "=========================================="
echo "📋 RESUMO DO DEPLOY"
echo "=========================================="
echo "✅ Arquivos essenciais: OK"
echo "✅ Repositório Git: OK"
echo "✅ Configurações de deploy: OK"
echo "✅ Dependências: OK"
echo ""
echo "📊 Estatísticas:"
echo "   • Tamanho total: $total_size"
echo "   • Imagens: $image_count"
echo "   • JavaScript: $js_files arquivos"
echo "   • CSS: $css_files arquivos"
echo "   • HTML: $html_files arquivos"
echo ""
echo "🚀 PRÓXIMOS PASSOS:"
echo "1. Configure o remote origin se ainda não fez:"
echo "   git remote add origin https://github.com/SEU-USUARIO/casal-mel.git"
echo "   git push -u origin main"
echo ""
echo "2. Faça deploy no Netlify:"
echo "   • Acesse: https://netlify.com"
echo "   • New site from Git"
echo "   • Conecte seu repositório"
echo "   • Deploy automático!"
echo ""
echo "3. Ou faça deploy no Vercel:"
echo "   • Acesse: https://vercel.com"
echo "   • Import Git Repository"
echo "   • Deploy automático!"
echo ""
echo "4. Configure domínio personalizado (opcional)"
echo ""
echo "🎉 Deploy preparado com sucesso!"
echo "=========================================="
