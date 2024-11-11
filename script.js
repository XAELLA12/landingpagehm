document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const dotsContainer = document.querySelector(".dots");
    const cards = document.querySelectorAll(".carousel .card");
    const bodyText = document.querySelector(".body-text");

    // Descrizioni iniziali per ciascuna card
    const initialDescriptions = [
        "La nostra selezione di prodotti locali direttamente a casa tua!",
        "Un'autentica esperienza di cena romana a casa tua!",
        "Prepareremo un aperitivo in stile Italiano direttamente a casa vostra!",
        "Cammianta culinaria nei vicoli di Roma"
    ];

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

    // Funzione per mostrare o nascondere il body text
    function toggleBodyText(visible) {
        bodyText.style.display = visible ? "block" : "none";
    }

    // Aggiunge evento di click a ogni card per espandere/chiudere
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

                // Ripristina il testo originale specifico per ciascuna card
                const description = card.querySelector("span");
                description.textContent = initialDescriptions[index]; // Usa la descrizione iniziale specifica

                // Mostra il body text quando tutte le card sono chiuse
                if (![...cards].some(c => c.classList.contains("expanded"))) {
                    toggleBodyText(true);
                }
            } else {
                // Chiude tutte le altre card e apre quella selezionata
                cards.forEach((c, i) => {
                    c.classList.remove("expanded");
                    const productList = c.querySelector(".product-list");
                    const bookingButton = c.querySelector(".booking-button");
                    if (productList) productList.remove();
                    if (bookingButton) bookingButton.remove();

                    // Ripristina il testo originale specifico per ogni card
                    const description = c.querySelector("span");
                    description.textContent = initialDescriptions[i]; // Usa la descrizione iniziale specifica
                });

                // Nasconde il body text e aggiunge l'espansione alla card selezionata
                toggleBodyText(false);
                card.classList.add("expanded");

                // Cambia il contenuto del testo con una lista di prodotti
                const description = card.querySelector("span");
                description.textContent = ""; // Svuota il testo originale

                const productList = document.createElement("ul");
                productList.classList.add("product-list");

                // Lista dei prodotti specifici per ciascuna card
                let products;
                let buttonText;

                // Definisce i prodotti e il testo del pulsante in base alla card
                switch(index) {
                    case 0:
                        products = ["Bottiglia di Vino", "Tarallucci", "Formaggio Pecorino", "Salame", "Mozzarella di Bufala", "Prosciutto", "Ciambelline al Vino", "---", "a partire da 60€"];
                        buttonText = "Richiedilo ora!";
                        break;
                    case 1:
                        products = ["Al momento della prenotazione comporrete insieme allo Chef un Menu su misura per voi!", "---", "90€ a persona"];
                        buttonText = "Prenota ora!";
                        break;
                    case 2:
                        products = ["Selezione di salumi", "Parmiggiano Reggiano", "Mozzarella di Bufala", "Pizza Bianca", "Mix di Bruschette", "Fritti Romani", "Prosecco/Champagne", "---", "60€ a persona"];
                        buttonText = "Prenota ora!";
                        break;
                    case 3:
                        products = ["Ti accompagneremo in una passeggiata nei magici vicoli di Roma per scoprire i suoi piatti tipici", "---", "40€ a persona"];
                        buttonText = "Prenota ora!";
                        break;
                }

                // Crea gli elementi della lista dei prodotti
                products.forEach(product => {
                    const listItem = document.createElement("li");
                    listItem.textContent = product;
                    productList.appendChild(listItem);
                });

                // Aggiunge la lista di prodotti sotto il testo
                description.appendChild(productList);

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
