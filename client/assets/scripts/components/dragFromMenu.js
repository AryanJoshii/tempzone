$(function () {
    const dragElements = document.querySelectorAll("#elements");
    const dropContainer = document.getElementById("drop-container");

    let draggedElement = null;

    dragElements.forEach((element) => {
        element.addEventListener("dragstart", function (e) {
            draggedElement = e.target;
        });
    });

    dropContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    dropContainer.addEventListener("drop", function (e) {
        e.preventDefault();
        if (draggedElement) {
            const droppedItem = draggedElement.cloneNode(true);
            droppedItem.classList.add("absolute");

            const x = e.clientX - dropContainer.getBoundingClientRect().left;
            const y = e.clientY - dropContainer.getBoundingClientRect().top;

            droppedItem.style.left = x - droppedItem.offsetWidth / 2 + "px";
            droppedItem.style.top = y - droppedItem.offsetHeight / 2 + "px";

            dropContainer.appendChild(droppedItem);
            draggedElement = null;
        }
    });
})