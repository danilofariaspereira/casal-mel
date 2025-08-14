// Dados dos eventos (para os modais)
const eventos = [
    {
        id: 1,
        titulo: "Festa do Prazer",
        descricao: "Uma noite de diversão e prazer com música, drinks e surpresas. Venha e sinta a energia!",
        data: "25 de Setembro de 2024",
        local: "Clube da Colmeia",
        imagem: "https://drive.google.com/file/d/1-er9WzlbYbXxQQhOnyZ6GkJld9s6rrF3/view?usp=drive_link"
    },
    {
        id: 2,
        titulo: "Noite do Fetiche",
        descricao: "Explore seus desejos mais profundos em um ambiente seguro e cheio de mistério. Use sua melhor fantasia!",
        data: "10 de Outubro de 2024",
        local: "Mansão Secreta",
        imagem: "img/evento-02.jpeg"
    },
    {
        id: 3,
        titulo: "Jantar Secreto",
        descricao: "Um jantar exclusivo e sensual para casais que buscam uma experiência gastronômica e erótica única.",
        data: "05 de Novembro de 2024",
        local: "Restaurante Privado",
        imagem: "img/evento-03.jpeg"
    },
    {
        id: 4,
        titulo: "Baile de Máscaras",
        descricao: "Misteriosos e sensuais, atrás das máscaras a noite ganha um novo significado. Ouse revelar o seu eu!",
        data: "20 de Dezembro de 2024",
        local: "Salão de Eventos",
        imagem: "img/evento-04.jpeg"
    },
    {
        id: 5,
        titulo: "Pool Party Hot",
        descricao: "O verão nunca foi tão quente! Mergulhe em uma festa à beira da piscina com muita música e diversão.",
        data: "15 de Janeiro de 2025",
        local: "Resort Exclusivo",
        imagem: "img/evento-05.jpeg"
    },
    {
        id: 6,
        titulo: "Noite dos Segredos",
        descricao: "Compartilhe seus segredos e descubra novas fantasias em uma noite de jogos e revelações.",
        data: "28 de Fevereiro de 2025",
        local: "Lounge Bar",
        imagem: "img/evento-06.jpeg"
    },
    {
        id: 7,
        titulo: "Encontro Casual",
        descricao: "Um encontro descontraído para conhecer novas pessoas e explorar novas conexões. Venha e relaxe!",
        data: "10 de Março de 2025",
        local: "Local a ser revelado",
        imagem: "https://placehold.co/326x406/cccccc/ffffff?text=Evento+7"
    },
    {
        id: 8,
        titulo: "Sunset Hot",
        descricao: "Uma festa na cobertura para apreciar o pôr do sol e aquecer a noite com a melhor companhia.",
        data: "05 de Abril de 2025",
        local: "Cobertura Secreta",
        imagem: "https://placehold.co/326x406/dddddd/ffffff?text=Evento+8"
    }
];

// --- Menu Mobile ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMobileMenuButton = document.getElementById('close-mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

function openMobileMenu() {
    mobileMenuOverlay.classList.add('open');
}

function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('open');
}

mobileMenuButton.addEventListener('click', openMobileMenu);
closeMobileMenuButton.addEventListener('click', closeMobileMenu);

// Fechar menu ao clicar em um link
const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});


// --- Slider de Eventos ---
const slideshowContainer = document.getElementById('slideshow-container');
const prevButton = document.getElementById('prev-slide-button');
const nextButton = document.getElementById('next-slide-button');
const dotsContainer = document.getElementById('slide-dots-container');
const cards = slideshowContainer.querySelectorAll('.flex-shrink-0');

let currentIndex = 0;
let slidesPerView = window.innerWidth >= 768 ? 3 : 1;
const totalSlides = cards.length;
const totalPages = Math.ceil(totalSlides / slidesPerView);
let currentSlidePage = 0;

function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dotsContainer.appendChild(dot);
        dot.addEventListener('click', () => {
            currentSlidePage = i;
            updateSlider();
        });
    }
}

