document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const dotsContainer = document.querySelector(".dots");
    const cards = document.querySelectorAll(".carousel .card");
    const bodyText = document.querySelector(".body-text");

    // Descrizioni iniziali per ciascuna card
    const initialDescriptions = [
        "Enjoy your holiday with our delicious Roman delicacies!",
        "Your authentically Italian evening with us!",
        "Prepareremo un aperitivo in stile Italiano direttamente a casa vostra!",
        "Get ready to tour the city with the best food Rome has to offer!"
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
                const bookingButton = card.querySelector(".styled-button"); // Riferimento al pulsante con la classe

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
                    const bookingButton = c.querySelector(".styled-button");
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
                        products = [ "Bottle of wine form our Region", "Tarallucci", "Pecorino Cheese", "Green Aperitif Olives", "Selection of hams", "Selection of salamis", "Buffalo mozzarella", "white pizza", "wine donuts", "---", "Da 105€"];
                        buttonText = "Reserve Your Box!";
                        break;
                    case 1:
                        products = ["We will prepare a Roman dinner with dishes that represent our history, the deepest anecdotes in an unforgettable culinary journey. Look at our genuine menu proposal or write us and we will create a tailor-made expirience for you!", "---", "Roman Panzanella", "Supplì and courgette flowers" , "Tasting of pasta Carbonara and pasta Cacio e Pepe" , "Testing of Roman tripe" , "Testing of Saltimbocca alla Romana", "Tiramisù", "Tozzetti and Vinosanto","---", "Price per person: 95€"];
                        buttonText = "Reserve it!";
                        break;
                    case 2:
                        products = ["Choose our aperitif designed specifically to let you savor our most authentic products with the complicity of mind-bogggling cocktails", "---" ,"Selection of cured meats", "Parmiggiano Reggiano", "Buffalo Mozzarella", "White Pizza", "Bruschetta mix", "Typical Roman fried foods", "Bubbles", "Cocktails to be agreed together" , "---", "Price per person: 65€"];
                        buttonText = "Reserve Your Aperitif!";
                        break;
                    case 3:
                        products = ["Our local guide will lead you through the most authenic alleys to taste the delicicacies of the oldest bakeries, the most prestigious delicatessens and wine bars offering the best natural wines ever", "---", "Estimated tour time: 3.5 hours", "---", "Price per person: 110€ ",];
                        buttonText = "Reserve Your Tour!";
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

                // Crea il pulsante di prenotazione con testo e stile specifico
                const bookingButton = document.createElement("button");
                bookingButton.type = "button";
                bookingButton.textContent = buttonText;
                bookingButton.classList.add("styled-button");

                // Imposta l'azione del pulsante in base all'indice
                switch (index) {
                    case 0:
                        bookingButton.onclick = () => window.location.href = "checkoutbox.html";
                        break;
                    case 1:
                        bookingButton.onclick = () => window.location.href = "checkoutchef.html";
                        break;
                    case 2:
                        bookingButton.onclick = () => window.location.href = "checkoutaperitivo.html";
                        break;
                    case 3:
                        bookingButton.onclick = () => window.location.href = "checkoutfoodtour.html";
                        break;
                }

                // Inserisci il pulsante di prenotazione sotto il contenuto del testo `span`
                description.insertAdjacentElement("afterend", bookingButton);
            }
            // Aggiorna i pallini attivi in base all'indice della card cliccata
            updateDots(index);
        });
    });

    // Scorrimento del carosello per aggiornare i pallini in base alla posizione
    carousel.addEventListener("scroll", () => {
        const cardWidth = cards[0].offsetWidth + 16;
        const newIndex = Math.round(carousel.scrollLeft / cardWidth);
        updateDots(newIndex);
    });
});
