let selectedElement = null;

function editElement(element) {
    selectedElement = element;
    if (element.dataset.elementType === "typography") {
        element.contentEditable = true;
        element.focus();
    }
}

function selectElement(element) {
    selectedElement = element;
    element.classList.add("selected-element");
}

function blurFunc() {
    selectedElement.classList.remove("selected-element");
    if (selectedElement && selectedElement.dataset.elementType === "typography") {
        selectedElement.contentEditable = false;
    }
    selectedElement = null;
}

function deleteElement(e) {
    if (e.keyCode === 46) {
        selectedElement.remove();
    }
}

window.addEventListener("keydown", deleteElement)