document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".carousel .card");
    const carousel = document.querySelector(".carousel");

    // Funzione per espandere la card cliccata
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            // Rimuove la classe 'expanded' da tutte le altre card
            cards.forEach((c) => c.classList.remove("expanded"));
            
            // Aggiunge la classe 'expanded' solo alla card cliccata
            card.classList.add("expanded");
        });
    });

    // Codice per lo scroll del carosello
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const firstCardWidth = cards[0].offsetWidth;
    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => { 
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false; 
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
        if (window.innerWidth < 800) return;
        const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
        if (carousel.scrollLeft >= maxScrollLeft) return;
        timeoutId = setTimeout(() => 
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", autoPlay);

    // Eventi per i pulsanti laterali
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        });
    });
});
