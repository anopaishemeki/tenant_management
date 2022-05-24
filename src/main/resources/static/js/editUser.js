 var loadFile = function (event) {



     var image = document.getElementById("output");
     image.src = URL.createObjectURL(event.target.files[0]);

     var file = $('#fileUploadForm')[0];
     var data = new FormData(file);
     var username = JSON.parse(localStorage.getItem("username"));

     $.ajax({
         type: "POST",
         enctype: 'multipart/form-data',
         url: "/editProfileImage/"+username,
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         timeout: 600000,
         success: function () {
             console.log("SUCCESS file upload");
             window.location.reload();

         }
     })




};



function showPass(){
    var passDiv=document.getElementById("changePasswords");

    passDiv.setAttribute("style","padding: 40px; display: all;");
}

function setName(){
    var username=document.getElementById("Uname").innerText.trim() ;
    setNametoLocal(username)

}
function  setNametoLocal(username) {
    localStorage.removeItem("username");
    localStorage.setItem("username", JSON.stringify(username));
}
function getProfile(){
    var username = JSON.parse(localStorage.getItem("username"));
    $.ajax({
        url: '/api/v1/lease/getUser/' +username,
        type: 'GET',
        success: function (response) {

          console.log("user info",response)
            var profileImage=document.getElementById("output");
            var profileImage2=document.getElementById("profileImage");
           
            if(response.photo==null){
                profileImage.setAttribute("src","https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png");
                profileImage2.setAttribute("src","https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png");

               // th:href ="${#authentication.getPrincipal().getUsername()}}"
            }else{
                profileImage2.setAttribute("src","/uploads/Profiles/"+response.photo);

                profileImage.setAttribute("src","/uploads/Profiles/"+response.photo);
            }


            
           
            
            
            

            var username=document.getElementById("Username");
            username.value=response.username;

             var firstName=document.getElementById("FirstName");
            firstName.value=response.firstname;

             var LastName=document.getElementById("LastName");
            LastName.value=response.lastname;



             var phone=document.getElementById("phone");
            phone.value=response.phone;


             var email=document.getElementById("email");
            email.value=response.email;


            
        }
    })
}


function SavePass(){
var old= document.getElementById("oldPass");
var newpass= document.getElementById("newPass");
var newPass2= document.getElementById("newPass2");

    old.setAttribute("style","");
    newpass.setAttribute("style","");
    newPass2.setAttribute("style","");




    if (old.value.toString().trim()===""){
        old.setAttribute("style","border: 1px solid red;");
        return;
    }
    if (newpass.value.toString().trim()===""){
        newpass.setAttribute("style","border: 1px solid red;");
        return;
    }
    if (newPass2.value.toString().trim()===""){
        newPass2.setAttribute("style","border: 1px solid red;");
        return;
    }




    var username = JSON.parse(localStorage.getItem("username"));



 if(newpass.value!=newPass2.value){
     console.log("password not same")
     var passmatch=document.getElementById("mismatch");
     passmatch.setAttribute("style","color: red;display: all");
     $('#exampleModal').modal('hide');
 }else{

     var passmatch=document.getElementById("mismatch");
     passmatch.setAttribute("style","color: red;display: none");

     var y = document.getElementById("ldID");
     if (y) {
         y.setAttribute("style", "display:all");
     }
     var h = document.getElementById("err");
     if (h) {

         h.innerHTML = ''
     }
     let ar = document.getElementById("retry");
     ar.setAttribute("style", "display:none");

     let Close3 = document.getElementById("Close3");
     let Close = document.getElementById("Close");
     let Close4 = document.getElementById("Close4");
     let Close5 = document.getElementById("Close5");

     Close3.setAttribute("style", "display:none");
     Close.setAttribute("style", "display:none");
     Close4.setAttribute("style", "display:none");

     $('#exampleModal').modal('show');


     var jsonDataObj = {
         "password": $("#oldPass").val(),
         "newPass":$("#newPass").val()
     };

     $.ajax({
         dataType: "json",
         crossDomain: "true",
         contentType: "application/json; charset=utf-8",
         data: JSON.stringify(jsonDataObj),
         type: "POST",
         url: "/api/v1/lease/comparePass/" + username,
         success: function (response) {
             console.log("Response code : ",response.status);
             console.log("Response  : ",response);
            if(response.status.toString()==="500"){
                var wrongpass=document.getElementById("incorrectpass");
                wrongpass.setAttribute("style","color: red;display: all");
                $('#exampleModal').modal('hide');

            }else if(response.status.toString()==="200"){
                var wrongpass=document.getElementById("incorrectpass");
                wrongpass.setAttribute("style","color: red;display: none");
                alert('Password Changed Successfully !!', 'success')
                Close3.setAttribute("style", "display:all");
                // Close.setAttribute("style", "display:none");
                Close4.setAttribute("style", "display:all");
            }

         },
         error :function(response){
             console.log("Response code : ",response.status);
             console.log("Response  : ",response);
             if(response.status.toString()==="500"){
                 var wrongpass=document.getElementById("incorrectpass");
                 wrongpass.setAttribute("style","color: red;display: all");
                 $('#exampleModal').modal('hide');

             }else if(response.status.toString()==="200"){
                 var wrongpass=document.getElementById("incorrectpass");
                 wrongpass.setAttribute("style","color: red;display: none");
                 alert('Password Changed Successfully !!', 'success');

                 Close3.setAttribute("style", "display:all");
                // Close.setAttribute("style", "display:none");
                 Close5.setAttribute("href", "/logout");
                 Close4.setAttribute("style", "display:all");

             }
         }
     })
 }
}


