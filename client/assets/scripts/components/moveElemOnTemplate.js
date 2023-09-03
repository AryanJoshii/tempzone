$(function () {
    const absoluteElements = document.querySelectorAll(".absolute");
    console.log(absoluteElements);
    const dropContainer = document.getElementById("drop-container");

    let isDragging = false;
    let currentElement = null;
    let initialX, initialY, offsetX, offsetY;

    absoluteElements.forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            console.log(e);
            isDragging = true;
            currentElement = element;
            initialX = e.clientX;
            initialY = e.clientY;
            offsetX = currentElement.getBoundingClientRect().left - dropContainer.getBoundingClientRect().left;
            offsetY = currentElement.getBoundingClientRect().top - dropContainer.getBoundingClientRect().top;
        });
    });

    dropContainer.addEventListener("mousemove", (e) => {
        if (!isDragging || !currentElement) return;
        const x = e.clientX - initialX + offsetX;
        const y = e.clientY - initialY + offsetY;
        currentElement.style.left = x + "px";
        currentElement.style.top = y + "px";
    });

    dropContainer.addEventListener("mouseup", () => {
        isDragging = false;
        currentElement = null;
    });
});