const routes = [
    {
        name: "Home",
        icon: "assets/icons/home.svg",
        link: "/tempzone/admin/dashboard.html"
    },
    {
        name: "Users",
        icon: "assets/icons/users.svg",
        link: "/tempzone/admin/users.html"
    },
    {
        name: "Templates",
        icon: "assets/icons/templates.svg",
        link: "/tempzone/admin/templates.html"
    }
]

function appendSidebar() {
    const navbar = document.getElementById("navbar");
    let sidebar = document.createElement('aside');
    sidebar.id = "sidebar"

    if (document.body.contains(navbar)) {
        navbar.after(sidebar);
    } else {
        document.getElementById("container").insertAdjacentElement("afterbegin", sidebar);
    }
}

function appendNavLinks() {
    routes.forEach(route => {
        let link = document.createElement("a");
        link.href = route.link;
        link.className = "nav-link";

        let linkIcon = document.createElement('img');
        linkIcon.src = route.icon;

        let linkName = document.createElement('span');
        linkName.innerText = route.name;

        link.append(linkIcon, linkName);
        document.getElementById("sidebar").append(link);
    })
}

window.addEventListener("load", () => {
    appendSidebar();
    appendNavLinks();
})