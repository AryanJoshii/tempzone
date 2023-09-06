const draggableElement = [
    '<h1 id="heading-1" class="text-6xl font-semibold select-none hidden" data-element-name="Heading 1">Test</h1>',
    '<h2 id="heading-2" class="text-5xl font-semibold select-none hidden" data-element-name="Heading 2">Test</h2>',
    '<h3 id="heading-3" class="text-4xl font-semibold select-none hidden" data-element-name="Heading 3">Test</h3>',
    '<h4 id="heading-4" class="text-3xl font-semibold select-none hidden" data-element-name="Heading 4">Test</h4>',
    '<h5 id="heading-5" class="text-2xl font-semibold select-none hidden" data-element-name="Heading 5">Test</h5>',
    '<h6 id="heading-6" class="text-xl font-semibold select-none hidden" data-element-name="Heading 6">Test</h6>',
]

const elementBar = document.getElementById("element-menu");
const parser = new DOMParser();

function appendElements() {
    draggableElement.forEach((element) => {
        let parsedElement = parser.parseFromString(element, "text/html").body.firstChild;
        parsedElement.setAttribute("onmousedown", "dragElement(event)")
        parsedElement.setAttribute("onmousemove", "moveElement(event)")
        parsedElement.setAttribute("onmouseup", "releaseElement(event)")
        parsedElement.setAttribute("ondblclick", "this.contentEditable=true;this.focus()")
        parsedElement.setAttribute("onblur", "this.contentEditable=false;")
        const elementBox = document.createElement("div");
        elementBox.className = "border-2 border-black p-2 cursor-grab";
        elementBox.draggable = true;
        elementBox.setAttribute("ondragstart", "drag(event)")
        elementBox.innerText = parsedElement.dataset.elementName;
        elementBox.append(parsedElement);
        elementBar.insertAdjacentElement("beforeend", elementBox);
    })
}


window.addEventListener("load", () => {
    appendElements();
});