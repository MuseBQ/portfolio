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
      "Poster tipografico che valorizza l’eleganza classica del New Times Roman, ideale per progetti editoriali e comunicazioni istituzionali.",
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
      "Design dinamico che sfrutta l’inclinazione dell’Helvetica Oblique per trasmettere movimento e contemporaneità visiva.",
    image: "assets/Stampe + Font/Poster PDF Carattere Helvetica Oblique.png",
  },
  {
    id: 16,
    title: "Poster – Font Helvetica Bold",
    category: "poster tipografico",
    description:
      "Poster d’impatto che mette in risalto la forza visiva dell’Helvetica Bold, ideale per titoli e comunicazioni assertive.",
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
      "Poster raffinato che valorizza l’equilibrio tra tradizione e leggibilità del carattere Baskerville, con un tocco editoriale.",
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

// Cache degli elementi DOM
const DOM = {
  container: document.getElementById("masonry-container"),
  categoryButtons: document.querySelectorAll(".category-btn"),
  categoryInfo: document.getElementById("category-info"),
  loadingIndicator: document.getElementById("loadingIndicator"),
  modal: document.getElementById("logoModal"),
  modalImg: document.getElementById("logoModalImg"),
  closeBtn: document.querySelector(".close"),
  logo: document.getElementById("logoClickable")
};

// Stato dell'applicazione
const state = {
  currentCategory: "all",
  isAnimating: false
};

// Funzione per generare gli elementi Masonry con animazioni
function generateMasonryItems(itemsToShow = items) {
  DOM.container.innerHTML = "";
  
  // Mostra l'indicatore di caricamento
  DOM.loadingIndicator.style.display = "flex";
  
  // Simula un piccolo delay per mostrare l'animazione di caricamento
  setTimeout(() => {
    itemsToShow.forEach((item, index) => {
      const masonryItem = document.createElement("div");
      masonryItem.className = "masonry-item";
      masonryItem.setAttribute("data-category", item.category);
      masonryItem.setAttribute("data-id", item.id);

      masonryItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="masonry-img" loading="lazy">
        <div class="masonry-content">
          <span class="masonry-category">${item.category}</span>
          <h3 class="masonry-title">${item.title}</h3>
          <p class="masonry-description">${item.description}</p>
        </div>
      `;

      DOM.container.appendChild(masonryItem);
      
      // Animazione di entrata con delay progressivo
      setTimeout(() => {
        masonryItem.classList.add("visible");
      }, 100 + (index * 50));
    });
    
    // Nascondi l'indicatore di caricamento
    DOM.loadingIndicator.style.display = "none";
    
    // Inizializza le animazioni GSAP per gli elementi
    initMasonryAnimations();
  }, 500);
}

// Funzione per filtrare per categoria con animazioni
function filterByCategory(category) {
  if (state.isAnimating || state.currentCategory === category) return;
  
  state.isAnimating = true;
  state.currentCategory = category;
  
  const allItems = document.querySelectorAll(".masonry-item");
  
  // Animazione di uscita
  gsap.to(allItems, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    stagger: 0.02,
    onComplete: () => {
      if (category === "all") {
        allItems.forEach(item => {
          item.classList.remove("hidden");
        });
      } else {
        allItems.forEach(item => {
          if (item.getAttribute("data-category") === category) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      }
      
      // Animazione di entrata
      const visibleItems = document.querySelectorAll(".masonry-item:not(.hidden)");
      gsap.fromTo(visibleItems, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.03,
          onComplete: () => {
            state.isAnimating = false;
          }
        }
      );
    }
  });
}

// Inizializza le animazioni GSAP per gli elementi masonry
function initMasonryAnimations() {
  const masonryItems = document.querySelectorAll(".masonry-item");
  
  // Animazione al passaggio del mouse
  masonryItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, { 
        y: -8, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
    
    item.addEventListener("mouseleave", () => {
      gsap.to(item, { 
        y: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
  });
  
  // Animazione allo scroll con ScrollTrigger
  gsap.utils.toArray(".masonry-item").forEach(item => {
    gsap.fromTo(item, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}

// Gestione del modale
function initModal() {
  DOM.logo.onclick = function () {
    DOM.modal.style.display = "block";
    DOM.modalImg.src = this.src;
    document.body.style.overflow = "hidden"; // Previene lo scroll del body
  };

  DOM.closeBtn.onclick = function () {
    DOM.modal.style.display = "none";
    document.body.style.overflow = "auto"; // Ripristina lo scroll
  };

  window.onclick = function (event) {
    if (event.target === DOM.modal) {
      DOM.modal.style.display = "none";
      document.body.style.overflow = "auto"; // Ripristina lo scroll
    }
  };
}

// Inizializzazione
document.addEventListener("DOMContentLoaded", function () {
  // Genera gli elementi Masonry
  generateMasonryItems();

  // Aggiungi event listener ai pulsanti di categoria
  DOM.categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Rimuovi la classe active da tutti i pulsanti
      DOM.categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Aggiungi la classe active al pulsante cliccato
      this.classList.add("active");
      // Filtra gli elementi per categoria
      filterByCategory(this.getAttribute("data-category"));
    });
  });

  // Inizializza il modale
  initModal();

  // Animazione iniziale per il contenuto della categoria
  gsap.fromTo(DOM.categoryInfo, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
  );
});

// Gestione del ridimensionamento della finestra con debounce
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Ricrea gli elementi per adattarsi al nuovo layout
    generateMasonryItems();
  }, 250);
});

// Precaricamento delle immagini per migliori performance
function preloadImages() {
  items.forEach(item => {
    const img = new Image();
    img.src = item.image;
  });
}

// Avvia il precaricamento dopo il caricamento della pagina
window.addEventListener('load', preloadImages);