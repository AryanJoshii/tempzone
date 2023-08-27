$(function () {
    $("#registerform").on("submit", (e) => {
        e.preventDefault();
        let data = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
    })
})