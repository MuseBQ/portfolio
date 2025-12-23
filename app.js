// Configurazione
const CONFIG = {
  IMAGE_LOAD_DELAY: 100,
  ANIMATION_STAGGER: 20,
  LAZY_LOAD_THRESHOLD: 0.01,
  RESIZE_DEBOUNCE: 150,
  PRELOAD_IMAGES: 3
};

// GSAP plugins
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

if (gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

// Cache DOM
const DOM = (() => {
  const elements = {
    container: document.getElementById("masonry-container"),
    categoryButtons: document.querySelectorAll(".category-btn"),
    categoryInfo: document.getElementById("category-info"),
    loadingIndicator: document.getElementById("loadingIndicator"),
    logoModal: document.getElementById("logoModal"),
    logoModalImg: document.getElementById("logoModalImg"),
    logoCloseBtn: document.querySelector("#logoModal .close"),
    logo: document.getElementById("logoClickable"),
    portfolioModal: document.getElementById("portfolioModal"),
    portfolioModalImg: document.getElementById("portfolioModalImg"),
    portfolioCloseBtn: document.querySelector(".portfolio-close"),
    portfolioModalTitle: document.getElementById("portfolioModalTitle"),
    portfolioModalCategory: document.querySelector(".modal-category"),
    portfolioModalDescription: document.querySelector(".modal-description"),
    currentYear: document.getElementById("current-year"),
    modalPrevBtn: document.querySelector(".prev-btn"),
    modalNextBtn: document.querySelector(".next-btn"),
    currentImageIndex: document.getElementById("currentImageIndex"),
    totalImages: document.getElementById("totalImages")
  };
  
  return {
    get: (key) => elements[key],
    getAll: () => elements
  };
})();

// State management
const state = (() => {
  let currentCategory = "all";
  let isAnimating = false;
  let masonryItems = [];
  let currentPortfolioItem = null;
  let visibleItems = [];
  let imageObserver = null;
  let resizeTimeout = null;

  return {
    getCurrentCategory: () => currentCategory,
    setCurrentCategory: (category) => { currentCategory = category; },
    getIsAnimating: () => isAnimating,
    setIsAnimating: (animating) => { isAnimating = animating; },
    getMasonryItems: () => masonryItems,
    setMasonryItems: (items) => { masonryItems = items; },
    getCurrentPortfolioItem: () => currentPortfolioItem,
    setCurrentPortfolioItem: (item) => { currentPortfolioItem = item; },
    getVisibleItems: () => visibleItems,
    setVisibleItems: (items) => { visibleItems = items; },
    getImageObserver: () => imageObserver,
    setImageObserver: (observer) => { imageObserver = observer; },
    getResizeTimeout: () => resizeTimeout,
    setResizeTimeout: (timeout) => { resizeTimeout = timeout; }
  };
})();

// Utility functions
const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  getCategoryDisplayName: (category) => {
    const names = {
      all: "tutti i progetti",
      "computer-graphic": "Computer Graphic",
      loghi: "Logo Design",
      fotografie: "Fotografia",
      icone: "Graphic Design",
      "poster tipografico": "Tipografia"
    };
    return names[category] || category;
  },

  preloadImage: (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  createImagePlaceholder: () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
      <i class="fas fa-image"></i>
      <p>Caricamento immagine...</p>
    `;
    return placeholder;
  }
};

// Image Manager
const imageManager = (() => {
  const loadedImages = new Set();
  
  return {
    loadImage: async (imgElement) => {
      const src = imgElement.dataset.src;
      
      if (!src || loadedImages.has(src)) return;
      
      try {
        loadedImages.add(src);
        await utils.preloadImage(src);
        imgElement.src = src;
        imgElement.classList.add('loaded');
        
        // Smooth transition
        requestAnimationFrame(() => {
          imgElement.style.opacity = '0';
          requestAnimationFrame(() => {
            imgElement.style.transition = 'opacity 0.3s ease';
            imgElement.style.opacity = '1';
          });
        });
      } catch (error) {
        console.warn('Failed to load image:', src);
        this.handleImageError(imgElement);
      }
    },
    
    handleImageError: (imgElement) => {
      const placeholder = utils.createImagePlaceholder();
      imgElement.style.display = 'none';
      imgElement.parentNode.insertBefore(placeholder, imgElement);
    },
    
    preloadCriticalImages: () => {
      const criticalImages = [
        '/images/logo-p-4.png',
        items[0]?.image,
        items[1]?.image
      ].filter(Boolean);
      
      criticalImages.forEach(src => {
        if (!loadedImages.has(src)) {
          utils.preloadImage(src).catch(() => {
            console.warn('Failed to preload critical image:', src);
          });
        }
      });
    }
  };
})();

// Masonry Generator
const masonryGenerator = {
  createItemElement: (item, index) => {
    const element = document.createElement('article');
    element.className = 'masonry-item';
    element.setAttribute('data-category', item.category);
    element.setAttribute('data-id', item.id);
    element.setAttribute('role', 'article');
    element.setAttribute('aria-label', item.title);
    
    element.innerHTML = `
      <div class="image-wrapper">
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3C/svg%3E"
          data-src="${item.image}"
          alt="${item.title}"
          class="masonry-img lazy"
          width="400"
          height="300"
          loading="lazy"
          decoding="async"
          tabindex="0"
        >
      </div>
      <div class="masonry-content">
        <span class="masonry-category" aria-label="Categoria: ${item.category}">
          ${utils.getCategoryDisplayName(item.category)}
        </span>
        <h3 class="masonry-title">${item.title}</h3>
        <p class="masonry-description">${item.description}</p>
      </div>
    `;
    
    // Staggered animation
    setTimeout(() => {
      element.classList.add('visible');
    }, CONFIG.IMAGE_LOAD_DELAY + (index * CONFIG.ANIMATION_STAGGER));
    
    return element;
  },
  
  generate: (itemsToShow = items) => {
    const container = DOM.get('container');
    if (!container) return;
    
    container.innerHTML = '';
    state.setMasonryItems([]);
    state.setVisibleItems(itemsToShow);
    
    const fragment = document.createDocumentFragment();
    
    itemsToShow.forEach((item, index) => {
      const element = this.createItemElement(item, index);
      fragment.appendChild(element);
      state.getMasonryItems().push(element);
    });
    
    container.appendChild(fragment);
    
    // Initialize interactions
    this.initImageClickHandlers();
    lazyLoader.init();
    animations.initMasonryAnimations();
  },
  
  initImageClickHandlers: () => {
    document.querySelectorAll('.masonry-img').forEach((img, index) => {
      const item = img.closest('.masonry-item');
      const itemId = item?.getAttribute('data-id');
      const portfolioItem = items.find(i => i.id == itemId);
      
      if (!portfolioItem) return;
      
      // Click handler
      img.addEventListener('click', () => modalManager.openPortfolioModal(portfolioItem));
      
      // Keyboard handler
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          modalManager.openPortfolioModal(portfolioItem);
        }
      });
      
      // Focus styles
      img.addEventListener('focus', () => {
        img.style.outline = `2px solid var(--primary)`;
        img.style.outlineOffset = '2px';
      });
      
      img.addEventListener('blur', () => {
        img.style.outline = 'none';
      });
    });
  }
};

// Lazy Loader
const lazyLoader = {
  init: () => {
    if (!('IntersectionObserver' in window)) {
      this.loadAllImages();
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              imageManager.loadImage(img);
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: CONFIG.LAZY_LOAD_THRESHOLD
      }
    );
    
    state.setImageObserver(observer);
    this.observeImages();
  },
  
  observeImages: () => {
    const observer = state.getImageObserver();
    if (!observer) return;
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      observer.observe(img);
    });
  },
  
  loadAllImages: () => {
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageManager.loadImage(img);
    });
  }
};

// Modal Manager
const modalManager = (() => {
  let currentModal = null;
  
  return {
    openPortfolioModal: (item) => {
      if (!item) return;
      
      const modal = DOM.get('portfolioModal');
      if (!modal) return;
      
      state.setCurrentPortfolioItem(item);
      currentModal = 'portfolio';
      
      // Update modal content
      DOM.get('portfolioModalImg').src = item.image;
      DOM.get('portfolioModalImg').alt = item.title;
      DOM.get('portfolioModalTitle').textContent = item.title;
      DOM.get('portfolioModalCategory').textContent = utils.getCategoryDisplayName(item.category);
      DOM.get('portfolioModalDescription').textContent = item.description;
      
      // Update counter
      const currentIndex = state.getVisibleItems().findIndex(i => i.id === item.id) + 1;
      DOM.get('currentImageIndex').textContent = currentIndex;
      DOM.get('totalImages').textContent = state.getVisibleItems().length;
      
      // Show modal
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      DOM.get('portfolioCloseBtn').focus();
      
      // Animation
      if (gsap) {
        gsap.fromTo(
          modal.querySelector('.modal-container'),
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
      }
    },
    
    closePortfolioModal: () => {
      const modal = DOM.get('portfolioModal');
      if (!modal) return;
      
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
      state.setCurrentPortfolioItem(null);
      currentModal = null;
    },
    
    navigatePortfolioModal: (direction) => {
      const currentItem = state.getCurrentPortfolioItem();
      if (!currentItem) return;
      
      const currentIndex = state.getVisibleItems().findIndex(item => item.id === currentItem.id);
      let newIndex = currentIndex + direction;
      
      // Circular navigation
      if (newIndex < 0) newIndex = state.getVisibleItems().length - 1;
      if (newIndex >= state.getVisibleItems().length) newIndex = 0;
      
      const newItem = state.getVisibleItems()[newIndex];
      if (newItem) {
        this.openPortfolioModal(newItem);
      }
    },
    
    getCurrentModal: () => currentModal
  };
})();

// Filter Manager
const filterManager = {
  filterByCategory: utils.throttle(function(category) {
    if (state.getIsAnimating() || state.getCurrentCategory() === category) return;
    
    state.setIsAnimating(true);
    state.setCurrentCategory(category);
    
    // Update buttons
    DOM.get('categoryButtons').forEach(btn => {
      const isActive = btn.getAttribute('data-category') === category;
      btn.setAttribute('aria-pressed', isActive.toString());
      btn.classList.toggle('active', isActive);
    });
    
    // Filter items
    const filteredItems = category === 'all' 
      ? items 
      : items.filter(item => item.category === category);
    
    state.setVisibleItems(filteredItems);
    
    // Animation
    const allItems = state.getMasonryItems();
    const visibleItems = category === 'all'
      ? allItems
      : allItems.filter(item => item.getAttribute('data-category') === category);
    
    if (gsap) {
      gsap.to(allItems, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.01,
        onComplete: () => {
          allItems.forEach(item => {
            item.classList.toggle('hidden', !visibleItems.includes(item));
          });
          
          gsap.fromTo(
            visibleItems,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.02,
              onComplete: () => {
                state.setIsAnimating(false);
                masonryGenerator.initImageClickHandlers();
                accessibility.announceFilterChange(category);
              }
            }
          );
        }
      });
    } else {
      // Fallback senza GSAP
      allItems.forEach(item => {
        item.classList.toggle('hidden', !visibleItems.includes(item));
      });
      state.setIsAnimating(false);
      masonryGenerator.initImageClickHandlers();
      accessibility.announceFilterChange(category);
    }
  }, 300),
  
  initCategoryButtons: () => {
    DOM.get('categoryButtons').forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        this.filterByCategory(category);
      });
      
      button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const category = button.getAttribute('data-category');
          this.filterByCategory(category);
        }
      });
    });
  }
};

// Animations Manager
const animations = {
  initMasonryAnimations: () => {
    const masonryItems = state.getMasonryItems();
    
    if (!gsap) {
      this.initFallbackAnimations();
      return;
    }
    
    // Hover animations
    masonryItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (!state.getIsAnimating()) {
          gsap.to(item, {
            y: -5,
            duration: 0.2,
            ease: 'power2.out'
          });
        }
      });
      
      item.addEventListener('mouseleave', () => {
        if (!state.getIsAnimating()) {
          gsap.to(item, {
            y: 0,
            duration: 0.2,
            ease: 'power2.out'
          });
        }
      });
    });
    
    // Scroll animations (desktop only)
    if (window.innerWidth > 768 && ScrollTrigger) {
      gsap.utils.toArray('.masonry-item').forEach(item => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
              markers: false
            }
          }
        );
      });
    }
  },
  
  initFallbackAnimations: () => {
    // CSS-only animations
    state.getMasonryItems().forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (!state.getIsAnimating()) {
          item.style.transform = 'translateY(-5px)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        if (!state.getIsAnimating()) {
          item.style.transform = 'translateY(0)';
        }
      });
    });
  }
};

// Accessibility Manager
const accessibility = {
  announceFilterChange: (category) => {
    const announcement = document.getElementById('filter-announcement') || this.createAnnouncementElement();
    const categoryName = utils.getCategoryDisplayName(category);
    const itemCount = document.querySelectorAll('.masonry-item:not(.hidden)').length;
    
    announcement.textContent = `Mostrando ${categoryName}. ${itemCount} progetti visualizzati.`;
  },
  
  createAnnouncementElement: () => {
    const element = document.createElement('div');
    element.id = 'filter-announcement';
    element.className = 'sr-only';
    element.setAttribute('aria-live', 'polite');
    element.setAttribute('aria-atomic', 'true');
    document.body.appendChild(element);
    return element;
  },
  
  initKeyboardNavigation: () => {
    document.addEventListener('keydown', (e) => {
      // ESC to close modals
      if (e.key === 'Escape') {
        if (DOM.get('portfolioModal').style.display === 'flex') {
          modalManager.closePortfolioModal();
        } else if (DOM.get('logoModal').style.display === 'block') {
          // Close logo modal function would go here
        }
      }
      
      // Arrow navigation in portfolio modal
      if (DOM.get('portfolioModal').style.display === 'flex' && state.getCurrentPortfolioItem()) {
        if (e.key === 'ArrowLeft') {
          modalManager.navigatePortfolioModal(-1);
        } else if (e.key === 'ArrowRight') {
          modalManager.navigatePortfolioModal(1);
        }
      }
    });
  }
};

// Initialization
const init = () => {
  // Set current year in footer
  if (DOM.get('currentYear')) {
    DOM.get('currentYear').textContent = new Date().getFullYear();
  }
  
  // Generate masonry
  masonryGenerator.generate();
  
  // Initialize category filters
  filterManager.initCategoryButtons();
  
  // Initialize accessibility
  accessibility.initKeyboardNavigation();
  
  // Preload critical images
  imageManager.preloadCriticalImages();
  
  // Initial animations
  if (gsap) {
    gsap.fromTo(
      DOM.get('categoryInfo'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
    );
  }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', init);

// Optimized resize handler
window.addEventListener('resize', utils.debounce(() => {
  if (ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}, CONFIG.RESIZE_DEBOUNCE));

// Error handling
window.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    console.warn('Image failed to load:', e.target.src);
    imageManager.handleImageError(e.target);
  }
}, true);

// Service Worker registration
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.warn);
  });
}

// Items array (mantenuto come nel codice originale)
const items = [
  {
    id: 1,
    title: "Fotografia Leone – Ritaglio e Composizione (PH)",
    category: "computer-graphic",
    description:
      "Ritaglio fotografico avanzato con inserimento di sfondo, luci e ombre per un effetto realistico.",
    image: "assets/Computer graphic/Fotoritocco Leone.jpg",
  },
  {
    id: 2,
    title: "Astronauta – Editing Tonale e Sfondo (PH)",
    category: "computer-graphic",
    description:
      "Rielaborazione fotografica con ritaglio preciso e modifica delle tonalità cromatiche di soggetto e sfondo.",
    image: "assets/Computer graphic/Fotoritocco astronauta.jpg",
  },
  {
    id: 3,
    title: "Spider-Man – Composizione Creativa",
    category: "computer-graphic",
    description:
      "Montaggio grafico con il celebre personaggio dei fumetti, ambientato in uno sfondo coerente e stilizzato.",
    image: "assets/Computer graphic/spiderman colore 1.jpg",
  },
  {
    id: 4,
    title: "Busto Uomo – Poster Moderno",
    category: "computer-graphic",
    description:
      "Poster digitale con colori vivaci e contrastanti, ispirato a uno stile contemporaneo.",
    image: "assets/Computer graphic/fotoritocco busto uomo 1.png",
  },
  {
    id: 5,
    title: "Logo Gruppo Musicale – Volto e Nota",
    category: "loghi",
    description:
      "Logo concettuale per band musicale, con fusione creativa tra volto umano e nota musicale.",
    image: "assets/Loghi/logo 7dayswalk2.jpg",
  },
  {
    id: 6,
    title: "Logo Personale – Vettorializzazione Creativa",
    category: "loghi",
    description:
      "Logo realizzato a partire da una fotografia, vettorializzato con lo strumento CreaForme di Illustrator.",
    image: "assets/Loghi/logo illustrazione.png",
  },
  {
    id: 7,
    title: "Logo Minimalista – Spazio 3D",
    category: "loghi",
    description:
      "Design essenziale con pochi elementi, che creano un ambiente tridimensionale per un logo pulito e moderno.",
    image: "assets/Loghi/logo musebq.png",
  },
  {
    id: 8,
    title: "Colori – Editing RAW (PH)",
    category: "fotografie",
    description:
      "Modifica dei valori cromatici di un file RAW digitale, con interventi mirati su tonalità e saturazione.",
    image: "assets/Fotografie/giallo - blu.jpg",
  },
  {
    id: 9,
    title: "Bianco e Nero – Composizione Artistica",
    category: "fotografie",
    description:
      "Fotografia in bianco e nero con interventi artistici sui valori tonali e sulla composizione visiva.",
    image: "assets/Fotografie/IMG_9775.jpg",
  },
  {
    id: 10,
    title: "Icona Pianeta – Design Orbitale",
    category: "icone",
    description:
      "Icona stilizzata di un pianeta con asteroidi orbitanti, disposti lungo un'ellisse.",
    image: "assets/Icone/planet.jpg",
  },
  {
    id: 11,
    title: "Icona Diavolo – Simbolo Personalizzato",
    category: "icone",
    description:
      "Proposta grafica per un'icona simbolica, con elementi personalizzati e stile distintivo.",
    image: "assets/Icone/devil.jpg",
  },
  {
    id: 12,
    title: "Icona Catalogo – Pack Web Design",
    category: "icone",
    description:
      "Icona progettata per integrarsi con un pack grafico dedicato al Web Design, in stile coerente e versatile.",
    image: "assets/Icone/Colore bianco/icona catalogo var.png",
  },
  {
    id: 13,
    title: "Poster – Font New Times Roman",
    category: "poster tipografico",
    description:
      "Poster tipografico che valorizza l'elegance classica del New Times Roman, ideale per progetti editoriali e comunicazioni istituzionali.",
    image: "assets/Stampe + Font/Poster PDF Carattere New Times Roman.png",
  },
  {
    id: 14,
    title: "Poster – Font Helvetica Regular",
    category: "poster tipografico",
    description:
      "Composizione pulita e bilanciata che esalta la neutralità e la leggibilità del carattere Helvetica Regular, perfetta per layout moderni.",
    image: "assets/Stampe + Font/Poster PDF Carattere Helvetica Regular.png",
  },
  {
    id: 15,
    title: "Poster – Font Helvetica Oblique",
    category: "poster tipografico",
    description:
      "Design dinamico che sfrutta l'inclinazione dell'Helvetica Oblique per trasmettere movimento e contemporaneità visiva.",
    image: "assets/Stampe + Font/Poster PDF Carattere Helvetica Oblique.png",
  },
  {
    id: 16,
    title: "Poster – Font Helvetica Bold",
    category: "poster tipografico",
    description:
      "Poster d'impatto che mette in risalto la forza visiva dell'Helvetica Bold, ideale per titoli e comunicazioni assertive.",
    image: "assets/Stampe + Font/Poster PDF Carattere Helvetica Bold.png",
  },
  {
    id: 17,
    title: "Poster – Font Futura",
    category: "poster tipografico",
    description:
      "Composizione geometrica e minimalista che celebra la modernità del carattere Futura, perfetta per progetti dal gusto contemporaneo.",
    image: "assets/Stampe + Font/Poster PDF Carattere Futura .png",
  },
  {
    id: 18,
    title: "Poster – Font Baskerville",
    category: "poster tipografico",
    description:
      "Poster raffinato che valorizza l'equilibrio tra tradizione e leggibilità del carattere Baskerville, con un tocco editoriale.",
    image: "assets/Stampe + Font/Poster PDF Carattere Baskerville.png",
  },
  {
    id: 19,
    title: "Poster – Font Baskerville (ver. 1)",
    category: "poster tipografico",
    description:
      "Versione alternativa che esplora le potenzialità espressive del Baskerville, con una composizione visiva più sperimentale.",
    image: "assets/Stampe + Font/Poster PDF Carattere Baskerville v1.png",
  },
];