function updateSlider() {
    const offset = -currentSlidePage * 100;
    slideshowContainer.style.transform = `translateX(${offset}%)`;

    // Atualiza os dots
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach((dot, index) => {
        if (index === currentSlidePage) {
            dot.classList.add('bg-yellow-400');
        } else {
            dot.classList.remove('bg-yellow-400');
        }
    });

    // Desativa/ativa botões de navegação
    prevButton.disabled = currentSlidePage === 0;
    nextButton.disabled = currentSlidePage === totalPages - 1;
}

prevButton.addEventListener('click', () => {
    if (currentSlidePage > 0) {
        currentSlidePage--;
        updateSlider();
    }
});

nextButton.addEventListener('click', () => {
    if (currentSlidePage < totalPages - 1) {
        currentSlidePage++;
        updateSlider();
    }
});

window.addEventListener('resize', () => {
    const newSlidesPerView = window.innerWidth >= 768 ? 3 : 1;
    if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;
        const newTotalPages = Math.ceil(totalSlides / slidesPerView);
        if (currentSlidePage >= newTotalPages) {
            currentSlidePage = newTotalPages - 1;
        }
        createDots();
        updateSlider();
    }
});

// Inicialização
createDots();
updateSlider();


// --- Modais de Eventos ---
const eventoModal = document.getElementById('evento-modal');
const closeEventoModal = document.getElementById('close-evento-modal');
const saibaMaisButtons = document.querySelectorAll('.saiba-mais');

saibaMaisButtons.forEach(button => {
    button.addEventListener('click', () => {
        const eventId = button.previousElementSibling.dataset.eventId;
        const evento = eventos.find(e => e.id == eventId);

        if (evento) {
            document.getElementById('modal-titulo-evento').textContent = evento.titulo;
            document.getElementById('modal-descricao-evento').textContent = evento.descricao;
            document.getElementById('modal-data-evento').textContent = `Data: ${evento.data}`;
            document.getElementById('modal-local-evento').textContent = `Local: ${evento.local}`;
            document.getElementById('modal-imagem-evento').src = evento.imagem;
            eventoModal.classList.remove('hidden');
        }
    });
});

closeEventoModal.addEventListener('click', () => {
    eventoModal.classList.add('hidden');
});

// Fechar modal ao clicar fora
eventoModal.addEventListener('click', (e) => {
    if (e.target === eventoModal) {
        eventoModal.classList.add('hidden');
    }
});


// --- Modal de Contato ---
const contatoModal = document.getElementById('contato-modal');
const closeContatoModal = document.getElementById('close-contato-modal');
const faleConoscoButton = document.getElementById('fale-conosco-button');

faleConoscoButton.addEventListener('click', () => {
    contatoModal.classList.remove('hidden');
});

closeContatoModal.addEventListener('click', () => {
    contatoModal.classList.add('hidden');
});

contatoModal.addEventListener('click', (e) => {
    if (e.target === contatoModal) {
        contatoModal.classList.add('hidden');
    }
});

async function buscarImagensDrive() {
    const folderId = '1kfzpHonZIOM5Dt7qt_0HQ7_oFrNbo8Wa';
    const key = 'AIzaSyDhriirBqdbCFomhDG-8KVWoelVPv5_xPs';

    try {
        const res = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${key}&fields=files(id,name,mimeType,webContentLink)`
        );
        
        if (!res.ok) {
            throw new Error('Erro ao buscar arquivos do Drive');
        }

        const data = await res.json();
        
        if (data.files && data.files.length > 0) {
            // Processa cada arquivo encontrado
            data.files.forEach(file => {
                if (file.mimeType.startsWith('image/')) {
                    const imageUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
                    console.log('Imagem encontrada:', file.name, imageUrl);
                    // Aqui você pode usar a imageUrl para exibir a imagem
                }
            });
        }
    } catch (error) {
        console.error('Erro ao buscar imagens:', error);
    }
}

// Chama a função quando necessário
buscarImagensDrive();