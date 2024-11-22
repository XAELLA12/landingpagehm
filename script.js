document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const dotsContainer = document.querySelector(".dots");
    const cards = document.querySelectorAll(".carousel .card");
    const bodyText = document.querySelector(".body-text");
    const header = document.querySelector(".header");

   // Funzione per verificare se una card è espansa
   function isAnyCardExpanded() {
    return Array.from(cards).some(card => card.classList.contains("expanded"));
}

// Funzione per chiudere tutte le card espanse
function closeAllExpandedCards() {
    cards.forEach(card => {
        card.classList.remove("expanded");
        const expandedContent = card.querySelector(".expanded-content");
        const descriptionText = card.querySelector("span[data-i18n]");
        if (expandedContent) expandedContent.classList.add("hidden");
        if (descriptionText) descriptionText.style.display = ''; // Mostra la descrizione principale
    });
    toggleBodyText(true); // Mostra il testo del corpo principale
}

// Evento per chiudere la card quando si clicca fuori
document.addEventListener("click", (event) => {
    // Verifica se il clic è avvenuto all'interno di una card
    const clickedInsideCard = Array.from(cards).some(card => card.contains(event.target));
    
    if (!clickedInsideCard && isAnyCardExpanded()) {
        closeAllExpandedCards();
    }
});

// Evento sul clic dell'header
header.addEventListener("click", () => {
    if (isAnyCardExpanded()) {
        // Se c'è una card espansa, chiudi tutte le card
        closeAllExpandedCards();
    } else {
        // Se non ci sono card espanse, torna all'index.html
        window.location.href = "index.html";
    }
});

