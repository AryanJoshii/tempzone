import { API_URL,cookie } from "../require.js";

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
        console.log(responseData)
        if (responseData.status == 202) {
            const userData = responseData.data;
            cookie.setCookie("userInfo",responseData.token,2);
            window.location.href = "dashboard.html";
            return true;
        }
        alert(responseData.msg)
    } catch (error) {
        console.log(error);
    }
}
