// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

const items = [
  {
    id: 1,
    title: "Fotografia Leone – Ritaglio e Composizione (PH)",
    category: "computer-graphic",
    description: "Ritaglio fotografico avanzato con inserimento di sfondo, luci e ombre per un effetto realistico.",
    image: "assets/Computer graphic/Fotoritocco Leone.jpg"
  },
  {
    id: 2,
    title: "Astronauta – Editing Tonale e Sfondo (PH)",
    category: "computer-graphic",
    description: "Rielaborazione fotografica con ritaglio preciso e modifica delle tonalità cromatiche di soggetto e sfondo.",
    image: "assets/Computer graphic/Fotoritocco astronauta.jpg"
  },
  {
    id: 3,
    title: "Spider-Man – Composizione Creativa",
    category: "computer-graphic",
    description: "Montaggio grafico con il celebre personaggio dei fumetti, ambientato in uno sfondo coerente e stilizzato.",
    image: "assets/Computer graphic/spiderman colore 1.jpg"
  },
  {
    id: 4,
    title: "Busto Uomo – Poster Moderno",
    category: "computer-graphic",
    description: "Poster digitale con colori vivaci e contrastanti, ispirato a uno stile contemporaneo.",
    image: "assets/Computer graphic/fotoritocco busto uomo 1.png"
  },
  {
    id: 5,
    title: "Logo Gruppo Musicale – Volto e Nota",
    category: "loghi",
    description: "Logo concettuale per band musicale, con fusione creativa tra volto umano e nota musicale.",
    image: "assets/Loghi/logo 7dayswalk2.jpg"
  },
  {
    id: 6,
    title: "Logo Personale – Vettorializzazione Creativa",
    category: "loghi",
    description: "Logo realizzato a partire da una fotografia, vettorializzato con lo strumento CreaForme di Illustrator.",
    image: "assets/Loghi/logo illustrazione.png"
  },
  {
    id: 7,
    title: "Logo Minimalista – Spazio 3D",
    category: "loghi",
    description: "Design essenziale con pochi elementi, che creano un ambiente tridimensionale per un logo pulito e moderno.",
    image: "assets/Loghi/logo musebq.png"
  },
  {
    id: 8,
    title: "Colori – Editing RAW (PH)",
    category: "fotografie",
    description: "Modifica dei valori cromatici di un file RAW digitale, con interventi mirati su tonalità e saturazione.",
    image: "assets/Fotografie/giallo - blu.jpg"
  },
  {
    id: 9,
    title: "Bianco e Nero – Composizione Artistica",
    category: "fotografie",
    description: "Fotografia in bianco e nero con interventi artistici sui valori tonali e sulla composizione visiva.",
    image: "assets/Fotografie/IMG_9775.jpg"
  },
  {
    id: 10,
    title: "Icona Pianeta – Design Orbitale",
    category: "icone",
    description: "Icona stilizzata di un pianeta con asteroidi orbitanti, disposti lungo un'ellisse.",
    image: "assets/Icone/planet.jpg"
  },
  {
    id: 11,
    title: "Icona Diavolo – Simbolo Personalizzato",
    category: "icone",
    description: "Proposta grafica per un'icona simbolica, con elementi personalizzati e stile distintivo.",
    image: "assets/Icone/devil.jpg"
  },
  {
    id: 12,
    title: "Icona Catalogo – Pack Web Design",
    category: "icone",
    description: "Icona progettata per integrarsi con un pack grafico dedicato al Web Design, in stile coerente e versatile.",
    image: "assets/Icone/Colore bianco/icona catalogo var.png"
  }
];


// Funzione per generare gli elementi Masonry
function generateMasonryItems(itemsToShow = items) {
    const container = document.getElementById('masonry-container');
    container.innerHTML = '';

    itemsToShow.forEach(item => {
        const masonryItem = document.createElement('div');
        masonryItem.className = 'masonry-item';
        masonryItem.setAttribute('data-category', item.category);

        masonryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="masonry-img">
                    <div class="masonry-content">
                        <span class="masonry-category">${item.category}</span>
                        <h3 class="masonry-title">${item.title}</h3>
                        <p class="masonry-description">${item.description}</p>
                    </div>
                `;

        container.appendChild(masonryItem);
    });
}

// Funzione per filtrare per categoria
function filterByCategory(category) {
    const allItems = document.querySelectorAll('.masonry-item');

    if (category === 'all') {
        allItems.forEach(item => {
            item.classList.remove('hidden');
        });
    } else {
        allItems.forEach(item => {
            if (item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', function () {
    // Genera gli elementi Masonry
    generateMasonryItems();

    // Aggiungi event listener ai pulsanti di categoria
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Rimuovi la classe active da tutti i pulsanti
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Aggiungi la classe active al pulsante cliccato
            this.classList.add('active');
            // Filtra gli elementi per categoria
            filterByCategory(this.getAttribute('data-category'));
        });
    });
});

// Gestione del ridimensionamento della finestra per un layout più fluido
window.addEventListener('resize', function () {
    // Ricrea gli elementi per adattarsi al nuovo layout
    generateMasonryItems();
});