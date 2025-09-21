# Deploy Script - Casal Mel Eventos
Write-Host "🚀 Deploy Casal Mel Eventos" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

Write-Host ""
Write-Host "📁 Verificando arquivos..." -ForegroundColor Yellow

# Verificar arquivos principais
$files = @("index.html", "admin.html", "login.html", "style.css", "script.js", "admin.js")
$missing = @()

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        $missing += $file
    }
}

if ($missing.Count -gt 0) {
    Write-Host "❌ Arquivos não encontrados:" -ForegroundColor Red
    foreach ($file in $missing) {
        Write-Host "   - $file" -ForegroundColor Red
    }
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Arquivos principais encontrados!" -ForegroundColor Green

Write-Host ""
Write-Host "🔧 Inicializando Git..." -ForegroundColor Yellow

# Inicializar Git se não existir
if (-not (Test-Path ".git")) {
    git init
}

# Adicionar arquivos
git add .

# Commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Deploy Casal Mel Eventos - $timestamp"

Write-Host ""
Write-Host "📤 Enviando para GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Certifique-se de ter configurado o repositório remoto!" -ForegroundColor Yellow

Write-Host ""
Write-Host "Comandos para configurar o repositório:" -ForegroundColor Cyan
Write-Host "git remote add origin https://github.com/SEUUSUARIO/casal-mel-eventos.git" -ForegroundColor White
Write-Host "git branch -M main" -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor White

Write-Host ""
Write-Host "Depois acesse:" -ForegroundColor Cyan
Write-Host "- Vercel: https://vercel.com" -ForegroundColor White
Write-Host "- Netlify: https://netlify.com" -ForegroundColor White

Write-Host ""
Read-Host "Pressione Enter para continuar"
