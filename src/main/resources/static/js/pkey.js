//Send Email from notices page
function SendMail(){

    var m1 = document.getElementById("mailSentToast");
    var m2 = document.getElementById("mailNotSentToast");


    m1.setAttribute("style", "display:none");
    m2.setAttribute("style", "display:none");


    var Message=document.getElementById("cont").value;
    var Name = document.getElementById("tName").value;
    var id = document.getElementById("tID").innerText;
    var Subject=document.getElementById("subject").value;
    var email =document.getElementById("T_email").value;

    var tempParams={
        from_name:"New World",
        to_email:email,
        message:Message,
        reply_to:'ninja.ld49@gmail.com',
        to_name:Name

    };
    emailjs.send('gmail','template_rqpdjmc',tempParams)
        .then(function(res){
            console.log("success",res);
            var cont=document.getElementById("mailform");
            var foot=document.getElementById("emailfooter");
            var m1=document.getElementById("mailSentToast");
            var m2=document.getElementById("mailNotSentToast");

            if(res.status.toString()=="200"){
                cont.setAttribute("style","display:none");
                foot.setAttribute("style","display:none");
                m1.setAttribute("style","display:all");
            }
        })
        .catch(function(error){
            console.error("Error  : ",error);
            if(error.status==412){
                var message=document.getElementById("mailunsent");
                if(message){
                    message.innerHTML="Failed , Your Email is Invalid"+" <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
                }
                //  var cont=document.getElementById("mailform");
                // var foot=document.getElementById("emailfooter");
                // var m1=document.getElementById("mailSentToast");
                var m2=document.getElementById("mailNotSentToast");

                // cont.setAttribute("style","display:none");
                //  foot.setAttribute("style","display:none");
                m2.setAttribute("style","display:all");
            }else if(error.status==0){
                var message=document.getElementById("mailunsent");
                if(message){
                    message.innerHTML="Failed , There was a network Error"+" <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
                }
                //  var cont=document.getElementById("mailform");
                // var foot=document.getElementById("emailfooter");
                // var m1=document.getElementById("mailSentToast");
                var m2=document.getElementById("mailNotSentToast");

                // cont.setAttribute("style","display:none");
                //  foot.setAttribute("style","display:none");
                m2.setAttribute("style","display:all");
            }else{

                var message = document.getElementById("mailunsent");
                if (message) {
                    message.innerHTML = "Failed ," + error.text + " <span class='fe fe-12 fe-alert-triangle ml-3' ></span>";
                }
                //  var cont=document.getElementById("mailform");
                // var foot=document.getElementById("emailfooter");
                // var m1 = document.getElementById("mailSentToast");
                var m2 = document.getElementById("mailNotSentToast");

                // cont.setAttribute("style","display:none");
                //  foot.setAttribute("style","display:none");
                m2.setAttribute("style", "display:all");
            }
        })

}
