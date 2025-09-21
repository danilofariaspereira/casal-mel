// ========================================
// SISTEMA ADMIN - CASAL MEL
// ========================================

// Dados
let eventos = [];
let shows = [];

// Contador de IDs
let proximoIdEvento = 1;
let proximoIdShow = 1;

// ========================================
// INICIALIZAÇÃO
// ========================================

function inicializarAdmin() {
    console.log('🚀 Inicializando admin Casal Mel...');
    
    // Carrega dados do localStorage
    carregarDadosDoLocalStorage();
    
    // Carrega dados padrão se não houver dados
    if (eventos.length === 0 && shows.length === 0) {
        carregarDadosPadrao();
    }
    
    // Atualiza interface
    atualizarDashboard();
    renderizarListas();
    
    // Inicializa formulários
    inicializarFormularios();
    
    console.log('✅ Admin inicializado com sucesso!');
}

// ========================================
// SISTEMA DE DADOS
// ========================================

function removerEventosPassados() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas a data
    
    // Remove eventos passados
    const eventosAntes = eventos.length;
    eventos = eventos.filter(evento => {
        const dataEvento = converterDataBrasileira(evento.data);
        if (!dataEvento) {
            console.log('⚠️ Data inválida encontrada no evento:', evento.data);
            return true; // Mantém evento se data for inválida
        }
        dataEvento.setHours(0, 0, 0, 0);
        return dataEvento >= hoje;
    });
    
    // Remove shows passados
    const showsAntes = shows.length;
    shows = shows.filter(show => {
        const dataShow = converterDataBrasileira(show.data);
        if (!dataShow) {
            console.log('⚠️ Data inválida encontrada no show:', show.data);
            return true; // Mantém show se data for inválida
        }
        dataShow.setHours(0, 0, 0, 0);
        return dataShow >= hoje;
    });
    
    const eventosRemovidos = eventosAntes - eventos.length;
    const showsRemovidos = showsAntes - shows.length;
    
    if (eventosRemovidos > 0 || showsRemovidos > 0) {
        console.log(`🗑️ Removidos ${eventosRemovidos} eventos e ${showsRemovidos} shows passados automaticamente`);
        salvarDados();
    }
}

