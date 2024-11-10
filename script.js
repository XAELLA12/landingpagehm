document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".carousel .card");
    const carousel = document.querySelector(".carousel");
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const cardWidth = cards[0].offsetWidth + 16; // Larghezza di una card + gap

    // Aggiungi evento di click per espandere/chiudere le card
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            // Se la card è già espansa, rimuove la classe 'expanded'
            if (card.classList.contains("expanded")) {
                card.classList.remove("expanded");
            } else {
                // Rimuove la classe 'expanded' da tutte le altre card
                cards.forEach((c) => c.classList.remove("expanded"));
                // Aggiunge la classe 'expanded' solo alla card cliccata
                card.classList.add("expanded");
            }
        });
    });

    // Funzioni per lo scorrimento del carosello
    leftBtn.addEventListener("click", () => {
        carousel.scrollLeft -= cardWidth;
    });

    rightBtn.addEventListener("click", () => {
        carousel.scrollLeft += cardWidth;
    });
});