function upadeProfile() {
    var y = document.getElementById("ldID");
    if (y) {
        y.setAttribute("style", "display:all");
    }
    var h = document.getElementById("err");
    if (h) {

        h.innerHTML = ''
    }
    let ar = document.getElementById("retry");
    ar.setAttribute("style", "display:none");

    let Close3 = document.getElementById("Close3");
    let Close = document.getElementById("Close");

    var username = JSON.parse(localStorage.getItem("username"));
    console.log("Old Username = ",username);
    console.log("New Username = ",$("#Username").val());
    var jsonDataObj = {
        "username": $("#Username").val(),
        "firstname": $("#FirstName").val(),
        "lastname": $("#LastName").val(),
        "phone": $("#phone").val(),
        "email": $("#email").val()
    };



    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonDataObj),
        type: "PUT",
        url: "/updateUser/" + username,


        success: function (response) {
            //console.log(response);

            if(username!=$("#Username").val()){
                Close3.setAttribute("style", "display:all");
                Close.setAttribute("style", "display:none");
                alert('Profile Updated Successfully !!', 'success')
                return;
            }else {
                Close3.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert('Profile Updated Successfully !!', 'success')
                return;
            }
        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {

                if(username!=$("#Username").val()){
                    Close3.setAttribute("style", "display:all");
                    Close.setAttribute("style", "display:none");
                    alert('Profile Updated Successfully !!', 'success')
                    return;
                }else {
                    Close3.setAttribute("style", "display:none");
                    Close.setAttribute("style", "display:all");
                    alert('Profile Updated Successfully !!', 'success')
                    return;
                }
            } else if (e.status.toString() == "500") {

                ar.setAttribute("display", "all");
                Close3.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert("There was an error in Updating record !!", 'danger')
                console.log("ERROR : ", e.responseJSON.message);
                return;
            } else {
                ar.setAttribute("style", "display:all");
                Close.setAttribute("style", "display:all");
                alert(e.responseJSON.message, 'danger')
                console.log("ERROR : ", e);
                return;
            }


        }
    });
}


 var alertPlaceholder = document.getElementById('liveAlertPlaceholder');



 function alert(message, type) {

     var y = document.getElementById("ldID");
     if (y) {
         y.setAttribute("style", "display:none");
     }


     var e = document.getElementById("ldiD");
     if (e) {
         e.setAttribute("style", "display:none");
     }


     var h = document.getElementById("err");
     if (h) {

         h.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

     } else {
         var wrapper = document.createElement('div');
         wrapper.setAttribute("id", "err");
         wrapper.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

         alertPlaceholder.append(wrapper);
     }

 }