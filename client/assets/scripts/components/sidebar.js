function appendSidebar() {
    const navbar = document.getElementById("navbar");
    let sidebar = document.createElement('aside');
    sidebar.id = "sidebar"
    sidebar.innerText = "hello this is sidebat"

    if (document.body.contains(navbar)) {
        navbar.after(sidebar);
    } else {
        document.getElementById("container").insertAdjacentElement("afterbegin", sidebar);
    }
}

window.addEventListener("load", () => {
    appendSidebar();
})