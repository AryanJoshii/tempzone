function appendNavbar() {
    //navbar
    let nav = document.createElement('header');
    nav.id = "navbar";
    // nav.className = "flex justify-between items-center top-0 sticky bg-white px-3 py-3 z-50 border-b-2 border-black"

    //logo
    let logo = document.createElement('a');
    logo.href = "/client/dashboard.html";
    logo.innerText = "TempZone";
    logo.className = "text-2xl font-semibold";

    //profile and dark mode div
    let rightDiv = document.createElement('div');
    rightDiv.className = "flex items-center gap-5";

    //Create new template button
    let createNewButton = document.createElement('button');
    createNewButton.id = "create-new-btn"
    createNewButton.innerText = "Create New"
    createNewButton.className = "outline outline-2 px-2 py-1"
    createNewButton.setAttribute("onclick", "openTempDialog()");

    //profile
    let profile = document.createElement('div');
    profile.className = "rounded-full w-8 h-8 bg-black";

    rightDiv.append(createNewButton, profile);
    nav.append(logo, rightDiv);

    document.getElementById("container").insertAdjacentElement("afterbegin", nav);
}

window.addEventListener("load", () => {
    appendNavbar();
});
