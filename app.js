// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: 1,
    title: "Fotografia Leone – Ritaglio e Composizione (PH)",
    category: "computer-graphic",
    description: "Ritaglio fotografico avanzato con inserimento di sfondo, luci e ombre per un effetto realistico.",
    image: "assets/Computer graphic/Fotoritocco Leone.jpg",
  },
  {
    id: 2,
    title: "Astronauta – Editing Tonale e Sfondo (PH)",
    category: "computer-graphic",
    description: "Rielaborazione fotografica con ritaglio preciso e modifica delle tonalità cromatiche di soggetto e sfondo.",
    image: "assets/Computer graphic/Fotoritocco astronauta.jpg",
  },
  {
    id: 3,
    title: "Spider-Man – Composizione Creativa",
    category: "computer-graphic",
    description: "Montaggio grafico con il celebre personaggio dei fumetti, ambientato in uno sfondo coerente e stilizzato.",
    image: "assets/Computer graphic/spiderman colore 1.jpg",
  },
  {
    id: 4,
    title: "Busto Uomo – Poster Moderno",
    category: "computer-graphic",
    description: "Poster digitale con colori vivaci e contrastanti, ispirato a uno stile contemporaneo.",
    image: "assets/Computer graphic/fotoritocco busto uomo 1.png",
  },
  {
    id: 5,
    title: "Logo Gruppo Musicale – Volto e Nota",
    category: "loghi",
    description: "Logo concettuale per band musicale, con fusione creativa tra volto umano e nota musicale.",
    image: "assets/Loghi/logo 7dayswalk2.jpg",
  },
  {
    id: 6,
    title: "Logo Personale – Vettorializzazione Creativa",
    category: "loghi",
    description: "Logo realizzato a partire da una fotografia, vettorializzato con lo strumento CreaForme di Illustrator.",
    image: "assets/Loghi/logo illustrazione.png",
  },
  {
    id: 7,
    title: "Logo Minimalista – Spazio 3D",
    category: "loghi",
    description: "Design essenziale con pochi elementi, che creano un ambiente tridimensionale per un logo pulito e moderno.",
    image: "assets/Loghi/logo musebq.png",
  },
  {
    id: 8,
    title: "Colori – Editing RAW (PH)",
    category: "fotografie",
    description: "Modifica dei valori cromatici di un file RAW digitale, con interventi mirati su tonalità e saturazione.",
    image: "assets/Fotografie/giallo - blu.jpg",
  },
  {
    id: 9,
    title: "Bianco e Nero – Composizione Artistica",
    category: "fotografie",
    description: "Fotografia in bianco e nero con interventi artistici sui valori tonali e sulla composizione visiva.",
    image: "assets/Fotografie/IMG_9775.jpg",
  },
  {
    id: 10,
    title: "Icona Pianeta – Design Orbitale",
    category: "icone",
    description: "Icona stilizzata di un pianeta con asteroidi orbitanti, disposti lungo un'ellisse.",
    image: "assets/Icone/planet.jpg",
  },
  {
    id: 11,
    title: "Icona Diavolo – Simbolo Personalizzato",
    category: "icone",
    description: "Proposta grafica per un'icona simbolica, con elementi personalizzati e stile distintivo.",
    image: "assets/Icone/devil.jpg",
  },
  {
    id: 12,
    title: "Icona Catalogo – Pack Web Design",
    category: "icone",
    description: "Icona progettata per integrarsi con un pack grafico dedicato al Web Design, in stile coerente e versatile.",
    image: "assets/Icone/Colore bianco/icona catalogo var.png",
  },
  {
    id: 13,
    title: "Poster – Font New Times Roman",
    category: "poster tipografico",
    description: "Poster tipografico che valorizza l'elegance classica del New Times Roman, ideale per progetti editoriali e comunicazioni istituzionali.",
    image: "assets/Stampe + Font/Poster PDF Carattere New Times Roman.png",
  },
  {
    id: 14,
    title: "Poster – Font Helvetica Regular",
    category: "poster tipografico",
    description: "Composizione pulita e bilanciata che esalta la neutralità e la leggibilità del carattere Helvetica Regular, perfetta per layout moderni.",
    image: "assets/Stampe + Font/Poster PDF Carattere Helvetica Regular.png",
  },
  {
    id: 15,
    title: "Poster – Font Helvetica Oblique",
    category: "poster tipografico",
    description: "Design dinamico che sfrutta l'inclinazione dell'Helvetica Oblique per trasmettere movimento e contemporaneità visiva.",
    image: "assets/Stampe + Font/Poster PDF Carattere Helvetica Oblique.png",
  },
  {
    id: 16,
    title: "Poster – Font Helvetica Bold",
    category: "poster tipografico",
    description: "Poster d'impatto che mette in risalto la forza visiva dell'Helvetica Bold, ideale per titoli e comunicazioni assertive.",
    image: "assets/Stampe + Font/Poster PDF Carattere Helvetica Bold.png",
  },
  {
    id: 17,
    title: "Poster – Font Futura",
    category: "poster tipografico",
    description: "Composizione geometrica e minimalista che celebra la modernità del carattere Futura, perfetta per progetti dal gusto contemporaneo.",
    image: "assets/Stampe + Font/Poster PDF Carattere Futura .png",
  },
  {
    id: 18,
    title: "Poster – Font Baskerville",
    category: "poster tipografico",
    description: "Poster raffinato che valorizza l'equilibrio tra tradizione e leggibilità del carattere Baskerville, con un tocco editoriale.",
    image: "assets/Stampe + Font/Poster PDF Carattere Baskerville.png",
  },
  {
    id: 19,
    title: "Poster – Font Baskerville (ver. 1)",
    category: "poster tipografico",
    description: "Versione alternativa che esplora le potenzialità espressive del Baskerville, con una composizione visiva più sperimentale.",
    image: "assets/Stampe + Font/Poster PDF Carattere Baskerville v1.png",
  },
];

