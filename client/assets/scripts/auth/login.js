$(function () {
    $("#registerform").on("submit", (e) => {
        e.preventDefault();
        let data = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
        var baseUrl = window.tempzone.baseurl; 
        var url = baseUrl + "/tempzone/server/api/user.php?login";
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response){
                if(response.verified == "true"){
                    window.location.replace("index.html");
                }else {
                    alert("The username or password is incorrect !")
                }
            },
            error:function(){
                alert("Oops, something went wrong. Please try agian later.")
            }
        });

    })
})