document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const dotsContainer = document.querySelector(".dots");
    const cards = document.querySelectorAll(".carousel .card");
    const bodyText = document.querySelector(".body-text");

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
            "body.text": "Design your holiday in Rome between history and flavors with us!"
        },
        it: {
            "footer.language": "Lingua:",
            "discover.more": "Scopri di più",
            "body.text": "Da HomeMade, ti invitiamo a migliorare il tuo viaggio a Roma con la nostra selezione di esperienze culinarie, pensate per aggiungere un sapore unico al tuo soggiorno!"
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
