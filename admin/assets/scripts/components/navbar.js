function appendNavbar() {
    //navbar
    let nav = document.createElement('header');
    nav.id = "navbar";

    //logo
    let logo = document.createElement('a');
    logo.href = "/tempzone/admin/dashboard.html";
    logo.innerText = "TempZone Admin";
    // logo.className = "text-2xl font-semibold";

    // //profile and dark mode div
    // let rightDiv = document.createElement('div');
    // rightDiv.className = "right-div";

    // //Create new template button
    // let createNewButton = document.createElement('button');
    // createNewButton.id = "create-new-btn"
    // createNewButton.innerText = "Create New"
    // // createNewButton.className = "outline outline-2 px-2 py-1"
    // createNewButton.setAttribute("onclick", "openTempDialog()");

    //profile
    let logoutBtn = document.createElement('img');
    logoutBtn.src = "assets/icons/logout.svg";
    logoutBtn.setAttribute("onclick", "logout()")

    // rightDiv.append(createNewButton, logoutBtn);
    nav.append(logo, logoutBtn);

    document.getElementById("container").insertAdjacentElement("afterbegin", nav);
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/tempzone/admin/login.html";
}

window.addEventListener("load", () => {
    appendNavbar();
});
