function drag(e) {
    e.dataTransfer.clearData();
    e.dataTransfer.setData("id", e.target.children[0].id);
}

function drop(e) {
    const dropContainer = document.getElementById("drop-container");
    const draggedElement = document.getElementById(e.dataTransfer.getData("id")).cloneNode(true);
    // draggedElement.classList.remove("hidden");
    draggedElement.style.display = "block";

    const x = e.clientX - dropContainer.getBoundingClientRect().left;
    const y = e.clientY - dropContainer.getBoundingClientRect().top;

    const left = x - draggedElement.offsetWidth / 2;
    const top = y - draggedElement.offsetHeight / 2;

    draggedElement.style.position = "absolute";
    draggedElement.style.display = "block";
    draggedElement.style.left = left + "px";
    draggedElement.style.top = top + "px";

    dropContainer.appendChild(draggedElement);
}

function allowDrop(e) {
    e.preventDefault();
    if (e.target.getAttribute("draggable") === "true")
        e.dataTransfer.dropEffect = "none";
    else
        e.dataTransfer.dropEffect = "all";
}

function addElementOnTouch(element) {
    const dropContainer = document.getElementById("drop-container");
    const elementToAppend = element.children[0].cloneNode(true);
    
    const containerRect = dropContainer.getBoundingClientRect();
    const elementRect = elementToAppend.getBoundingClientRect();

    // Calculate the center coordinates
    const centerX = containerRect.width / 2 - elementRect.width / 2;
    const centerY = containerRect.height / 2 - elementRect.height / 2;

    // Set the element's position to the center
    elementToAppend.style.position = "absolute";
    elementToAppend.style.display = "block";
    elementToAppend.style.left = `${centerX}px`;
    elementToAppend.style.top = `${centerY}px`;

    dropContainer.appendChild(elementToAppend);
}

// dragElements.forEach((element) => {
//     element.addEventListener("dragstart", function (e) {
//         draggedElement = e.target.children[0];
//     });
// });

// dropContainer.addEventListener("dragover", function (e) {
//     e.preventDefault();
// });

// dropContainer.addEventListener("drop", function (e) {
//     e.preventDefault();
//     if (draggedElement) {
//         const droppedItem = draggedElement.cloneNode(true);

//         const x = e.clientX - dropContainer.getBoundingClientRect().left;
//         const y = e.clientY - dropContainer.getBoundingClientRect().top;

//         droppedItem.style.position = "absolute";
//         droppedItem.style.display = "block"
//         droppedItem.style.left = x - droppedItem.offsetWidth / 2 + "px";
//         droppedItem.style.top = y - droppedItem.offsetHeight / 2 + "px";

//         dropContainer.appendChild(droppedItem);
//         draggedElement = null;
//     }
// });