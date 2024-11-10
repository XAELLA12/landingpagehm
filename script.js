document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".carousel .card");
    const carousel = document.querySelector(".carousel");
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const dotsContainer = document.querySelector(".dots");
    const cardWidth = cards[0].offsetWidth + 16; // Larghezza di una card + gap
    const bodyText = document.querySelector(".body-text"); // Seleziona l'elemento body-text

    // Genera i pallini in base al numero di card
    cards.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active"); // Imposta il primo pallino come attivo all'inizio
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    // Funzione per aggiornare i pallini attivi
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === activeIndex);
        });
    }

    // Aggiungi evento di click per espandere/chiudere le card
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            const isExpanded = card.classList.contains("expanded");
            
            // Rimuove l'espansione da tutte le card e mostra body-text
            cards.forEach((c) => c.classList.remove("expanded"));
            if (bodyText) bodyText.classList.remove("hidden");

            if (!isExpanded) {
                card.classList.add("expanded"); // Espande solo la card cliccata
                if (bodyText) bodyText.classList.add("hidden"); // Nasconde body-text quando la card è espansa
            }

            updateDots(index); // Aggiorna il pallino attivo in base alla card cliccata
        });
    });

    // Funzioni per lo scorrimento del carosello
    let currentIndex = 0;

    leftBtn.addEventListener("click", () => {
        if (currentIndex > 0) currentIndex--;
        carousel.scrollLeft -= cardWidth;
        updateDots(currentIndex);
    });

    rightBtn.addEventListener("click", () => {
        if (currentIndex < cards.length - 1) currentIndex++;
        carousel.scrollLeft += cardWidth;
        updateDots(currentIndex);
    });

    // Rileva lo scroll del carosello e aggiorna i pallini attivi
    carousel.addEventListener("scroll", () => {
        const scrollLeft = carousel.scrollLeft;
        const newIndex = Math.round(scrollLeft / cardWidth); // Calcola l'indice della card visibile
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateDots(currentIndex);
        }
    });
});