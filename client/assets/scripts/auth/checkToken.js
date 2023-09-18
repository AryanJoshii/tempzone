const pages = ["/tempzone/client/dashboard.html", "/tempzone/client/explore.html", "/tempzone/client/editor.html"];
const authPages = ["/tempzone/client/login.html", "/tempzone/client/register.html"]

function checkToken() {
    let path = window.location.pathname;
    console.log(path);
    let token = localStorage.getItem("token");

    if (!token && pages.includes(path)) {
        window.location.href = "/tempzone/client/login.html";
    }
    
    if (token && authPages.includes(path)) {
        window.location.href = "/tempzone/client/dashboard.html";
    }
}

checkToken();