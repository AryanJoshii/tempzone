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

    console.log(dataObj);

    try {
        const loginResponse = await fetch(`${API_URL}/user/login.php`, {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(dataObj)
        })
        console.log(loginResponse.json());
    } catch (error) {
        console.log(error);
    }
}
