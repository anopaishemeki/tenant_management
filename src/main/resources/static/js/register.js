/*
$('document').ready(function () {
    var p1=document.getElementById("password");
    var p2=document.getElementById("password2");

    function validate() {
        if (p1.value!=p2.value){
            p2.setCustomValidity("Passwords do no match");
        }else{
            p2.setCustomValidity("");
        }
    }
    p1.onchange=validate;
    p2.onkeyup=validate;
});
*/

var p1=document.getElementById("password");
var p2=document.getElementById("password2");

function validate() {
    if (p1.value!=p2.value){
        p2.setCustomValidity("Passwords do no match");
    }else{
        p2.setCustomValidity("");
    }
}
if(p1){
    p1.onchange=validate;
}
if(p2){
    p2.onkeyup=validate;
}




function getImageProfile() {
    var username=document.getElementById("Uname").innerText.trim() ;

    console.log("wth innter text uname =",username);

    $.ajax({
        url: '/api/v1/lease/getUser/' + username,
        type: 'GET',
        success: function (response) {
            console.log(response);

            var profileImage=document.getElementById("profileImage");
            /* var profileName=document.getElementById("profileName");
             profileName.setAttribute("th:href","@{/userEdit/"+response.username +"}");*/
            if(response.photo==null){
                profileImage.setAttribute("src","https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png");

                // th:href ="${#authentication.getPrincipal().getUsername()}}"
            }else{
                profileImage.setAttribute("src","/uploads/Profiles/"+response.photo);
            }
        }

    })
}