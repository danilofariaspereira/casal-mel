@echo off
echo 🚀 Deploy Casal Mel Eventos
echo ================================

echo.
echo 📁 Verificando arquivos...
if not exist "index.html" (
    echo ❌ Arquivo index.html não encontrado!
    pause
    exit /b 1
)

if not exist "admin.html" (
    echo ❌ Arquivo admin.html não encontrado!
    pause
    exit /b 1
)

echo ✅ Arquivos principais encontrados!

echo.
echo 🔧 Inicializando Git...
git init
git add .
git commit -m "Deploy Casal Mel Eventos - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

echo.
echo 📤 Enviando para GitHub...
echo ⚠️  Certifique-se de ter configurado o repositório remoto!
echo.
echo Comandos para configurar o repositório:
echo git remote add origin https://github.com/SEUUSUARIO/casal-mel-eventos.git
echo git branch -M main
echo git push -u origin main
echo.
echo Depois acesse:
echo - Vercel: https://vercel.com
echo - Netlify: https://netlify.com
echo.
pause
