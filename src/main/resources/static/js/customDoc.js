function saveTenantDocument(){
    var application = $('#fileUploadForm')[0];
    var cr14 = $('#fileUploadForm')[1];
    var cr6 = $('#fileUploadForm')[2];
    var director= $('#fileUploadForm')[3];
    var bank = $('#fileUploadForm')[4];
    var vat = $('#fileUploadForm')[5];
    var tax = $('#fileUploadForm')[6];
    var article = $('#fileUploadForm')[7];
    var certificate_of = $('#fileUploadForm')[8];

    var ajaxData = new FormData(application)
    ajaxData.append(cr14,cr14_form.files[0])
    ajaxData.append(cr6,cr6_form.files[0])
    ajaxData.append(director,director_id.files[0])
    ajaxData.append(bank,bank_statement.files[0])
    ajaxData.append(vat,vat_reg.files[0])
    ajaxData.append(tax,tax_clearance.files[0])
    ajaxData.append(article,article_associ.files[0])
    ajaxData.append(certificate_of,certificate_of_inco.files[0])


    let tenantId = JSON.parse(localStorage.getItem("tenantId"));
    console.log(tenantId)

    ajaxData.append("tenantID",tenantId)


    // var y=document.getElementById("application_letter");

    // if(y.value.toString().length==0){
    //     alert("App File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }
    // var x=document.getElementById("cr6_form");

    // if(x.value.toString().length==0){
    //     alert("Cr6 File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }
    // var m=document.getElementById("director_id");

    // if(m.value.toString().length==0){
    //     alert("d File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }
    // var z=document.getElementById("cr14_form");

    // if(z.value.toString().length==0){
    //     alert("cr File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }

    // var u=document.getElementById("vat_reg");

    // if(u.value.toString().length==0){
    //     alert("var File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");


    //     return
    // }
    // var l=document.getElementById("tax_clearance");

    // if(l.value.toString().length==0){
    //     alert("tax File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }
    // var a=document.getElementById("article_associ");

    // if(a.value.toString().length==0){
    //     alert("art File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }
    // var cert=document.getElementById("certificate_of_inco");

    // if(cert.value.toString().length==0){
    //     alert("cert File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }




    // var data= new FormData(file)

    // var y=document.getElementById("file");

    // if(y.value.toString().length==0){
    //     alert("Notice File Not Uploaded!!","danger");
    //     var r=document.getElementById("retry");
    //     r.setAttribute("style","display:all");

    //     return
    // }

    $("#btnSubmit").prop("disabled", true);
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/api/tenant/uploadtenantDocument",
            data: ajaxData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {
                       $('#successModal').modal('show');
                       console.log(response)

                   },
                   error: function (e) {
                       console.log(e);
                   }
                   $("#fileUploadForm")[0].reset()

               })


}