// Funzione per mostrare o nascondere il body text
function toggleBodyText(visible) {
    bodyText.style.display = visible ? "block" : "none";
}

    // Imposta la lingua corrente, con l'inglese come predefinita o leggendola da localStorage
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // Definizioni delle pagine di checkout per ogni card
    const checkoutPages = [
        "checkoutbox.html",
        "checkoutchef.html",
        "checkoutaperitivo.html",
        "checkoutfoodtour.html"
    ];

    const translations = {
        en: {
            "footer.language": "Language:",
            "discover.more": "Discover more",
            "body.text": "Design your holiday in Rome between history and flavors with us!",
            "card1.title": "Our Grocery Delivery",
            "card2.title": "Our Roman Private Dinner",
            "card3.title": "Our Aperitif",
            "card4.title": "Food and Historical Walk",
            "card1.description": "Enjoy your holiday with our delicious Roman delicacies!",
            "card2.description": "Your authentically Italian evening with us!",
            "card3.description": "Choose our aperitif designed specifically to let you savor our most authentic products with mind-boggling cocktails!",
            "card4.description": "Get ready to tour the city with the best food Rome has to offer!",
          "product.boxDescription": "Choose our Box with the best local products to receive directly upon your arrival! Or text us a shopping list you wish, we'll take care of everything!",
    "product.wine": "Bottle of wine from our Region",
    "product.tarallucci": "Tarallucci",
    "product.pecorino": "Pecorino Cheese",
    "product.olives": "Green Aperitif Olives",
    "product.hams": "Selection of hams",
    "product.salamis": "Selection of salamis",
    "product.buffaloMozzarella": "Buffalo Mozzarella",
    "product.whitePizza": "White pizza",
    "product.wineDonuts": "Wine donuts",
    "product.startingPrice": "Starting from 50€",
    
    
    "product.cultureFood": "This is the culture of food in Italy: sitting at the table, chatting, sharing life with good food and good wine, is fundamental for us!",
    "product.romanDinner": "We will prepare a Roman dinner with dishes that represent our history, the deepest anecdotes in an unforgettable culinary journey. Look at our genuine menu proposal or write to us and we will create a tailor-made experience for you!",
    "product.menuTitle": "Our Roman menu:",
    "product.panzanella": "Roman Panzanella",
    "product.suppli": "Supplì and courgette flowers",
    "product.pastaTasting": "Tasting of pasta Carbonara and pasta Cacio e Pepe",
    "product.tripe": "Tasting of Roman tripe",
    "product.saltimbocca": "Tasting of Saltimbocca alla Romana",
    "product.tiramisu": "Tiramisù",
    "product.tozzetti": "Tozzetti and Vinosanto",
    "product.price": "Price per person: 95€",


        },
        it: {
            "footer.language": "Lingua:",
            "discover.more": "Scopri di più",
            "body.text": "Progetta con noi la tua vacanza a Roma, tra storia e sapori indimenticabili!",
            "card1.title": "Box di Benvenuto",
            "card2.title": "Chef a Domicilio",
            "card3.title": "Il Nostro Aperitivo",
            "card4.title": "Food Tour",
             "card1.description": "Goditi la tua vacanza con le nostre deliziose specialità romane!",
             "card2.description": "La tua autentica serata romana con noi!",
             "card3.description": "scegli il nostro aperitivo, pensato per farti assaporare i nostri prodotti tipici e i nostri cocktails !",
             "card4.description": "Preparati a scoprire la città con il miglior cibo che Roma ha da offrire!",
             "product.boxDescription": "Scegli la nostra scatola con i migliori prodotti locali da ricevere direttamente al tuo arrivo! Oppure inviaci una lista della spesa e penseremo a tutto noi!",
    "product.wine": "Bottiglia di vino della nostra regione",
    "product.tarallucci": "Tarallucci",
    "product.pecorino": "Formaggio Pecorino",
    "product.olives": "Olive per aperitivo verdi",
    "product.hams": "Selezione di prosciutti",
    "product.salamis": "Selezione di salami",
    "product.buffaloMozzarella": "Mozzarella di Bufala",
    "product.whitePizza": "Pizza bianca",
    "product.wineDonuts": "Ciambelline al vino",
    "product.startingPrice": "A partire da 50€",

    "product.cultureFood": "Questa è la cultura del cibo in Italia: sedersi a tavola, chiacchierare, condividere la vita con buon cibo e buon vino è fondamentale per noi!",
    "product.romanDinner": "Prepariamo una cena romana con piatti che rappresentano la nostra storia, gli aneddoti più profondi in un viaggio culinario indimenticabile. Guarda la nostra proposta di menu genuino o scrivici e creeremo un'esperienza su misura per te!",
    "product.menuTitle": "Il nostro menu romano:",
    "product.panzanella": "Panzanella Romana",
    "product.suppli": "Supplì e fiori di zucca",
    "product.pastaTasting": "Assaggio di pasta Carbonara e pasta Cacio e Pepe",
    "product.tripe": "Assaggio di trippa romana",
    "product.saltimbocca": "Assaggio di Saltimbocca alla Romana",
    "product.tiramisu": "Tiramisù",
    "product.tozzetti": "Tozzetti e Vinosanto",
    "product.price": "Prezzo per persona: 95€",

        }
    };

    // Funzione per cambiare lingua e salvare la scelta in localStorage
    function changeLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang); // Salva la lingua in localStorage
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            element.textContent = translations[lang][key] || element.textContent;
        });
    }
      // Evento per il cambio lingua e salva la preferenza
      document.getElementById("language-footer").addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        changeLanguage(selectedLanguage);
    });

    // Imposta la lingua iniziale basata su localStorage
    changeLanguage(currentLang);
    document.getElementById("language-footer").value = currentLang;
    
   

    // Funzione per mostrare o nascondere il body text
    function toggleBodyText(visible) {
        bodyText.style.display = visible ? "block" : "none";
    }

    // Funzione per espandere una card e mostrare i dettagli
    function toggleCardExpansion(card, index) {
        const isExpanded = card.classList.contains("expanded");
        const descriptionText = card.querySelector("span[data-i18n]"); // Seleziona la descrizione principale

        if (isExpanded) {
            // Chiudi la card
            card.classList.remove("expanded");
            toggleBodyText(true);
            const expandedContent = card.querySelector(".expanded-content");
            if (expandedContent) expandedContent.classList.add("hidden");
            if (descriptionText) descriptionText.style.display = ''; // Mostra la descrizione principale
        } else {
            // Chiude tutte le altre card e apre quella selezionata
            cards.forEach((c) => {
                c.classList.remove("expanded");
                const expandedContent = c.querySelector(".expanded-content");
                if (expandedContent) expandedContent.classList.add("hidden");
                const otherDescription = c.querySelector("span[data-i18n]");
                if (otherDescription) otherDescription.style.display = ''; // Mostra la descrizione principale
            });

            toggleBodyText(false);
            card.classList.add("expanded");

            // Nasconde la descrizione principale e mostra i contenuti espansi
            if (descriptionText) descriptionText.style.display = 'none';
            const expandedContent = card.querySelector(".expanded-content");
            if (expandedContent) expandedContent.classList.remove("hidden");
        }
    }

    // Funzione per creare i pallini di navigazione per ciascuna card
    cards.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active"); // Imposta il primo pallino come attivo all'inizio
        dotsContainer.appendChild(dot);

        // Aggiunge evento di click al pallino per scorrere alla card corrispondente
        dot.addEventListener("click", () => {
            scrollToCard(index);
        });
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    // Funzione per aggiornare il pallino attivo
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === activeIndex);
        });
    }

    // Funzione per scorrere fino a una card specifica
    function scrollToCard(index) {
        const cardWidth = cards[0].offsetWidth + 16; // Larghezza card + gap
        carousel.scrollLeft = index * cardWidth;
        updateDots(index);
    }

    // Aggiunge evento di click a ogni card per espandere/chiudere
    cards.forEach((card, index) => {
        card.addEventListener("click", () => toggleCardExpansion(card, index));

        // Imposta il pulsante di prenotazione per reindirizzare alla pagina corretta
        const bookingButton = card.querySelector(".styled-button");
        if (bookingButton) {
            bookingButton.addEventListener("click", (event) => {
                event.stopPropagation(); // Previene l'espansione della card
                window.location.href = checkoutPages[index]; // Reindirizza alla pagina di checkout corrispondente
            });
        }
    });

    // Evento per il cambio lingua
    document.getElementById("language-footer").addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        changeLanguage(selectedLanguage);
    });

    // Imposta la lingua iniziale basata su localStorage
    changeLanguage(currentLang);
    document.getElementById("language-footer").value = currentLang;

    // Scorrimento del carosello per aggiornare i pallini in base alla posizione
    carousel.addEventListener("scroll", () => {
        const cardWidth = cards[0].offsetWidth + 16;
        const newIndex = Math.round(carousel.scrollLeft / cardWidth);
        updateDots(newIndex);
    });
});
