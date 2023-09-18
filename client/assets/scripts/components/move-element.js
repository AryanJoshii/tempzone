const dropContainer = document.getElementById("drop-container");
let currentDraggedElement = null;
let offsetX = 0;
let offsetY = 0;

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

dropContainer.addEventListener(events[deviceType].down, holdElement);
dropContainer.addEventListener(events[deviceType].move, moveElement);
dropContainer.addEventListener(events[deviceType].up, releaseElement);

function holdElement(e) {
    if (dropContainer.contains(e.target) && e.target !== dropContainer) {
        const clientX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
        const clientY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
        offsetX = clientX - e.target.getBoundingClientRect().left;
        offsetY = clientY - e.target.getBoundingClientRect().top;

        currentDraggedElement = e.target;

        // // Calculate the mouse offset from the element's top-left corner
        // offsetX = e.clientX - e.target.getBoundingClientRect().left;
        // offsetY = e.clientY - e.target.getBoundingClientRect().top;

        // // Set the currently dragged element
        // currentDraggedElement = e.target;
    }
}

function moveElement(e) {
    if (currentDraggedElement) {
        const clientX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
        const clientY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
        const x = clientX - offsetX - dropContainer.getBoundingClientRect().left;
        const y = clientY - offsetY - dropContainer.getBoundingClientRect().top;


        // // Calculate the new position within the drop container
        // const x = e.clientX - offsetX - dropContainer.getBoundingClientRect().left;
        // const y = e.clientY - offsetY - dropContainer.getBoundingClientRect().top;

        // Update the element's position
        currentDraggedElement.style.left = x + 'px';
        currentDraggedElement.style.top = y + 'px';
    }
}

function releaseElement() {
    currentDraggedElement = null;
}
