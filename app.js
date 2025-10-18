// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

// Dati delle stampe e copertine
const items = [
    {
        id: 1,
        title: "Leone",
        category: "computer-graphic",
        description: "Tecnica del ritaglio fotografico, con l'aggiunta di luci e ombre.",
        image: "assets/Computer graphic/Fotoritocco Leone.jpg"
    },
    {
        id: 2,
        title: "Astronauta",
        category: "computer-graphic",
        description: "Ritaglio fotografico e modifica dei colori del sogetto e dello sfondo.",
        image: "assets/Computer graphic/Fotoritocco astronauta.jpg"
    },
    {
        id: 3,
        title: "Scarpa Jordan",
        category: "computer-graphic",
        description: "Vettorializzazione in formato .SVG, di una scarpa Jordan.",
        image: "assets/Computer graphic/scarpa-air-jordan.jpg"
    },
        {
        id: 4,
        title: "Spider-man",
        category: "computer-graphic",
        description: "Composizione con diversi elementi di fotografie.",
        image: "assets/Computer graphic/spiderman colore 1.jpg"
    },
    {
        id: 5,
        title: "Busto Uomo",
        category: "computer-graphic",
        description: "Rappresentazione moderna di un poster con colori vivaci e brillanti.",
        image: "assets/Computer graphic/fotoritocco busto uomo 1.png"
    },
    {
        id: 6,
        title: "Copertina Rivista",
        category: "loghi",
        description: "Riproduzione di una copertina di rivista degli anni '60.",
        image: "assets/Loghi/logo 7dayswalk2.jpg"
    },
    {
        id: 7,
        title: "Espressione Colore",
        category: "loghi",
        description: "Esplosione di colori su sfondo neutro.",
        image: "assets/Loghi/logo illustrazione.png"
    },
    {
        id: 8,
        title: "Minimalismo",
        category: "loghi",
        description: "Opera minimalista con pochi elementi essenziali.",
        image: "assets/Loghi/logo musebq.png"
    },
    {
        id: 9,
        title: "Sogni Astratti",
        category: "loghi",
        description: "Rappresentazione onirica di forme e colori.",
        image: "assets/Favicon/favicon.png"
    },
    {
        id: 10,
        title: "Classico Rivisitato",
        category: "loghi",
        description: "Rivisitazione in chiave moderna di un classico.",
        image: "assets/Favicon/favicon2.png"
    },
    {
        id: 11,
        title: "Pattern Geometrico",
        category: "fotografie",
        description: "Composizione con pattern geometrici ripetuti.",
        image: "assets/Fotografie/giallo - blu.jpg"
    },
    {
        id: 12,
        title: "Manifesto Vintage",
        category: "fotografie",
        description: "Riproduzione fedele di un manifesto pubblicitario d'epoca.",
        image: "assets/Fotografie/IMG_9775.jpg"
    },
        {
        id: 13,
        title: "Pianeta",
        category: "icone",
        description: "Riproduzione fedele di un manifesto pubblicitario d'epoca.",
        image: "assets/Icone/planet.jpg"
    },
        {
        id: 14,
        title: "Diavolo",
        category: "icone",
        description: "Riproduzione fedele di un manifesto pubblicitario d'epoca.",
        image: "assets/Icone/devil.jpg"
    },
        {
        id: 15,
        title: "Icona Catalogo",
        category: "icone",
        description: "Composizione astratta con forme geometriche sovrapposte.",
        image: "assets/Icone/Colore bianco/icona catalogo var.png"
    },
    
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