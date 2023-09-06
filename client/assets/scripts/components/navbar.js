import { elementHeight } from "../utills.js";

function appendNavbar() {
    //navbar
    let nav = document.createElement('header');
    nav.id = "navbar"
    nav.className = "flex justify-between items-center top-0 sticky bg-white px-3 py-3 z-50 border-b-2 border-black"

    //logo
    let logo = document.createElement('h1');
    logo.innerText = "TempZone";
    logo.className = "text-2xl font-semibold";

    //profile and dark mode div
    let rightDiv = document.createElement('div');
    rightDiv.className = "flex items-center gap-5";

    //toggle light-dark mode button
    let toggleBtn = document.createElement('button');
    toggleBtn.id = "sidebarToogle"
    toggleBtn.innerText = "Light"

    //profile
    let profile = document.createElement('div');
    profile.className = "rounded-full w-8 h-8 bg-black";

    rightDiv.append(toggleBtn, profile);
    nav.append(logo, rightDiv);

    document.body.insertAdjacentElement("afterbegin", nav);
}

function calcHeightOfElements() {
    const elemHeight = elementHeight(document.getElementById("navbar"));
    const elementBar = document.getElementById("element-container");
    elementBar.style.height = `calc(100vh - ${elemHeight}px)`
}

window.addEventListener("load", () => {
    appendNavbar();
    calcHeightOfElements();
})