@echo off
echo 🚀 Deploy Automático - Casal Mel Eventos
echo ========================================

echo.
echo ⚠️  IMPORTANTE: Primeiro crie o repositório no GitHub!
echo.
echo 1. Acesse: https://github.com
echo 2. Clique em "New repository"
echo 3. Nome: casal-mel-eventos
echo 4. Marque como PRIVADO
echo 5. NÃO marque nenhuma opção adicional
echo 6. Clique "Create repository"
echo.
pause

echo.
echo 📤 Enviando arquivos para o GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ Erro ao enviar para o GitHub!
    echo Verifique se o repositório foi criado corretamente.
    pause
    exit /b 1
)

echo.
echo ✅ Arquivos enviados com sucesso!
echo.
echo 🌐 Agora faça o deploy:
echo.
echo VERCEL (Recomendado):
echo 1. Acesse: https://vercel.com
echo 2. Sign up with GitHub
echo 3. New Project
echo 4. Selecione: casal-mel-eventos
echo 5. Framework: Other
echo 6. Build Command: echo 'Static site'
echo 7. Output Directory: .
echo 8. Deploy!
echo.
echo NETLIFY (Alternativa):
echo 1. Acesse: https://netlify.com
echo 2. Sign up with GitHub
echo 3. New site from Git
echo 4. Selecione: casal-mel-eventos
echo 5. Build Command: echo 'Static site'
echo 6. Publish Directory: .
echo 7. Deploy site!
echo.
echo 🎉 Seu site estará funcionando em poucos minutos!
echo.
pause
