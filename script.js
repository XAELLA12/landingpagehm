document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const dotsContainer = document.querySelector(".dots");
    const cards = document.querySelectorAll(".carousel .card");

    // Crea i pallini in base al numero di card
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

    // Aggiunge evento di click a ogni card per espandere/richiedere
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            const isExpanded = card.classList.contains("expanded");

            // Se la card è già espansa, la richiude
            if (isExpanded) {
                card.classList.remove("expanded");

                // Rimuove contenuti specifici di espansione
                const productList = card.querySelector(".product-list");
                const bookingButton = card.querySelector(".booking-button");
                if (productList) productList.remove();
                if (bookingButton) bookingButton.remove();

            } else {
                // Chiude tutte le altre card e apre quella selezionata
                cards.forEach((c) => {
                    c.classList.remove("expanded");
                    const productList = c.querySelector(".product-list");
                    const bookingButton = c.querySelector(".booking-button");
                    if (productList) productList.remove();
                    if (bookingButton) bookingButton.remove();
                });

                // Aggiunge l'espansione alla card cliccata
                card.classList.add("expanded");

                // Creazione del contenuto della lista dei prodotti
                const productList = document.createElement("ul");
                productList.classList.add("product-list");

                let products;
                let buttonText;

                // Contenuto specifico in base alla card
                switch(index) {
                    case 0:
                        products = ["Vino", "Salame", "Prosciutto"];
                        buttonText = "Prenota ora!";
                        break;
                    case 1:
                        products = ["Coding Courses", "Practice", "Projects"];
                        buttonText = "Join Now!";
                        break;
                    case 2:
                        products = ["Olio", "Formaggio", "Pane"];
                        buttonText = "Acquista ora!";
                        break;
                    case 3:
                        products = ["Pasta", "Pomodori", "Mozzarella"];
                        buttonText = "Scopri di più!";
                        break;
                }

                products.forEach(product => {
                    const listItem = document.createElement("li");
                    listItem.textContent = product;
                    productList.appendChild(listItem);
                });

                // Aggiunge la lista e il pulsante alla card espansa
                card.appendChild(productList);

                // Pulsante di prenotazione
                const bookingButton = document.createElement("a");
                bookingButton.href = "checkout.html";
                bookingButton.classList.add("booking-button");
                bookingButton.target = "_blank";

                const buttonImage = document.createElement("img");
                buttonImage.src = "img/addcart_button.png";
                buttonImage.alt = buttonText;
                bookingButton.appendChild(buttonImage);

                const buttonTextEl = document.createElement("span");
                buttonTextEl.textContent = buttonText;
                bookingButton.appendChild(buttonTextEl);

                card.appendChild(bookingButton);
            }
            // Aggiorna i pallini attivi in base all'indice della card cliccata
            updateDots(index);
        });
    });

    // Scorrimento del carosello per aggiornare i pallini in base alla posizione
    carousel.addEventListener("scroll", () => {
        const cardWidth = cards[0].offsetWidth + 16; // Larghezza card + gap
        const newIndex = Math.round(carousel.scrollLeft / cardWidth);
        updateDots(newIndex);
    });
});
