let selectedElement = null;

function editElement(element) {
    selectedElement = element;
    if (element.dataset.elementType === "typography") {
        element.contentEditable = true;
        element.focus();
    }
}

function blurFunc() {
    if (selectedElement.dataset.elementType === "typography") {
        selectedElement.contentEditable = false;
    }
}