function converterDataBrasileira(dataStr) {
    try {
        if (!dataStr || typeof dataStr !== 'string') {
            return null;
        }
        
        // Mapeia meses em português para números
        const meses = {
            'janeiro': '01', 'fevereiro': '02', 'março': '03', 'abril': '04',
            'maio': '05', 'junho': '06', 'julho': '07', 'agosto': '08',
            'setembro': '09', 'outubro': '10', 'novembro': '11', 'dezembro': '12'
        };
        
        // Limpa a string e converte para minúsculo
        const dataLimpa = dataStr.trim().toLowerCase();
        
        // Extrai dia, mês e ano da string
        const partes = dataLimpa.split(' de ');
        if (partes.length === 3) {
            const dia = partes[0].trim().padStart(2, '0');
            const mesNome = partes[1].trim();
            const ano = partes[2].trim();
            
            const mes = meses[mesNome];
            
            if (mes && ano && dia) {
                const dataConvertida = new Date(`${ano}-${mes}-${dia}`);
                
                // Verifica se a data é válida
                if (dataConvertida instanceof Date && !isNaN(dataConvertida)) {
                    return dataConvertida;
                }
            }
        }
        
        // Tenta outros formatos comuns
        // Formato: DD/MM/YYYY
        const formatoDDMMYYYY = dataStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (formatoDDMMYYYY) {
            const [, dia, mes, ano] = formatoDDMMYYYY;
            const dataConvertida = new Date(`${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
            if (dataConvertida instanceof Date && !isNaN(dataConvertida)) {
                return dataConvertida;
            }
        }
        
        // Se não conseguir converter, retorna null
        console.log('⚠️ Formato de data não reconhecido:', dataStr);
        return null;
    } catch (error) {
        console.log('❌ Erro ao converter data:', dataStr, error);
        return null;
    }
}

function carregarDadosDoLocalStorage() {
    try {
        const dadosSalvos = localStorage.getItem('casal-mel-dados');
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            eventos = dados.eventos || [];
            shows = dados.shows || [];
            
            // Atualiza contadores de ID
            proximoIdEvento = Math.max(...eventos.map(e => e.id), 0) + 1;
            proximoIdShow = Math.max(...shows.map(s => s.id), 0) + 1;
            
            // Remove eventos passados automaticamente
            removerEventosPassados();
            
            console.log('📦 Dados carregados do localStorage:', dados);
            console.log('📅 Eventos carregados:', eventos.length);
            console.log('🎭 Shows carregados:', shows.length);
        }
    } catch (error) {
        console.error('❌ Erro ao carregar dados do localStorage:', error);
    }
}

function salvarDados() {
    try {
        const dados = {
            eventos: eventos,
            shows: shows,
            ultimaAtualizacao: Date.now()
        };
        localStorage.setItem('casal-mel-dados', JSON.stringify(dados));
        console.log('💾 Dados salvos no localStorage:', dados);
    } catch (error) {
        console.error('❌ Erro ao salvar dados no localStorage:', error);
    }
}

function salvarDadosNoLocalStorage() {
    try {
        const dados = {
            eventos: eventos,
            shows: shows,
            ultimaAtualizacao: Date.now()
        };
        localStorage.setItem('casal-mel-dados', JSON.stringify(dados));
        console.log('💾 Dados salvos no localStorage:', dados);
        return true;
    } catch (error) {
        console.error('❌ Erro ao salvar dados no localStorage:', error);
        return false;
    }
}

function carregarDadosPadrao() {
    // Dados padrão usando as imagens existentes
    eventos = [
        {
            id: 1,
            titulo: "Evento de Exemplo",
            data: "15 de Janeiro de 2024",
            local: "Local do Evento",
            descricao: "Descrição do evento de exemplo",
            imagem: "img/evento-01.jpeg",
            whatsapp: "21999999999"
        },
        {
            id: 2,
            titulo: "Transmissão dos Jogos",
            data: "20 de Janeiro de 2024",
            local: "Local Especial",
            descricao: "TRANSMISSÃO DOS JOGOS\n\nSORTEIOS DE BALDE DE CERVEJAS P/ QUEM ESTIVER C/ CAMISA DE TIME (QUALQUER TIME)\n\nPALPITE PREMIADO\nCHEGUE ANTES DO JOGO COMEÇAR, FAÇA SEU PALPITE PREMIADO, ACERTOU O PLACAR GANHOU R$100\n\nDEGUSTAÇÃO DE CALDO🍵\n\nQUARTO DA SACANAGEM HOTWIFE  SRA.MEL🔥😈\n\nDJ FABYANO🎶🎤\n\nPiscina, Cabines Glory Hole, Quarto de Casal, Quarto Aquário, Quarto Coletivo\n\nValores: 👇🏼\n\n🕺💃 CASAL ENTRADA GRÁTIS A NOITE TODA S/ BEBIDAS E COOLER, C/ COLLER E BEBIDAS R$50,00\n\n💃 SOLTEIRAS ENTRADA GRÁTIS A NOITE TODA S/ COOLER E BEBIDAS, C/ COOLER E BEBIDAS   R$20\n\n🕺 SOLTEIROS R$80 ANTECIPADO NO PIX, NA HORA R$100",
            imagem: "img/evento-02.jpeg",
            whatsapp: "21999999999"
        }
    ];
    
    shows = [
        {
            id: 1,
            titulo: "Show de Exemplo",
            data: "20 de Janeiro de 2024",
            local: "Local do Show",
            descricao: "Descrição do show de exemplo",
            imagem: "img/evento-03.jpeg",
            whatsapp: "21999999999"
        },
        {
            id: 2,
            titulo: "DJ Fabyano",
            data: "25 de Janeiro de 2024",
            local: "Local Especial",
            descricao: "Show exclusivo com DJ Fabyano\n\nMúsica ao vivo e muito mais!\n\nVenha se divertir conosco!",
            imagem: "img/evento-04.jpeg",
            whatsapp: "21999999999"
        }
    ];
    
    proximoIdEvento = 3;
    proximoIdShow = 3;
    
    console.log('📋 Dados padrão carregados');
    salvarDadosNoLocalStorage();
}

// ========================================
// DASHBOARD
// ========================================

function atualizarDashboard() {
    document.getElementById('total-eventos').textContent = eventos.length;
    document.getElementById('total-shows').textContent = shows.length;
}

// ========================================
// RENDERIZAÇÃO DAS LISTAS
// ========================================

function renderizarListas() {
    renderizarListaEventos();
    renderizarListaShows();
}

function renderizarListaEventos() {
    const container = document.getElementById('eventos-lista');
    if (!container) return;
    
    if (eventos.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-gray-400 text-xl">Nenhum evento cadastrado</p></div>';
        return;
    }
    
    container.innerHTML = eventos.map(evento => `
        <div class="admin-card p-4 card-hover">
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-yellow-400 text-lg">${evento.titulo}</h3>
                <div class="flex space-x-2">
                    <button onclick="editarEvento(${evento.id})" class="text-blue-400 hover:text-blue-300 p-1">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deletarEvento(${evento.id})" class="text-red-400 hover:text-red-300 p-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="text-sm text-gray-300 mb-2"><i class="fas fa-calendar mr-2"></i>${evento.data}</p>
            <p class="text-sm text-gray-300 mb-3"><i class="fas fa-map-marker-alt mr-2"></i>${evento.local}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">ID: ${evento.id}</span>
                <button onclick="previewEvento(${evento.id})" class="text-green-400 hover:text-green-300 text-sm">
                    <i class="fas fa-eye mr-1"></i>Preview
                </button>
            </div>
        </div>
    `).join('');
}

function renderizarListaShows() {
    const container = document.getElementById('shows-lista');
    if (!container) return;
    
    if (shows.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-gray-400 text-xl">Nenhum show cadastrado</p></div>';
        return;
    }
    
    container.innerHTML = shows.map(show => `
        <div class="admin-card p-4 card-hover">
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-yellow-400 text-lg">${show.titulo}</h3>
                <div class="flex space-x-2">
                    <button onclick="editarShow(${show.id})" class="text-blue-400 hover:text-blue-300 p-1">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deletarShow(${show.id})" class="text-red-400 hover:text-red-300 p-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="text-sm text-gray-300 mb-2"><i class="fas fa-calendar mr-2"></i>${show.data}</p>
            <p class="text-sm text-gray-300 mb-3"><i class="fas fa-map-marker-alt mr-2"></i>${show.local}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">ID: ${show.id}</span>
                <button onclick="previewShow(${show.id})" class="text-green-400 hover:text-green-300 text-sm">
                    <i class="fas fa-eye mr-1"></i>Preview
                </button>
            </div>
        </div>
    `).join('');
}

// ========================================
// FUNÇÕES DE PREVIEW
// ========================================

function previewEvento(id) {
    const evento = eventos.find(e => e.id === id);
    if (!evento) return;
    
    // Mostra preview de como ficará no site
    mostrarPreviewSite(evento, 'evento');
}

function previewShow(id) {
    const show = shows.find(s => s.id === id);
    if (!show) return;
    
    // Mostra preview de como ficará no site
    mostrarPreviewSite(show, 'show');
}

// ========================================
// SISTEMA DE MODAIS
// ========================================

function fecharModal(modalId) {
    console.log('🔒 Fechando modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        console.log('✅ Modal fechado:', modalId);
    } else {
        console.log('❌ Modal não encontrado:', modalId);
    }
}

function fecharModalAoClicarFora(event, modalId) {
    if (event.target.id === modalId) {
        fecharModal(modalId);
    }
}

function abrirModalEvento(id = null) {
    const modal = document.getElementById('evento-modal');
    const form = document.getElementById('evento-form');
    
    // Limpa formulário
    form.reset();
    const preview = document.getElementById('evento-imagem-preview');
    if (preview) preview.classList.add('hidden');
    
    if (id) {
        // Modo edição
        const evento = eventos.find(e => e.id === id);
        if (evento) {
            const titulo = document.getElementById('evento-titulo');
            const data = document.getElementById('evento-data');
            const local = document.getElementById('evento-local');
            const descricao = document.getElementById('evento-descricao');
            const whatsapp = document.getElementById('evento-whatsapp');
            
            if (titulo) titulo.value = evento.titulo;
            if (data) data.value = evento.data;
            if (local) local.value = evento.local;
            if (descricao) descricao.value = evento.descricao;
            if (whatsapp) whatsapp.value = evento.whatsapp;
            
            if (evento.imagem && preview) {
                const img = document.getElementById('evento-imagem-preview-img');
                if (img) {
                    img.src = evento.imagem;
                    preview.classList.remove('hidden');
                }
            }
        }
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function abrirModalShow(id = null) {
    const modal = document.getElementById('show-modal');
    const form = document.getElementById('show-form');
    
    // Limpa formulário
    form.reset();
    const preview = document.getElementById('show-imagem-preview');
    if (preview) preview.classList.add('hidden');
    
    if (id) {
        // Modo edição
        const show = shows.find(s => s.id === id);
        if (show) {
            const titulo = document.getElementById('show-titulo');
            const data = document.getElementById('show-data');
            const local = document.getElementById('show-local');
            const descricao = document.getElementById('show-descricao');
            const whatsapp = document.getElementById('show-whatsapp');
            
            if (titulo) titulo.value = show.titulo;
            if (data) data.value = show.data;
            if (local) local.value = show.local;
            if (descricao) descricao.value = show.descricao;
            if (whatsapp) whatsapp.value = show.whatsapp;
            
            if (show.imagem && preview) {
                const img = document.getElementById('show-imagem-preview-img');
                if (img) {
                    img.src = show.imagem;
                    preview.classList.remove('hidden');
                }
            }
        }
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// ========================================
// INICIALIZAÇÃO DOS FORMULÁRIOS
// ========================================

function inicializarFormularios() {
    // Formulário de Evento
    const eventoForm = document.getElementById('evento-form');
    if (eventoForm) {
        eventoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            salvarEvento();
        });
    }
    
    // Formulário de Show
    const showForm = document.getElementById('show-form');
    if (showForm) {
        showForm.addEventListener('submit', function(e) {
            e.preventDefault();
            salvarShow();
        });
    }
    
    // Upload de imagem - Evento
    const eventoImagem = document.getElementById('evento-imagem');
    if (eventoImagem) {
        eventoImagem.addEventListener('change', function(e) {
            handleImageUpload(e, 'evento-imagem-preview');
        });
    }
    
    // Upload de imagem - Show
    const showImagem = document.getElementById('show-imagem');
    if (showImagem) {
        showImagem.addEventListener('change', function(e) {
            handleImageUpload(e, 'show-imagem-preview');
        });
    }
}

// ========================================
// SALVAR EVENTOS E SHOWS
// ========================================

function salvarEvento() {
    const titulo = document.getElementById('evento-titulo').value;
    const data = document.getElementById('evento-data').value;
    const local = document.getElementById('evento-local').value;
    const descricao = document.getElementById('evento-descricao').value;
    const whatsapp = document.getElementById('evento-whatsapp').value;
    const imagem = document.getElementById('evento-imagem').files[0];
    
    if (!titulo || !data || !local || !whatsapp) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    let imagemBase64 = '';
    if (imagem) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemBase64 = e.target.result;
            finalizarSalvarEvento(titulo, data, local, descricao, whatsapp, imagemBase64);
        };
        reader.readAsDataURL(imagem);
    } else {
        finalizarSalvarEvento(titulo, data, local, descricao, whatsapp, imagemBase64);
    }
}

function finalizarSalvarEvento(titulo, data, local, descricao, whatsapp, imagem) {
    const novoEvento = {
        id: proximoIdEvento++,
        titulo: titulo,
        data: data,
        local: local,
        descricao: descricao,
        whatsapp: whatsapp,
        imagem: imagem || 'img/evento-01.jpeg'
    };
    
    eventos.push(novoEvento);
    salvarDados();
    renderizarListas();
    atualizarDashboard();
    fecharModal('evento-modal');
    
    console.log('✅ Evento salvo:', novoEvento);
}

function salvarShow() {
    const titulo = document.getElementById('show-titulo').value;
    const data = document.getElementById('show-data').value;
    const local = document.getElementById('show-local').value;
    const descricao = document.getElementById('show-descricao').value;
    const whatsapp = document.getElementById('show-whatsapp').value;
    const imagem = document.getElementById('show-imagem').files[0];
    
    if (!titulo || !data || !local || !whatsapp) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    let imagemBase64 = '';
    if (imagem) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemBase64 = e.target.result;
            finalizarSalvarShow(titulo, data, local, descricao, whatsapp, imagemBase64);
        };
        reader.readAsDataURL(imagem);
    } else {
        finalizarSalvarShow(titulo, data, local, descricao, whatsapp, imagemBase64);
    }
}

function finalizarSalvarShow(titulo, data, local, descricao, whatsapp, imagem) {
    const novoShow = {
        id: proximoIdShow++,
        titulo: titulo,
        data: data,
        local: local,
        descricao: descricao,
        whatsapp: whatsapp,
        imagem: imagem || 'img/evento-03.jpeg'
    };
    
    shows.push(novoShow);
    salvarDados();
    renderizarListas();
    atualizarDashboard();
    fecharModal('show-modal');
    
    console.log('✅ Show salvo:', novoShow);
}

// ========================================
// EDITAR E DELETAR
// ========================================

function editarEvento(id) {
    abrirModalEvento(id);
}

function deletarEvento(id) {
    if (confirm('Tem certeza que deseja deletar este evento?')) {
        eventos = eventos.filter(e => e.id !== id);
        salvarDados();
        renderizarListas();
        atualizarDashboard();
        console.log('🗑️ Evento deletado:', id);
    }
}

function editarShow(id) {
    abrirModalShow(id);
}

function deletarShow(id) {
    if (confirm('Tem certeza que deseja deletar este show?')) {
        shows = shows.filter(s => s.id !== id);
        salvarDados();
        renderizarListas();
        atualizarDashboard();
        console.log('🗑️ Show deletado:', id);
    }
}

// ========================================
// SINCRONIZAÇÃO
// ========================================

function sincronizarDados() {
    salvarDados();
    
    // Notifica a página principal sobre a atualização
    if (window.opener) {
        window.opener.postMessage({
            type: 'dados-atualizados',
            dados: {
                eventos: eventos,
                shows: shows,
                ultimaAtualizacao: Date.now()
            }
        }, '*');
    }
    
    // Força reload da página principal se estiver aberta
    if (window.opener) {
        window.opener.location.reload();
    }
    
    console.log('🔄 Dados sincronizados com o site principal');
    alert('Dados sincronizados com sucesso!');
}

// ========================================
// UPLOAD DE IMAGENS
// ========================================

function handleImageUpload(event, targetInputId) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Valida o tipo de arquivo
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem');
        return;
    }
    
    // Valida o tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB');
        return;
    }
    
    // Converte para base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        
        // Atualiza o campo de URL com a imagem base64
        document.getElementById(targetInputId).value = base64;
        
        // Mostra o preview
        showImagePreview(base64, targetInputId + '-preview');
    };
    reader.readAsDataURL(file);
}

function showImagePreview(src, previewId) {
    const preview = document.getElementById(previewId);
    const img = document.getElementById(previewId + '-img');
    
    if (preview && img) {
        img.src = src;
        preview.classList.remove('hidden');
    }
}

// ========================================
// FORMULÁRIOS
// ========================================

function inicializarFormularios() {
    // Formulário de Evento
    document.getElementById('evento-form').addEventListener('submit', function(e) {
        e.preventDefault();
        salvarEvento();
    });
    
    // Formulário de Show
    document.getElementById('show-form').addEventListener('submit', function(e) {
        e.preventDefault();
        salvarShow();
    });
}

function salvarEvento() {
    const titulo = document.getElementById('evento-titulo').value;
    const data = document.getElementById('evento-data').value;
    const local = document.getElementById('evento-local').value;
    const descricao = document.getElementById('evento-descricao').value;
    const whatsapp = document.getElementById('evento-whatsapp').value;
    const imagem = document.getElementById('evento-imagem').files[0];
    
    if (!titulo || !data || !local || !whatsapp) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    let imagemBase64 = '';
    if (imagem) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemBase64 = e.target.result;
            finalizarSalvarEvento(titulo, data, local, descricao, whatsapp, imagemBase64);
        };
        reader.readAsDataURL(imagem);
    } else {
        finalizarSalvarEvento(titulo, data, local, descricao, whatsapp, imagemBase64);
    }
}

function finalizarSalvarEvento(titulo, data, local, descricao, whatsapp, imagem) {
    const novoEvento = {
        id: proximoIdEvento++,
        titulo: titulo,
        data: data,
        local: local,
        descricao: descricao,
        whatsapp: whatsapp,
        imagem: imagem || 'img/evento-01.jpeg'
    };
    
    eventos.push(novoEvento);
    salvarDados();
    renderizarListas();
    atualizarDashboard();
    fecharModal('evento-modal');
    
    console.log('✅ Evento salvo:', novoEvento);
}

function salvarShow() {
    const titulo = document.getElementById('show-titulo').value;
    const data = document.getElementById('show-data').value;
    const local = document.getElementById('show-local').value;
    const descricao = document.getElementById('show-descricao').value;
    const whatsapp = document.getElementById('show-whatsapp').value;
    const imagem = document.getElementById('show-imagem').files[0];
    
    if (!titulo || !data || !local || !whatsapp) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    let imagemBase64 = '';
    if (imagem) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemBase64 = e.target.result;
            finalizarSalvarShow(titulo, data, local, descricao, whatsapp, imagemBase64);
        };
        reader.readAsDataURL(imagem);
    } else {
        finalizarSalvarShow(titulo, data, local, descricao, whatsapp, imagemBase64);
    }
}

function finalizarSalvarShow(titulo, data, local, descricao, whatsapp, imagem) {
    const novoShow = {
        id: proximoIdShow++,
        titulo: titulo,
        data: data,
        local: local,
        descricao: descricao,
        whatsapp: whatsapp,
        imagem: imagem || 'img/evento-03.jpeg'
    };
    
    shows.push(novoShow);
    salvarDados();
    renderizarListas();
    atualizarDashboard();
    fecharModal('show-modal');
    
    console.log('✅ Show salvo:', novoShow);
}

// ========================================
// EDIÇÃO E EXCLUSÃO
// ========================================

function editarEvento(id) {
    abrirModalEvento(id);
}

function editarShow(id) {
    abrirModalShow(id);
}

function deletarEvento(id) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
        eventos = eventos.filter(e => e.id !== id);
        salvarDadosNoLocalStorage();
        renderizarListas();
        atualizarDashboard();
        console.log('🗑️ Evento excluído:', id);
    }
}

function deletarShow(id) {
    if (confirm('Tem certeza que deseja excluir este show?')) {
        shows = shows.filter(s => s.id !== id);
        salvarDadosNoLocalStorage();
        renderizarListas();
        atualizarDashboard();
        console.log('🗑️ Show excluído:', id);
    }
}

// ========================================
// SINCRONIZAÇÃO
// ========================================

function sincronizarDados() {
    const sucesso = salvarDadosNoLocalStorage();
    if (sucesso) {
        alert('✅ Dados sincronizados com sucesso!');
        console.log('🔄 Dados sincronizados');
    } else {
        alert('❌ Erro ao sincronizar dados');
    }
}

// ========================================
// FUNÇÕES GLOBAIS
// ========================================

// Função global para fechar modais
window.fecharModal = fecharModal;

// ========================================
// INICIALIZAÇÃO
// ========================================

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarAdmin);

// ========================================
// FUNÇÕES DE PREVIEW
// ========================================

function previewEvento(id) {
    const evento = eventos.find(e => e.id === id);
    if (!evento) return;
    
    // Mostra preview de como ficará no site
    mostrarPreviewSite(evento, 'evento');
}

function previewShow(id) {
    const show = shows.find(s => s.id === id);
    if (!show) return;
    
    // Mostra preview de como ficará no site
    mostrarPreviewSite(show, 'show');
}

// Função para mostrar preview do site
function mostrarPreviewSite(item, tipo) {
    // Atualiza preview do card
    document.getElementById('preview-imagem').src = item.imagem;
    document.getElementById('preview-titulo').textContent = item.titulo;
    document.getElementById('preview-data').innerHTML = `<i class="fas fa-calendar mr-2"></i>${item.data}`;
    document.getElementById('preview-local').innerHTML = `<i class="fas fa-map-marker-alt mr-2"></i>${item.local}`;
    
    // Atualiza preview do modal
    document.getElementById('preview-modal-imagem').src = item.imagem;
    document.getElementById('preview-modal-titulo').textContent = item.titulo;
    document.getElementById('preview-modal-descricao').innerHTML = item.descricao.replace(/\n/g, '<br>');
    document.getElementById('preview-modal-data').textContent = `Data: ${item.data}`;
    document.getElementById('preview-modal-local').textContent = `Local: ${item.local}`;
    // Define o número do WhatsApp baseado no tipo
    const numeroWhatsApp = item.whatsapp === '21967187138' ? '21967187138' : '21971494252';
    const mensagem = tipo === 'show' 
        ? encodeURIComponent("Olá, vim através do seu site. Gostaria de saber mais sobre shows.")
        : encodeURIComponent("Olá, vim através do seu site. Gostaria de saber mais informações sobre eventos.");
    document.getElementById('preview-modal-whatsapp').href = `https://wa.me/55${numeroWhatsApp}?text=${mensagem}`;
    
    // Ajusta o tipo de card (evento ou show)
    const previewCard = document.getElementById('preview-card');
    if (tipo === 'show') {
        previewCard.className = 'show-card card-hover max-w-sm w-full';
    } else {
        previewCard.className = 'event-card card-hover max-w-sm w-full';
    }
    
    // Abre o modal de preview
    document.getElementById('site-preview-modal').classList.remove('hidden');
    document.getElementById('site-preview-modal').classList.add('flex');
}


// Funções globais para uso nos botões
window.abrirModalEvento = abrirModalEvento;
window.abrirModalShow = abrirModalShow;
window.editarEvento = editarEvento;
window.deletarEvento = deletarEvento;
window.editarShow = editarShow;
window.deletarShow = deletarShow;
window.sincronizarDados = sincronizarDados;
window.fecharModal = fecharModal;
window.fecharModalAoClicarFora = fecharModalAoClicarFora;
window.previewEvento = previewEvento;
window.previewShow = previewShow;
window.mostrarPreviewSite = mostrarPreviewSite;