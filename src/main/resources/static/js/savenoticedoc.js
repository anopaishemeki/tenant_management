function saveNoticeDocuments(){
    var file = $('#fileUploadForm')[0];
    var data = new FormData(file);

    var n = document.getElementById("file")

    if(n.value.toString().length==0){
        alert("Notice File Not Uploaded!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    
    }
    $("#btnSubmit").prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/v1/uploadNotice",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {

            var r=document.getElementById("retry");
            r.setAttribute("style","display:none");
            console.log("SUCCESS : ", data);
            $("#btnSubmit").prop("disabled", false);
            alert('Document Saved Successfully ', 'success')



        },
        error: function (e) {
            if(e.status.toString()=="200"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:none");
                alert("Document  Saved Successfully ", 'success');
                console.log("ERROR : ", e);

            }else if(e.status.toString()=="500"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:all");
                alert(e.responseJSON.message, 'danger');
                $("#btnSubmit").prop("disabled", false);
                console.log("Date :",document.getElementById("startDate").value)
                console.log("ERROR : ", e);

            }else{

                var r=document.getElementById("retry");
                r.setAttribute("style","display:all");
                console.log("ERROR : ", e);
                alert(e.message, 'success');
                $("#btnSubmit").prop("disabled", false);
            }


        }

    });

}
