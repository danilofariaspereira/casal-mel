// Busca os dados dos eventos de uma planilha Google Sheets
let eventos = [];

async function buscarEventosPlanilha() {
  // Substitua pelos seus dados:
  const sheetId = "1IWXCq4sMT9e83tv_rHkwjNLwKmCfb-tmO-VWUSsfcxw"; // Exemplo: '1aBcD...'
  const sheetName = "Eventos"; // Ou o nome da sua aba
  const key = "AIzaSyD0W_Pco6cq3w9mmoGkx_poOrzVWpe09pw";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${key}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao buscar planilha");
    const data = await res.json();
    const linhas = data.values;
    if (!linhas || linhas.length < 2) return;
    // Assume que a primeira linha é o cabeçalho
    eventos = linhas.slice(1).map((linha, idx) => ({
      id: idx + 1,
      titulo: linha[0] || "",
      descricao: linha[1] || "",
      data: linha[2] || "",
      local: linha[3] || "",
      imagem: linha[4] || "",
    }));
    // Aqui você pode chamar funções que dependem de eventos já carregados
    console.log("Eventos carregados da planilha:", eventos);
  } catch (e) {
    console.error("Erro ao buscar eventos da planilha:", e);
  }
}

// Chame esta função ao iniciar
buscarEventosPlanilha();

// --- Menu Mobile ---
const mobileMenuButton = document.getElementById("mobile-menu-button");
const closeMobileMenuButton = document.getElementById("close-mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

function openMobileMenu() {
  mobileMenuOverlay.classList.add("open");
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove("open");
}

mobileMenuButton.addEventListener("click", openMobileMenu);
closeMobileMenuButton.addEventListener("click", closeMobileMenu);

// Fechar menu ao clicar em um link
const mobileMenuLinks = mobileMenuOverlay.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// --- Slider de Eventos dinâmico ---
function renderizarCardsEventos() {
  const slideshowContainer = document.getElementById("slideshow-container");
  slideshowContainer.innerHTML = "";
  eventos.forEach((evento) => {
    const card = document.createElement("div");
    card.className = "flex-shrink-0";
    // Ajusta o link da imagem do Google Drive, se necessário
    let imgSrc = evento.imagem;
    // Suporte para links do tipo /file/d/ID/view ou compartilhamento direto
    let driveId = null;
    // /file/d/ID/
    let match = imgSrc.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (match) driveId = match[1];
    // ?id=ID
    if (!driveId) {
      match = imgSrc.match(/[?&]id=([\w-]+)/);
      if (match) driveId = match[1];
    }
    if (driveId) {
      imgSrc = `https://drive.google.com/thumbnail?id=${driveId}`;
    }
    // Renderização manual dos elementos para evitar problemas de parsing
    const cardDiv = document.createElement('div');
    cardDiv.className = 'slideshow-card';
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = evento.titulo;
      img.className = 'event-image';
      cardDiv.appendChild(img);
    }
    const p = document.createElement('p');
    p.className = 'text-sm font-semibold mb-2';
    p.setAttribute('data-event-id', evento.id);
    p.innerHTML = `${evento.titulo}<br>`;
    cardDiv.appendChild(p);
    const btn = document.createElement('button');
    btn.className = 'saiba-mais bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-5 rounded-full shadow-md transition duration-300 w-full md:w-auto';
    btn.textContent = 'Saiba Mais';
    cardDiv.appendChild(btn);
    card.appendChild(cardDiv);
    slideshowContainer.appendChild(card);
  });
}

function inicializarSlider() {
  const slideshowContainer = document.getElementById("slideshow-container");
  const prevButton = document.getElementById("prev-slide-button");
  const nextButton = document.getElementById("next-slide-button");
  const dotsContainer = document.getElementById("slide-dots-container");
  let slidesPerView = window.innerWidth >= 768 ? 3 : 1;
  let totalSlides = eventos.length;
  let totalPages = Math.ceil(totalSlides / slidesPerView);
  let currentSlidePage = 0;

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dotsContainer.appendChild(dot);
      dot.addEventListener("click", () => {
        currentSlidePage = i;
        updateSlider();
      });
    }
  }

  function updateSlider() {
    const offset = -currentSlidePage * 100;
    slideshowContainer.style.transform = `translateX(${offset}%)`;
    const dots = dotsContainer.querySelectorAll("span");
    dots.forEach((dot, index) => {
      if (index === currentSlidePage) {
        dot.classList.add("bg-yellow-400");
      } else {
        dot.classList.remove("bg-yellow-400");
      }
    });
    prevButton.disabled = currentSlidePage === 0;
    nextButton.disabled = currentSlidePage === totalPages - 1;
  }

  prevButton.onclick = () => {
    if (currentSlidePage > 0) {
      currentSlidePage--;
      updateSlider();
    }
  };
  nextButton.onclick = () => {
    if (currentSlidePage < totalPages - 1) {
      currentSlidePage++;
      updateSlider();
    }
  };

  window.addEventListener("resize", () => {
    const newSlidesPerView = window.innerWidth >= 768 ? 3 : 1;
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      totalPages = Math.ceil(totalSlides / slidesPerView);
      if (currentSlidePage >= totalPages) {
        currentSlidePage = totalPages - 1;
      }
      createDots();
      updateSlider();
    }
  });

  createDots();
  updateSlider();
}