// Cache ottimizzata degli elementi DOM
const DOM = {
  container: document.getElementById("masonry-container"),
  categoryButtons: document.querySelectorAll(".category-btn"),
  categoryInfo: document.getElementById("category-info"),
  loadingIndicator: document.getElementById("loadingIndicator"),
  // Modal del logo
  logoModal: document.getElementById("logoModal"),
  logoModalImg: document.getElementById("logoModalImg"),
  logoCloseBtn: document.querySelector(".close"),
  logo: document.getElementById("logoClickable"),
  // Modal del portfolio
  portfolioModal: document.getElementById("portfolioModal"),
  portfolioModalImg: document.getElementById("portfolioModalImg"),
  portfolioCloseBtn: document.querySelector(".portfolio-close"),
  portfolioModalTitle: document.getElementById("portfolioModalTitle"),
  portfolioModalCategory: document.querySelector(".modal-category"),
  portfolioModalDescription: document.querySelector(".modal-description")
};

// Stato dell'applicazione ottimizzato
const state = {
  currentCategory: "all",
  isAnimating: false,
  masonryItems: [],
  currentPortfolioItem: null,
  visibleItems: []
};

// Intersection Observer per lazy loading
let imageObserver;

// Funzione per generare gli elementi Masonry con immagini clickable
function generateMasonryItems(itemsToShow = items) {
  DOM.container.innerHTML = '';
  state.masonryItems = [];
  state.visibleItems = itemsToShow;
  
  DOM.loadingIndicator.style.display = 'flex';
  
  requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment();
    
    itemsToShow.forEach((item, index) => {
      const masonryItem = createMasonryElement(item, index);
      fragment.appendChild(masonryItem);
      state.masonryItems.push(masonryItem);
    });
    
    DOM.container.appendChild(fragment);
    DOM.loadingIndicator.style.display = 'none';
    
    initMasonryAnimations();
    initImageClickHandlers();
    initLazyLoading();
  });
}

