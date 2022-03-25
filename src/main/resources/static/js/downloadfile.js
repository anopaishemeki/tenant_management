function setLocalfile(id){
     // var file=document.getElementById("formName2").innerText;

     localStorage.removeItem("id");

     localStorage.setItem("id", JSON.stringify(id));


 }
function setLocalfiles(application_letter,article,bank_statement,cr6_form,cr14_form,director_id,tax_clearance,vat_reg,certificate_of_incorporation){
     // var file=document.getElementById("formName2").innerText;

     localStorage.removeItem("application_letter");
     localStorage.setItem("application_letter", JSON.stringify(application_letter));
 localStorage.removeItem("article");
     localStorage.setItem("article", JSON.stringify(article));
 localStorage.removeItem("bank_statement");
     localStorage.setItem("bank_statement", JSON.stringify(bank_statement));
 localStorage.removeItem("cr6_form");
     localStorage.setItem("cr6_form", JSON.stringify(cr6_form));
 localStorage.removeItem("cr14_form");
     localStorage.setItem("cr14_form", JSON.stringify(cr14_form));
 localStorage.removeItem("director_id");
     localStorage.setItem("director_id", JSON.stringify(director_id));
 localStorage.removeItem("tax_clearance");
     localStorage.setItem("tax_clearance", JSON.stringify(tax_clearance));
 localStorage.removeItem("vat_reg");
     localStorage.setItem("vat_reg", JSON.stringify(vat_reg));
 localStorage.removeItem("certificate_of_incorporation");
     localStorage.setItem("certificate_of_incorporation", JSON.stringify(certificate_of_incorporation));
 }

function loadfile(){
var id = JSON.parse(localStorage.getItem("tenantId"));
 $.ajax({
        url: 'http://localhost:8090/api/tenant/fetchfile/' + id ,
        type: 'GET',
        success: function (response) {
        console.log(response)
        setLocalfiles(response[0].application_letter,response[0].article,response[0].bank_statement,response[0].cr6_form,response[0].cr14_form,response[0].director_id,response[0].tax_clearance,response[0].vat_reg,response[0].certificate_of_incorporation)
        }
    })

   /* var filename = JSON.parse(localStorage.getItem("application_letter"));
    var filename2=filename.split("'")[1];

    var id = JSON.parse(localStorage.getItem("id"));

    console.log(filename2);
    console.log(id)*/
   /* $("#btn").prop("disabled", true);
    $.ajax({
        url: 'http://localhost:8090/api/tenant/downloadFile' + id + "/" + fileName2,
        type: 'GET',
        success: function (response) {

            var h=filename.split(".").pop();
            console.log("Extension: = ",h);
            console.log(response);

            if(h=="jpg"|| h=="png"||h=="jpeg"||h=="pdf"||h=="txt"){
                window.open('http://localhost:8090/assets/uploads/'+ id + "/"+ filename2,"_blank");
            }

        }
    })*/
}
function downloadFile(type){

    var application_letter = JSON.parse(localStorage.getItem("application_letter"));
    var article_of_association= JSON.parse(localStorage.getItem("article"));
    var bank_statement = JSON.parse(localStorage.getItem("bank_statement"));
    var cr6_form= JSON.parse(localStorage.getItem("cr6_form"));
     var cr14_form = JSON.parse(localStorage.getItem("cr14_form"));
     var director_id= JSON.parse(localStorage.getItem("director_id"));
     var tax_clearance = JSON.parse(localStorage.getItem("tax_clearance"));
       var vat_reg= JSON.parse(localStorage.getItem("vat_reg"));
    var certificate_of_incorporation = JSON.parse(localStorage.getItem("certificate_of_incorporation"));


    var id = JSON.parse(localStorage.getItem("tenantId"));

      if(type=="application_letter"){
       $.ajax({
              url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + application_letter,
              type: 'GET',
              success: function (response) {
             var h=application_letter.split(".").pop();
            console.log("Extension: = ",h);
            console.log(response);

            if(h=="jpg"|| h=="png"||h=="jpeg"){
                window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ application_letter,"_blank");
            }
              }
          })
      }
       if(type=="article_of_association"){
       $.ajax({
              url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + article_of_association,
              type: 'GET',
              success: function (response) {
             var h=article_of_association.split(".").pop();
            console.log("Extension: = ",h);
            console.!log(response);

            if(h=="jpg"|| h=="png"||h=="jpeg"){
                window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ article_of_association,"_blank");
            }
              }
          })
      }
          if(type=="cr14_form"){
             $.ajax({
                    url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + cr14_form,
                    type: 'GET',
                    success: function (response) {
                   var h=cr14_form.split(".").pop();
                  console.log("Extension: = ",h);
                  console.log(response);

                  if(h=="jpg"|| h=="png"||h=="jpeg"){
                      window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ cr14_form,"_blank");
                  }
                    }
                })
            }
             if(type=="cr6_form"){
             $.ajax({
                    url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + cr6_form,
                    type: 'GET',
                    success: function (response) {
                   var h=cr6_form.split(".").pop();
                  console.log("Extension: = ",h);
                  console.!log(response);

                  if(h=="jpg"|| h=="png"||h=="jpeg"){
                      window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ cr6_form,"_blank");
                  }
                    }
                })
            }
                if(type=="bank"){
                   $.ajax({
                          url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + bank_statement,
                          type: 'GET',
                          success: function (response) {
                         var h=bank_statement.split(".").pop();
                        console.log("Extension: = ",h);
                        console.log(response);

                        if(h=="jpg"|| h=="png"||h=="jpeg"){
                            window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ bank_statement,"_blank");
                        }
                          }
                      })
                  }
                   if(type=="director"){
                   $.ajax({
                          url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + director_id,
                          type: 'GET',
                          success: function (response) {
                         var h=director_id.split(".").pop();
                        console.log("Extension: = ",h);
                        console.!log(response);

                        if(h=="jpg"|| h=="png"||h=="jpeg"){
                            window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ director_id,"_blank");
                        }
                          }
                      })
                  }
                      if(type=="certificate"){
                         $.ajax({
                                url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + certificate_of_incorporation,
                                type: 'GET',
                                success: function (response) {
                               var h=certificate_of_incorporation.split(".").pop();
                              console.log("Extension: = ",h);
                              console.log(response);

                              if(h=="jpg"|| h=="png"||h=="jpeg"){
                                  window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ certificate_of_incorporation,"_blank");
                              }
                                }
                            })
                        }
                         if(type=="tax_clear"){
                         $.ajax({
                                url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + tax_clearance,
                                type: 'GET',
                                success: function (response) {
                               var h=tax_clearance.split(".").pop();
                              console.log("Extension: = ",h);
                              console.!log(response);

                              if(h=="jpg"|| h=="png"||h=="jpeg"){
                                  window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ tax_clearance,"_blank");
                              }
                                }
                            })
                        }
                        if(type=="vat_reg"){
                          $.ajax({
                                url: 'http://localhost:8090/api/tenant/downloadFile/' + id + "/" + vat_reg,
                                type: 'GET',
                                success: function (response) {
                                var h=vat_reg.split(".").pop();
                                console.log("Extension: = ",h);
                                console.!log(response);

                                if(h=="jpg"|| h=="png"||h=="jpeg"){
                                   window.open('http://localhost:8090/assets/uploads/Tenant'+ id + "/"+ vat_reg,"_blank");
                                    }
                                }
                          })
                        }
}