// Após buscar os eventos, renderize e inicialize o slider
async function buscarEventosPlanilhaEDepois() {
  await buscarEventosPlanilha();
  renderizarCardsEventos();
  inicializarSlider();
  inicializarModais();
}

buscarEventosPlanilhaEDepois();

// --- Modais de Eventos ---
function inicializarModais() {
  const eventoModal = document.getElementById("evento-modal");
  const closeEventoModal = document.getElementById("close-evento-modal");
  // Seleciona novamente pois os botões são renderizados dinamicamente
  const saibaMaisButtons = document.querySelectorAll(".saiba-mais");

  saibaMaisButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Busca o card mais próximo e pega o data-event-id
      let eventId;
      const p = button.parentElement.querySelector("p[data-event-id]");
      if (p) {
        eventId = p.dataset.eventId;
      }
      const evento = eventos.find((e) => e.id == eventId);
      if (evento) {
        // Ajusta o link da imagem do Google Drive, se necessário (igual aos cards)
        let imgSrc = evento.imagem;
        let driveId = null;
        let match = imgSrc.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
        if (match) driveId = match[1];
        if (!driveId) {
          match = imgSrc.match(/[?&]id=([\w-]+)/);
          if (match) driveId = match[1];
        }
        if (driveId) {
          imgSrc = `https://drive.google.com/thumbnail?id=${driveId}`;
        }
        document.getElementById("modal-titulo-evento").textContent = evento.titulo;
        document.getElementById("modal-descricao-evento").textContent = evento.descricao;
        document.getElementById("modal-data-evento").textContent = `Data: ${evento.data}`;
        document.getElementById("modal-local-evento").textContent = `Local: ${evento.local}`;
        const imgEl = document.getElementById("modal-imagem-evento");
        imgEl.src = imgSrc;
        imgEl.alt = evento.titulo;
        imgEl.className = 'event-image rounded-lg shadow-xl';
        // Centraliza o modal na tela e define altura máxima
        eventoModal.style.display = 'flex';
        eventoModal.style.alignItems = 'center';
        eventoModal.style.justifyContent = 'center';
        eventoModal.style.top = '0';
        eventoModal.style.left = '0';
        eventoModal.style.width = '100vw';
        eventoModal.style.height = '100vh';
        eventoModal.style.maxHeight = 'none';
        // O conteúdo do modal (primeiro filho) recebe o maxHeight
        const modalContent = eventoModal.querySelector('div');
        if (modalContent) {
          modalContent.style.maxHeight = '80vh';
          modalContent.style.overflowY = 'auto';
          modalContent.style.scrollbarWidth = 'none'; // Firefox
          modalContent.style.msOverflowStyle = 'none'; // IE/Edge
          modalContent.style.overscrollBehavior = 'contain';
          // Para Chrome, Safari e outros navegadores baseados em Webkit
          modalContent.style.setProperty('scrollbar-width', 'none');
          modalContent.style.setProperty('-ms-overflow-style', 'none');
          // Esconde a barra de rolagem no Webkit
          modalContent.style.setProperty('overflow', 'auto');
          modalContent.classList.add('hide-scrollbar');
        }
        eventoModal.classList.remove("hidden");
      }
    });
  });

  closeEventoModal.addEventListener("click", function (e) {
    // Garante que o modal será fechado ao clicar no X
    eventoModal.classList.add("hidden");
    // Remove o display flex para evitar conflitos de exibição futura
    eventoModal.style.display = '';
  });
  eventoModal.addEventListener("click", (e) => {
    if (e.target === eventoModal) {
      eventoModal.classList.add("hidden");
    }
  });
}

// --- Modal de Contato ---
const contatoModal = document.getElementById("contato-modal");
const closeContatoModal = document.getElementById("close-contato-modal");
const faleConoscoButton = document.getElementById("fale-conosco-button");

faleConoscoButton.addEventListener("click", () => {
  contatoModal.classList.remove("hidden");
});

closeContatoModal.addEventListener("click", () => {
  contatoModal.classList.add("hidden");
});

contatoModal.addEventListener("click", (e) => {
  if (e.target === contatoModal) {
    contatoModal.classList.add("hidden");
  }
});
