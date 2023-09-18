import { API_URL } from "../require.js";

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", submitLoginForm)

async function submitLoginForm(e) {
    e.preventDefault();
    let data = new FormData(this);
    let dataObj = {}
    data.forEach((value, key) => {
        dataObj[key] = value;
    });
    try {
        const loginResponse = await fetch(`${API_URL}/user/login.php`, {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(dataObj)
        })
        const responseData = await loginResponse.json();
        localStorage.setItem("token", responseData.data.token);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.log(error);
    }
}
