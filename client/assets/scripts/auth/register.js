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
        const registerResponse = await fetch(`${API_URL}/user/register.php`, {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(dataObj)
        });
        const responseData = await registerResponse.json();
        if(!registerResponse.ok) {
            throw responseData;
        }
        localStorage.setItem("token", responseData.data.token);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.log(error.msg);
    }
}
