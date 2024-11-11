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
            cards.forEach((c) => {
                c.classList.remove("expanded");
                const productList = c.querySelector(".product-list");
                const bookingButton = c.querySelector(".booking-button");
                if (productList) productList.remove(); // Rimuove la lista se presente
                if (bookingButton) bookingButton.remove(); // Rimuove il pulsante se presente
                const description = c.querySelector("span");
                description.textContent = "La nostra selezione di prodotti locali"; // Resetta il testo originale
            });

            if (bodyText) bodyText.classList.remove("hidden");

            if (!isExpanded) {
                card.classList.add("expanded"); // Espande solo la card cliccata
                if (bodyText) bodyText.classList.add("hidden"); // Nasconde body-text quando la card è espansa

                // Trasforma il testo in una lista di prodotti
                const description = card.querySelector("span");
                description.textContent = ""; // Svuota il testo originale

                // Crea la lista di prodotti
                const productList = document.createElement("ul");
                productList.classList.add("product-list");

                // Aggiungi gli elementi della lista
                ["Vino", "Salame", "Prosciutto"].forEach(product => {
                    const listItem = document.createElement("li");
                    listItem.textContent = product;
                    productList.appendChild(listItem);
                });

                // Aggiungi la lista all'elemento "span"
                description.appendChild(productList);

                // Crea il pulsante Prenota Ora
                const bookingButton = document.createElement("a");
                bookingButton.href = "checkout.html";
                bookingButton.classList.add("booking-button");
                bookingButton.target = "_blank"; // Apri in una nuova pagina

                // Crea l'immagine del pulsante e aggiungi il testo
                const buttonImage = document.createElement("img");
                buttonImage.src = "img/addcart_button.png";
                buttonImage.alt = "Prenota ora";
                bookingButton.appendChild(buttonImage);

                // Testo all'interno del pulsante
                const buttonText = document.createElement("span");
                buttonText.textContent = "Prenota ora!";
                bookingButton.appendChild(buttonText);

                // Aggiungi il pulsante sotto la lista dei prodotti
                description.appendChild(bookingButton);
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
