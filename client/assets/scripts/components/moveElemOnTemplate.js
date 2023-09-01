$(function () {
    const dragElements = document.querySelectorAll(".absolute");
    const dropContainer = document.getElementById("drop-container");

    let isDragging = false;
    let currentElement = null;
    let initialX, initialY;

    dragElements.forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            console.log(e);
            isDragging = true;
            currentElement = element;
            initialX = e.clientX - currentElement.getBoundingClientRect().left;
            initialY = e.clientY - currentElement.getBoundingClientRect().top;
        });

        element.addEventListener("mouseup", () => {
            isDragging = false;
            currentElement = null;
        });
    });

    dropContainer.addEventListener("mousemove", (e) => {
        if (!isDragging || !currentElement) return;
        const x = e.clientX - dropContainer.getBoundingClientRect().left - initialX;
        const y = e.clientY - dropContainer.getBoundingClientRect().top - initialY;
        currentElement.style.left = x + "px";
        currentElement.style.top = y + "px";
    });

    dropContainer.addEventListener("mouseup", () => {
        isDragging = false;
        currentElement = null;
    });
});