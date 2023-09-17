const draggableElement = [
    '<h1 id="heading-1" class="text-6xl font-semibold draggable-element" data-element-name="Heading 1"  data-element-type="typography">Test</h1>',
    '<h2 id="heading-2" class="text-5xl font-semibold draggable-element" data-element-name="Heading 2" data-element-type="typography">Test</h2>',
    '<h3 id="heading-3" class="text-4xl font-semibold draggable-element" data-element-name="Heading 3" data-element-type="typography">Test</h3>',
    '<h4 id="heading-4" class="text-3xl font-semibold draggable-element" data-element-name="Heading 4" data-element-type="typography">Test</h4>',
    '<h5 id="heading-5" class="text-2xl font-semibold draggable-element" data-element-name="Heading 5" data-element-type="typography">Test</h5>',
    '<h6 id="heading-6" class="text-xl font-semibold draggable-element" data-element-name="Heading 6" data-element-type="typography">Test</h6>',
]

const elementBar = document.getElementById("element-menu");
const parser = new DOMParser();

function appendElements() {
    draggableElement.forEach((element) => {
        let parsedElement = parser.parseFromString(element, "text/html").body.firstChild;
        parsedElement.setAttribute("ondblclick", "editElement(this)")
        parsedElement.setAttribute("onblur", "blurFunc()");

        const elementBox = document.createElement("div");
        elementBox.className = "border-2 border-black p-2 cursor-grab";
        elementBox.draggable = true;
        elementBox.setAttribute("ondragstart", "drag(event)");
        elementBox.setAttribute("onmousedown", "addElementOnTouch(this)");
        elementBox.innerText = parsedElement.dataset.elementName;
        elementBox.append(parsedElement);
        elementBar.insertAdjacentElement("beforeend", elementBox);
    });
}


window.addEventListener("load", () => {
    appendElements();
});