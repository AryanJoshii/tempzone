// $(function () {
//     $("#registerform").on("submit", (e) => {
//         e.preventDefault();
//         let data = {
//             username: $("#username").val(),
//             email: $("#email").val(),
//             password: $("#password").val()
//         }
//         var baseUrl = window.tempzone.baseurl; 
//         var url = baseUrl + "/tempzone/server/api/user.php?login";
//         $.ajax({
//             type: "POST",
//             url: url,
//             data: data,
//             success: function(response){
//                 console.log(response)
//                 if(response.verified == "true"){
//                     window.location.replace("index.html");
//                 }else {
//                     alert("The username or password is incorrect !")
//                 }
//             },
//             error:function(){
//                 alert("Oops, something went wrong. Please try agian later.")
//             }
//         });
// export const API_URL = "http://localhost/tempzone"
// // window.tempzone = {};
// // window.tempzone.baseurl = "http://localhost";

import { API_URL } from "../require.js";

console.log(API_URL);

//     })
// })

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
        console.log(loginResponse);
    } catch (error) {
        console.log(error);
    }
}
