const dropContainer = document.getElementById("drop-container");
let currentDraggedElement = null,
    offsetX = 0,
    offsetY = 0;

function dragElement(e) {
    if (dropContainer.contains(e.target)) {
        // Calculate the mouse offset from the element's top-left corner
        offsetX = e.clientX - e.target.getBoundingClientRect().left;
        offsetY = e.clientY - e.target.getBoundingClientRect().top;

        // Set the currently dragged element
        currentDraggedElement = e.target;
    }
}

function moveElement(e) {
    if (currentDraggedElement === e.target) {
        // Calculate the new position within the drop container
        const x = e.clientX - offsetX - dropContainer.getBoundingClientRect().left;
        const y = e.clientY - offsetY - dropContainer.getBoundingClientRect().top;

        // Update the element's position
        e.target.style.left = x + 'px';
        e.target.style.top = y + 'px';
    }
}

function releaseElement() {
    currentDraggedElement = null;
}