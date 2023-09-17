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
        if (responseData.status == 200) {
            const userData = responseData.data;
            window.location.href = "login.html"
        }
        alert(responseData.msg)

    } catch (error) {
        console.log(error);
    }
}
