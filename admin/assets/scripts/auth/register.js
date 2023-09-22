import { API_URL } from "../require.js";

const loginForm = document.getElementById("registerform");
loginForm.addEventListener("submit", submitLoginForm)

async function submitLoginForm(e) {
    e.preventDefault();
    let data = new FormData(this);
    let dataObj = {}
    data.forEach((value, key) => {
        dataObj[key] = value;
    });

    try {
        const loginResponse = await fetch(`${API_URL}/user/register.php`, {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(dataObj)
        });
        const responseData = await loginResponse.json();
        if (!loginResponse.ok) {
            throw responseData;
        }
        location.href = "dashboard.html";
    } catch (error) {
        if (error.status === 401) {
            location.href = "login.html";
            localStorage.removeItem("token");
        }
        console.log(error.msg);
    }
}
