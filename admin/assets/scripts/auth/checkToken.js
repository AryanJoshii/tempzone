const pages = [
    "/tempzone/admin/dashboard.html",
    "/tempzone/admin/users.html",
    "/tempzone/admin/templates.html",
    "/tempzone/admin/categories.html",
];
const authPages = ["/tempzone/admin/login.html"]

function checkToken() {
    let path = window.location.pathname;
    let token = localStorage.getItem("token");

    if (!token && pages.includes(path)) {
        window.location.href = "/tempzone/admin/login.html";
    }

    if (token && authPages.includes(path)) {
        window.location.href = "/tempzone/admin/dashboard.html";
    }
}

checkToken();