// Funzione helper per creare elementi masonry
function createMasonryElement(item, index) {
  const masonryItem = document.createElement('div');
  masonryItem.className = 'masonry-item';
  masonryItem.setAttribute('data-category', item.category);
  masonryItem.setAttribute('data-id', item.id);
  masonryItem.setAttribute('role', 'article');
  masonryItem.setAttribute('aria-label', item.title);

  masonryItem.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="masonry-img" loading="lazy" width="400" height="300" tabindex="0">
    <div class="masonry-content">
      <span class="masonry-category">${item.category}</span>
      <h3 class="masonry-title">${item.title}</h3>
      <p class="masonry-description">${item.description}</p>
    </div>
  `;

  setTimeout(() => {
    masonryItem.classList.add('visible');
  }, 100 + (index * 30));

  return masonryItem;
}

// Inizializza i click handler per le immagini
function initImageClickHandlers() {
  const masonryImages = document.querySelectorAll('.masonry-img');
  
  masonryImages.forEach((img, index) => {
    const masonryItem = img.closest('.masonry-item');
    const itemId = masonryItem.getAttribute('data-id');
    const item = items.find(i => i.id == itemId);
    
    if (item) {
      // Click con mouse
      img.addEventListener('click', () => {
        openPortfolioModal(item);
      });
      
      // Enter key per accessibilità
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPortfolioModal(item);
        }
      });
      
      // Aggiungi indicatore visivo per focus
      img.addEventListener('focus', () => {
        img.style.outline = `2px solid var(--primary)`;
        img.style.outlineOffset = '2px';
      });
      
      img.addEventListener('blur', () => {
        img.style.outline = 'none';
      });
    }
  });
}

// Funzione per aprire la modal del portfolio
function openPortfolioModal(item) {
  if (!item || !DOM.portfolioModal) return;
  
  state.currentPortfolioItem = item;
  
  // Imposta il contenuto della modal
  DOM.portfolioModalImg.src = item.image;
  DOM.portfolioModalImg.alt = item.title;
  DOM.portfolioModalTitle.textContent = item.title;
  DOM.portfolioModalCategory.textContent = getCategoryDisplayName(item.category);
  DOM.portfolioModalDescription.textContent = item.description;
  
  // Mostra la modal
  DOM.portfolioModal.style.display = 'flex';
  DOM.portfolioModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Focus sul pulsante di chiusura per accessibilità
  DOM.portfolioCloseBtn.focus();
  
  // Animazione di entrata
  gsap.fromTo(DOM.portfolioModal.querySelector('.modal-container'), 
    { opacity: 0, y: 50, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
  );
}

// Funzione per chiudere la modal del portfolio
function closePortfolioModal() {
  DOM.portfolioModal.style.display = 'none';
  DOM.portfolioModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
  state.currentPortfolioItem = null;
}

// Navigazione tra immagini nella modal
function navigatePortfolioModal(direction) {
  if (!state.currentPortfolioItem) return;
  
  const currentIndex = state.visibleItems.findIndex(item => item.id === state.currentPortfolioItem.id);
  let newIndex = currentIndex + direction;
  
  // Gestione loop
  if (newIndex < 0) {
    newIndex = state.visibleItems.length - 1;
  } else if (newIndex >= state.visibleItems.length) {
    newIndex = 0;
  }
  
  const newItem = state.visibleItems[newIndex];
  if (newItem) {
    openPortfolioModal(newItem);
  }
}

// Gestione della modal del logo
function initLogoModal() {
  if (!DOM.logo || !DOM.logoModal) return;

  DOM.logo.addEventListener('click', openLogoModal);
  DOM.logo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLogoModal();
    }
  });

  DOM.logoCloseBtn.addEventListener('click', closeLogoModal);
  DOM.logoCloseBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeLogoModal();
    }
  });

  DOM.logoModal.addEventListener('click', (e) => {
    if (e.target === DOM.logoModal) {
      closeLogoModal();
    }
  });
}

function openLogoModal() {
  DOM.logoModal.style.display = 'block';
  DOM.logoModalImg.src = DOM.logo.src;
  DOM.logoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  DOM.logoCloseBtn.focus();
}

function closeLogoModal() {
  DOM.logoModal.style.display = 'none';
  DOM.logoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

// Inizializza la modal del portfolio
function initPortfolioModal() {
  if (!DOM.portfolioModal) return;

  DOM.portfolioCloseBtn.addEventListener('click', closePortfolioModal);
  DOM.portfolioCloseBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closePortfolioModal();
    }
  });

  DOM.portfolioModal.addEventListener('click', (e) => {
    if (e.target === DOM.portfolioModal) {
      closePortfolioModal();
    }
  });
}

// Gestione tasti da tastiera per entrambe le modal
function initKeyboardHandlers() {
  document.addEventListener('keydown', (e) => {
    // ESC per chiudere le modal
    if (e.key === 'Escape') {
      if (DOM.portfolioModal.style.display === 'flex') {
        closePortfolioModal();
      } else if (DOM.logoModal.style.display === 'block') {
        closeLogoModal();
      }
    }
    
    // Freccia sinistra/destra per navigazione tra immagini (solo nella modal portfolio)
    if (DOM.portfolioModal.style.display === 'flex' && state.currentPortfolioItem) {
      if (e.key === 'ArrowLeft') {
        navigatePortfolioModal(-1); // Precedente
      } else if (e.key === 'ArrowRight') {
        navigatePortfolioModal(1); // Successiva
      }
    }
  });
}

// Funzione per filtrare per categoria
function filterByCategory(category) {
  if (state.isAnimating || state.currentCategory === category) return;
  
  state.isAnimating = true;
  state.currentCategory = category;
  
  // Aggiorna attributi ARIA per accessibilità
  DOM.categoryButtons.forEach(btn => {
    const isActive = btn.getAttribute('data-category') === category;
    btn.setAttribute('aria-pressed', isActive);
    btn.classList.toggle('active', isActive);
  });

  // Filtra gli elementi visibili
  state.visibleItems = category === 'all' 
    ? items 
    : items.filter(item => item.category === category);

  const allItems = state.masonryItems;
  const visibleItems = category === 'all' 
    ? allItems 
    : allItems.filter(item => item.getAttribute('data-category') === category);

  // Animazione di transizione
  gsap.to(allItems, {
    opacity: 0,
    y: 20,
    duration: 0.2,
    stagger: 0.01,
    onComplete: () => {
      allItems.forEach(item => {
        item.classList.toggle('hidden', !visibleItems.includes(item));
      });
      
      gsap.fromTo(visibleItems, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.02,
          onComplete: () => {
            state.isAnimating = false;
            // Re-inizializza i click handlers per le nuove immagini visibili
            initImageClickHandlers();
            // Annuncia il cambiamento per screen readers
            announceFilterChange(category);
          }
        }
      );
    }
  });
}

// Funzione per annunciare cambiamenti filtro (accessibilità)
function announceFilterChange(category) {
  const announcement = document.getElementById('filter-announcement') || createAnnouncementElement();
  const categoryName = getCategoryDisplayName(category);
  announcement.textContent = `Mostrando ${categoryName}. ${getVisibleItemsCount()} progetti visualizzati.`;
}

function createAnnouncementElement() {
  const announcement = document.createElement('div');
  announcement.id = 'filter-announcement';
  announcement.className = 'sr-only';
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  document.body.appendChild(announcement);
  return announcement;
}

function getCategoryDisplayName(category) {
  const names = {
    'all': 'tutti i progetti',
    'computer-graphic': 'Computer Graphic',
    'loghi': 'Logo Design',
    'fotografie': 'Fotografia',
    'icone': 'Graphic Design',
    'poster tipografico': 'Tipografia'
  };
  return names[category] || category;
}

function getVisibleItemsCount() {
  return document.querySelectorAll('.masonry-item:not(.hidden)').length;
}

// Inizializza le animazioni GSAP
function initMasonryAnimations() {
  const masonryItems = state.masonryItems;
  
  // Animazione al passaggio del mouse
  masonryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (!state.isAnimating) {
        gsap.to(item, { 
          y: -5, 
          duration: 0.2, 
          ease: "power2.out" 
        });
      }
    });
    
    item.addEventListener('mouseleave', () => {
      if (!state.isAnimating) {
        gsap.to(item, { 
          y: 0, 
          duration: 0.2, 
          ease: "power2.out" 
        });
      }
    });
  });
  
  // Animazione allo scroll con ScrollTrigger (solo su desktop)
  if (window.innerWidth > 768) {
    gsap.utils.toArray('.masonry-item').forEach(item => {
      gsap.fromTo(item, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      );
    });
  }
}

// Lazy loading ottimizzato
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Se l'immagine ha un data-src, caricala
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    // Osserva tutte le immagini con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Precaricamento delle immagini critiche
function preloadCriticalImages() {
  const criticalImages = [
    '/images/logo-p-4.png',
    items[0].image,
    items[1].image
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Gestione del ridimensionamento della finestra
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Ricrea gli ScrollTrigger
    ScrollTrigger.refresh();
  }, 150);
}

// Inizializzazione principale
function init() {
  // Genera gli elementi Masonry
  generateMasonryItems();

  // Aggiungi event listener ai pulsanti di categoria
  DOM.categoryButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      filterByCategory(category);
    });

    button.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const category = button.getAttribute('data-category');
        filterByCategory(category);
      }
    });
  });

  // Inizializza le modal
  initLogoModal();
  initPortfolioModal();
  initKeyboardHandlers();

  // Animazione iniziale per il contenuto
  gsap.fromTo(DOM.categoryInfo, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
  );

  // Animazione per il logo e titolo
  gsap.fromTo('.animate-logo', 
    { opacity: 0, scale: 0.8, rotation: -10 },
    { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.1 }
  );

  gsap.fromTo('.animate-title', 
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
  );
}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', preloadCriticalImages);
window.addEventListener('resize', handleResize);

// Service Worker per caching (opzionale - da implementare se necessario)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Gestione errori per immagini
document.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG') {
    console.warn('Immagine non caricata:', e.target.src);
    e.target.style.display = 'none';
    // Mostra un placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = '<i class="fas fa-image"></i><p>Immagine non disponibile</p>';
    placeholder.style.cssText = `
      width: 100%;
      height: 200px;
      background: #f0f0f0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;
    `;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }
}, true);

// Pulsanti di navigazione per la modal (opzionali - da aggiungere nell'HTML se desiderati)
function createNavigationButtons() {
  const navContainer = document.createElement('div');
  navContainer.className = 'modal-navigation';
  navContainer.innerHTML = `
    <button class="nav-btn prev-btn" aria-label="Immagine precedente">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button class="nav-btn next-btn" aria-label="Immagine successiva">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  
  const modalContainer = DOM.portfolioModal.querySelector('.modal-container');
  modalContainer.appendChild(navContainer);
  
  // Aggiungi event listeners
  const prevBtn = navContainer.querySelector('.prev-btn');
  const nextBtn = navContainer.querySelector('.next-btn');
  
  prevBtn.addEventListener('click', () => navigatePortfolioModal(-1));
  nextBtn.addEventListener('click', () => navigatePortfolioModal(1));
}

// Utility per il debug
function debugState() {
  console.log('Current State:', {
    currentCategory: state.currentCategory,
    isAnimating: state.isAnimating,
    masonryItemsCount: state.masonryItems.length,
    visibleItemsCount: state.visibleItems.length,
    currentPortfolioItem: state.currentPortfolioItem
  });
}

// Esporta funzioni per debug (solo in sviluppo)
if (process.env.NODE_ENV === 'development') {
  window.appDebug = {
    state,
    items,
    debugState,
    filterByCategory,
    openPortfolioModal
  };
}