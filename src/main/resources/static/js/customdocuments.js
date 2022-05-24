
function SetLocal(id) {
    localStorage.removeItem("id");
    localStorage.setItem("id",JSON.stringify(id));


}

//Save document details
function saveDetails() {


    var data = new FormData();

    var s=document.getElementById("companyName");

    if(s.value.toString().length==0){
        alert("Company name is required","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
        }

var p=document.getElementById("addressLine1");

if(p.value.toString().length==0){
    alert("Address Line 1 is required","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var we =document.getElementById("addressLine2");
if(we.value.toString().length==0){
    alert("Address Line2 is Required","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}

var pr=document.getElementById("addressLine3");
if(pr.value.toString().length==0){
    alert(" Address line 3 is Required","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var yp=document.getElementById("debit");

if(yp.value.toString().length==0){
    alert("Debit is Required","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return

}
var ys=document.getElementById("signature");

if(ys.value.toString().length==0){
    alert("Signature is Required!!","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}

var dj = document.getElementById("dueDate");

if(dj.value.toString().length==0){
    alert("Due date is required","danger");
    var r = document.getElementById("retry");
    r.setAttribute("style","display:all");

    return

}

var mc = document.getElementById("expiryDate");

if(mc.value.toString().length==0){
    alert("Expiry Date is Required");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");
}
    var jsonDataObj = {
        "companyName": $("#companyName").val(),
        "addressLine1": $("#addressLine1").val(),
        "addressLine2": $("#addressLine2").val(),
        "addressLine3": $("#addressLine3").val(),
        "debit": $("#debit").val(),
        "signature":$("#signature").val(),
        "dueDate":$("#dueDate").val(),
        "expiryDate":$("#dueDate").val(),
    };
    data.append("jsondata", JSON.stringify(jsonDataObj));
$("#btnSubmit").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/api/v1/expiredDocuments",
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
            alert('Details Save SuccessFully ', 'success')



        },
        error: function (e) {
            if(e.status.toString()=="200"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:none");
                alert("Details  Saved Successfully ", 'success');
                console.log("ERROR : ", e);

            }else if(e.status.toString()=="500"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:all");
                alert(e.responseJSON.message, 'danger');
                $("#btnSubmit").prop("disabled", false);
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
function getDetails() {
    var id = JSON.parse(localStorage.getItem("id"));
    console.log(id);
    $.ajax({
        url: '/api/v1/getexpiredlease'+ id,
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var t_body = document.getElementById("t_body");


            // while (t_body.hasChildNodes()) {
            //     t_body.removeChild(t_body.firstChild);
            // }
            for (let i = 0; i < items.length; i++) {
                let html = `
                <tr>
                <td bgcolor='#FFFFFF' style='text-align:left;' width='100%'>
                  <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                      The Director
                    </p>
                    <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                    ${items[i].companyName}
                    </p>
                    <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                    ${items[i].addressline1}
                    </p>
                    <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                    ${items[i].addressLine2}
                    </p>
                    <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                    ${items[i].addressLine3}
                    </p>
                    <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                      Harare
                    </p>
                  <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px;margin-left:20px; padding:0; font-weight:normal;'>
                    Dear Customer,
                  </p>
                  <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px;margin-left:20px; padding:0; font-weight:normal;'>
                      Your Lease Agreement expired on ${items[i].expiryDate} and has not been renewed because your  Account is in Arrears .It is a condition that all Leases in Arreas shall not be renewed when
                      expired until the Account has been up-dated.<br>
                      <br>We therefore advise you that we are going ahead with the termination.<br><br>
                      Your Account balance is in Arrears to the tune of $${items[i].debit} as of today's date ${items[i].today} ,.   
                      <br><br>
                      You have until Monday ${items[i].dueDate}   to  regularize your Account to facilitate Lease Renewal.
                      <br><br><br>
                      Please be guided accordingly.

                      <br><br><br><br>
                      Thank You

                      <br><br><br><br>
                      <strong>Francis Makuwa</strong>
                      <strong>For New World Property Managers</strong>

                  </p>
                
                </td>
              </tr>`


                let tr = document.createElement("tr");
                if (i % 2 == 0) {
                    tr.setAttribute("class", "even");
                } else {
                    tr.setAttribute("class", "odd");
                }
                tr.setAttribute("role", "row");
                tr.innerHTML = html;

                // tr.setAttribute("onclick", `setPropertyDetails('${items[i].id}'), toggleView('propertyDetailsDiv') `);

                // let htmlSpacer = "<td colspan=\"100\">"
                // let spacer = document.createElement("tr");
                // spacer.className = "spacer";
                //
                // spacer.innerHTML = htmlSpacer;

                // t_body.appendChild(spacer);
                t_body.appendChild(tr);
            }
            
        }
    })
    var body = document.getElementById("body");
    //
    //
    //let st = document.createElement("script");
    //st.setAttribute("src", "js/jquery.dataTables.min.js");
    //body.append(st);
    
      let a = document.createElement("script");
      a.setAttribute("src","js/jquery.min.js");
      body.append(a);
    //
    //
    //  let b = document.createElement("script");
    //  b.setAttribute("src","js/popper.min.js");
    //  body.append(b);
    //
    //  let d= document.createElement("script");
    //  d.setAttribute("src","js/moment.min.js");
    //  body.append(d);
    //
    //  let u= document.createElement("script");
    //  u.setAttribute("src","js/bootstrap.min.js");
    //  body.append(u);
    //
    //  let e= document.createElement("script");
    //  e.setAttribute("src","js/simplebar.min.js");
    //  body.append(e);
    //
    //  let f= document.createElement("script");
    //  f.setAttribute("src","js/jquery.stickOnScroll.js");
    //  body.append(f);
    //
    //  let g= document.createElement("script");
    //  g.setAttribute("src","js/config.js");
    //  body.append(g);
    //
    //  let h= document.createElement("script");
    //  h.setAttribute("src","js/bootstrap.bundle.min.js");
    //  body.append(h);
    //
    //  let j= document.createElement("script");
    //  j.setAttribute("src","js/popper.min.js");
    //  body.append(j);
    //
    //  let k= document.createElement("script");
    //  k.setAttribute("src","js/apps.js");
    //  body.append(k);
    //
    //
    //
    //
    //
    //
    //  let rt=document.createElement("script");
    //  rt.setAttribute("src","js/dataTables.bootstrap4.min.js");
    //  body.append(rt);
    //
    //
    //  let stt = document.createElement("script");
    //  stt.setAttribute("type","text/javascript")
    //  stt.innerText=`$('#dataTable-1').DataTable({autoWidth: true,"lengthMenu": [[16, 32, 64, -1],[16, 32, 64, "All"]]});`
    //  body.append(stt);
    //
    //
    //  console.log(st);
    //  console.log(stt);
    //  console.log(rt);
}

//fetch records

//function FetchDetails() {
//
//    var id = JSON.parse(localStorage.getItem("id"));
//    $.ajax({
//        url: 'http://localhost:61595/api/v1/getexpiredlease/'+ id,
//        type: 'GET',
//        success: function (response) {
//            console.log(response)
//
//
//            let id = document.getElementById("id");
//            let companyName = document.getElementById("companyName");
//            let addressLine1 = document.getElementById("addressLine1");
//            let addressLine2 = document.getElementById("addressLine2");
//            let addressLine3 = document.getElementById("addressLine3");
//            let debit = document.getElementById("debit");
//            let dueDate = document.getElementById("dueDate");
//            let expiryDate = document.getElementById("expiryDate");
//            let signature = document.getElementById("signature");
//            let today = document.getElementById("today");
//
//
//
//            id.innerText = `${response.id}`;
//            companyName.placeholder = `${response.companyName}`;
//            addressLine1.placeholder = `${response.addressLine1}`;
//            addressLine2.placeholder = `${response.addressLine2}`;
//            addressLine3.placeholder = `${response.addressLine3}`;
//            dueDate.placeholder = `${response.dueDate}`;
//            debit.value = `${response.debit}`;
//            expiryDate.placeholder = `${response.expiryDate}`;
//            signature.placeholder =`${response.siganture}`;
//            today.placeholder=`${response.today}`;
//
//            companyName.setAttribute("disabled", true);
//            addressLine1.setAttribute("disabled", true);
//            addressLine2.setAttribute("disabled", true);
//            addressLine3.setAttribute("disabled", true);
//            dueDate.setAttribute("disabled", true);
//            debit.setAttribute("disabled", true);
//            expiryDate.setAttribute("disabled", true);
//            signature.setAttribute("disabled", true);
//            today.setAttribute("disabled", true);
//
//
//
//        }
//    })
//}




//function saveTenantDocuments(){
//
//    var application = $('#fileUploadForm')[0];
//    var cr14 = $('#fileUploadForm')[1];
//    var cr6 = $('#fileUploadForm')[2];
//    var director= $('#fileUploadForm')[3];
//    var bank = $('#fileUploadForm')[4];
//    var vat = $('#fileUploadForm')[5];
//    var tax = $('#fileUploadForm')[6];
//    var article = $('#fileUploadForm')[7];
//    var certificate_of = $('#fileUploadForm')[8];
//
//    var ajaxData = new FormData(application)
//    ajaxData.append(cr14,cr14_form.files[0])
//    ajaxData.append(cr6,cr6_form.files[0])
//    ajaxData.append(director,director_id.files[0])
//    ajaxData.append(bank,bank_statement.files[0])
//    ajaxData.append(vat,vat_reg.files[0])
//    ajaxData.append(tax,tax_clearance.files[0])
//    ajaxData.append(article,article_associ.files[0])
//    ajaxData.append(certificate_of,certificate_of_inco.files[0])
//
//
//
//    // var y=document.getElementById("application_letter");
//
//    // if(y.value.toString().length==0){
//    //     alert("App File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//    // var x=document.getElementById("cr6_form");
//
//    // if(x.value.toString().length==0){
//    //     alert("Cr6 File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//    // var m=document.getElementById("director_id");
//
//    // if(m.value.toString().length==0){
//    //     alert("d File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//    // var z=document.getElementById("cr14_form");
//
//    // if(z.value.toString().length==0){
//    //     alert("cr File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//
//    // var u=document.getElementById("vat_reg");
//
//    // if(u.value.toString().length==0){
//    //     alert("var File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//
//    //     return
//    // }
//    // var l=document.getElementById("tax_clearance");
//
//    // if(l.value.toString().length==0){
//    //     alert("tax File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//    // var a=document.getElementById("article_associ");
//
//    // if(a.value.toString().length==0){
//    //     alert("art File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//    // var cert=document.getElementById("certificate_of_inco");
//
//    // if(cert.value.toString().length==0){
//    //     alert("cert File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//
//
//    var data= new FormData(application);
//    data.append(cr6,cr6_form.files[0])
//    data.append(cr14,cr14_form.files[0]);
//    data.append(bank,bank_statement.files[0]);
//    data.append(director,director_id.files[0]);
//    data.append(certificate,certificate_of_inco.files[0]);
//    data.append(vat,vat_reg.files[0]);
//    data.append(article,article_associ.files[0]);
//    data.append(tax,tax_clearance.files[0]);
//
//    console.log(data)
//
//    // var data= new FormData(file)
//
//    // var y=document.getElementById("file");
//
//    // if(y.value.toString().length==0){
//    //     alert("Notice File Not Uploaded!!","danger");
//    //     var r=document.getElementById("retry");
//    //     r.setAttribute("style","display:all");
//
//    //     return
//    // }
//
//    $("#btnSubmit").prop("disabled", true);
//        $.ajax({
//            type: "POST",
//            enctype: 'multipart/form-data',
//            url: "/api/tenant/uploadtenantDocument",
//
//            data: data,
//
//            data: ajaxData,
//            processData: false,
//            contentType: false,
//            cache: false,
//            timeout: 600000,
//            success: function (data) {
//
//                var r=document.getElementById("retry");
//                r.setAttribute("style","display:none");
//                console.log("SUCCESS : ", data);
//                $("#btnSubmit").prop("disabled", false);
//                alert('File Saved Successfully ', 'success')
//
//
//
//            },
//            error: function (e) {
//                if(e.status.toString()=="200"){
//
//                    var r=document.getElementById("retry");
//                    r.setAttribute("style","display:none");
//                    alert("Documents  Saved Successfully ", 'success');
//                    console.log("ERROR : ", e);
//
//                }else if(e.status.toString()=="500"){
//
//                    var r=document.getElementById("retry");
//                    r.setAttribute("style","display:all");
//                    alert(e.responseJSON.message, 'danger');
//                    $("#btnSubmit").prop("disabled", false);
//                    console.log("ERROR : ", e);
//
//                }else{
//
//                    var r=document.getElementById("retry");
//                    r.setAttribute("style","display:all");
//                    console.log("ERROR : ", e);
//                    alert(e.message, 'success');
//                    $("#btnSubmit").prop("disabled", false);
//                }
//
//
//            }
//
//        });
//
//}
function getTenant() {
    $.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            let items = response


            console.log(response)

            var t_body = document.getElementById("t_body");
            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let html = `<tr class="accordion-toggle collapsed" id="c-2474" data-toggle="collapse" data-parent="#c-2474" href="#collap-2474 ${items[i].id}">
                            <td>${items[i].id}</td>
                            <td>${items[i].name} ${items[i].surname}</td>     
                            <td><span class="badge badge-pill badge-success mr-2">S</span><small class="text-muted">${items[i].rent_status}</small></td>
                            <td><a class="" href="./view_tenantDocuments.html" onclick="setLocalfile('${items[i].tenantId}')')">Display Documents
                            <button class="btn btn-sm" type="button" >
                            </button>
                            </a>

                             </td>
                            <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span> 
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="generateDocuments()">Genarate Reply Documents</a>
                              </div>
                            </td>  
                          </tr`         


                let tr = document.createElement("tr");


                tr.innerHTML = html;

                t_body.appendChild(tr);


            }

        }
    })
}


// function employeeSelect() {
//     //display the spinner
//     $('#ajaxLoader').show();
  
//     //first, let's get rid of the default "SELECT" option if it exists
//     var defaultOption = $("#employeeIdSelect option[value='1']");
//     if (defaultOption) defaultOption.remove();
  
//     //get the selected id
//     var id = $('#employeeIdSelect').val();
  
//     //get the url for the ajax call
//     var url = "/api/v1/getExpiredoc/" + id;
  
//     //do the ajax call
//     $.get(url, populateInfo);
//  }
 
// function populateInfo(data) {
//     var status = data.responseStatus;
  
//     //check the response to make sure it's ok
//     if (status == "Ok") {
//        var response = data.response;
  
//        //get the JSON data
//        var companyName = response.companyName;
//        var id = response.id;
//        var addressLine1 = response.addressLine1;
//        var addressLine2 = response.addressLine2;
//        var addressLine3 = response.addressLine3;
//        var debit = response.debit;
//        var expiryDate= response.expiryDate;
//        var dueDate=response.dueDate;
  
//        //set the input field values
//        $('#id').val(id);
//        $('#companyName').val(companyName);
//        $('#addressLine1').val(addressLine1);
//        $('#addressLine2').val(addressLine2);
//        $('#addressLine3').val(addressLine3);
//        $('#debit').val(debit);
//        $('#dueDate').val(dueDate);
//        $('#expiryDate').val(expiryDate);


  
//        //show the hidden elements
//        $('#profileRow').css('visibility','visible');
//     }
  
//     //hide the spinner again
//     $('#ajaxLoader').hide();
//  }
 function setLocalfile(application_letter){
     // var file=document.getElementById("formName2").innerText;
     localStorage.removeItem("application_letter");
     localStorage.setItem("application_letter", JSON.stringify(application_letter));
 }


 function SetLocal(id) {
     localStorage.removeItem("id");

     localStorage.setItem("id", JSON.stringify(id));


 }

