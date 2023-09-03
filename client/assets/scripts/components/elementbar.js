const ELEMENTS = [
    <h1 class="text-6xl font-semibold" contenteditable="">Test</h1>,
    <h2 class="text-5xl font-semibold" contenteditable="">Test</h2>,
    <h3 class="text-4xl font-semibold" contenteditable="">Test</h3>,
    <h4 class="text-3xl font-semibold" contenteditable="">Test</h4>,
    <h5 class="text-2xl font-semibold" contenteditable="">Test</h5>,
    <h6 class="text-xl font-semibold" contenteditable="">Test</h6>,
]

$(function () {
    let elembar = document.createElement('aside');
    elembar.className = "fixed overflow-auto w-[300px] bg-red-100 h-[calc(100vh-48px)] p-3";

    let elemList = document.createElement("div");
    elemList.className = "grid grid-col-2 gap-2";
    
    ELEMENTS.forEach((element) => {
        console.log(element, "hello");
    })
});