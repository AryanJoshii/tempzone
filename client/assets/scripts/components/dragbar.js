const draggableElement = [
    '<h1 id="heading-1" tabindex="0" class="text-6xl font-semibold draggable-element" data-element-name="Heading 1"  data-element-type="typography">Test</h1>',
    '<h2 id="heading-2" tabindex="0" class="text-5xl font-semibold draggable-element" data-element-name="Heading 2" data-element-type="typography">Test</h2>',
    '<h3 id="heading-3" tabindex="0" class="text-4xl font-semibold draggable-element" data-element-name="Heading 3" data-element-type="typography">Test</h3>',
    '<h4 id="heading-4" tabindex="0" class="text-3xl font-semibold draggable-element" data-element-name="Heading 4" data-element-type="typography">Test</h4>',
    '<h5 id="heading-5" tabindex="0" class="text-2xl font-semibold draggable-element" data-element-name="Heading 5" data-element-type="typography">Test</h5>',
    '<h6 id="heading-6" tabindex="0" class="text-xl font-semibold draggable-element" data-element-name="Heading 6" data-element-type="typography">Test</h6>',
    '<p id="subtitle" tabindex="0" class="text-lg draggable-element" data-element-name="Subtitle" data-element-type="typography">Lorem.</p>',
    '<p id="paragraph" tabindex="0" class="draggable-element" data-element-name="Paragraph" data-element-type="typography">Lorem ipsum dolor sit amet.</p>',
    '<ul id="list-disc" tabindex="0" class="list-disc draggable-element" data-element-name="List (Disc)" data-element-type="typography"><li style="pointer-events: none;">hello</li></ul>',
    '<ul id="list-number" tabindex="0" class="list-decimal draggable-element" data-element-name="List (Number)" data-element-type="typography"><li style="pointer-events: none;">hello</li></ul>',
    // '<label id="picture" class="inline-block"><div class= "outline outline-1 rounded-md flex justify-center items-center"><img src="assets/icons/camera.svg" width="192" height="192" alt="" srcset=""></div><input type="file" hidden accept="image/png, image/gif, image/jpeg" name="upload_btn" id=""></label>'
]

const elementBar = document.getElementById("element-menu");
const parser = new DOMParser();

function appendElements() {
    draggableElement.forEach((element) => {
        let parsedElement = parser.parseFromString(element, "text/html").body.firstChild;
        parsedElement.setAttribute("ondblclick", "editElement(this)");
        parsedElement.setAttribute("onclick", "selectElement(this)");
        parsedElement.setAttribute("onblur", "blurFunc()");

        const elementBox = document.createElement("div");
        elementBox.className = "element-box";
        elementBox.draggable = true;
        elementBox.setAttribute("ondragstart", "drag(event)");
        elementBox.setAttribute("ontouchstart", "addElementOnTouch(this)");
        elementBox.innerText = parsedElement.dataset.elementName;
        elementBox.append(parsedElement);
        elementBar.insertAdjacentElement("beforeend", elementBox);
    });
}


window.addEventListener("load", () => {
    appendElements();
});