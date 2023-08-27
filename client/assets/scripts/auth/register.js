$(function () {
    $("#registerform").on("submit", (e) => {
        e.preventDefault();
        let data = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
        var baseUrl = window.tempzone.baseurl; 
        var url = baseUrl +"/tempzone/server/api/user.php?exist";
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response){
                if(response.response == "not-exist"){
                    alert("user registered successfully !")
                }
                if(response.response == "exist"){
                    alert("username is exist try another one!")
                }
            },
            error:function(){
                alert("Oops, something went wrong. Please try agian later.")
            }
        });
    })
})