import { API_URL } from "../require.js";

console.log(API_URL);

const loginForm = document.getElementById("registerform");
loginForm.addEventListener("submit", submitLoginForm)

async function submitLoginForm(e) {
    e.preventDefault();
    let data = new FormData(this);
    let dataObj = {}
    data.forEach((value, key) => {
        dataObj[key] = value;
    });

    console.log(dataObj);

    try {
        const loginResponse = await fetch(`${API_URL}/user/register.php`, {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(dataObj)
        })
        console.log(loginResponse);
    } catch (error) {
        console.log(error);
    }
}
