function setLocalfile(id){
     localStorage.removeItem("tenantId");
     localStorage.setItem("tenantId", JSON.stringify(id));
 }
function setLocalfiles(application_letter,article,bank_statement,cr6_form,cr14_form,director_id,tax_clearance,vat_reg,certificate_of_incorporation,company_profile){
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
    localStorage.removeItem("company_profile");
    localStorage.setItem("company_profile", JSON.stringify(company_profile));

}

function loadfile(){
var id = JSON.parse(localStorage.getItem("tenantId"));
 $.ajax({
        url: '/api/tenant/fetchfile/' + id ,
        type: 'GET',
        success: function (response) {
        console.log(response);
        setLocalfiles(response[0].application_letter,response[0].article,response[0].bank_statement,response[0].cr6_form,response[0].cr14_form,response[0].director_id,response[0].tax_clearance,response[0].vat_reg,response[0].certificate_of_incorporation,response[0].company_profile);
        }
    })
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
              url: '/api/tenant/downloadFile/' + id + "/" + application_letter,
              type: 'GET',
              success: function (response) {
             var h=application_letter.split(".").pop();
            console.log("Extension: = ",h);
            console.log(response);

            if(h=="jpg"|| h=="png"||h=="jpeg"){
                window.open('/assets/uploads/Tenant'+ id + "/"+ application_letter,"_blank");
            }
              }
          })
      }
       if(type=="article_of_association"){
       $.ajax({
              url: '/api/tenant/downloadFile/' + id + "/" + article_of_association,
              type: 'GET',
              success: function (response) {
             var h=article_of_association.split(".").pop();
            console.log("Extension: = ",h);
            console.log(response);

            if(h=="jpg"|| h=="png"||h=="jpeg"){
                window.open('/assets/uploads/Tenant'+ id + "/"+ article_of_association,"_blank");
            }
              }
          })
      }
          if(type=="cr14_form"){
             $.ajax({
                    url: '/api/tenant/downloadFile/' + id + "/" + cr14_form,
                    type: 'GET',
                    success: function (response) {
                   var h=cr14_form.split(".").pop();
                  console.log("Extension: = ",h);
                  console.log(response);

                  if(h=="jpg"|| h=="png"||h=="jpeg"){
                      window.open('/assets/uploads/Tenant'+ id + "/"+ cr14_form,"_blank");
                  }
                    }
                })
            }
             if(type=="cr6_form"){
             $.ajax({
                    url: '/api/tenant/downloadFile/' + id + "/" + cr6_form,
                    type: 'GET',
                    success: function (response) {
                   var h=cr6_form.split(".").pop();
                  console.log("Extension: = ",h);
                  console.log(response);

                  if(h=="jpg"|| h=="png"||h=="jpeg"){
                      window.open('/assets/uploads/Tenant'+ id + "/"+ cr6_form,"_blank");
                  }
                    }
                })
            }
                if(type=="bank"){
                   $.ajax({
                          url: '/api/tenant/downloadFile/' + id + "/" + bank_statement,
                          type: 'GET',
                          success: function (response) {
                         var h=bank_statement.split(".").pop();
                        console.log("Extension: = ",h);
                        console.log(response);

                        if(h=="jpg"|| h=="png"||h=="jpeg"){
                            window.open('/assets/uploads/Tenant'+ id + "/"+ bank_statement,"_blank");
                        }
                          }
                      })
                  }
                   if(type=="director"){
                   $.ajax({
                          url: '/api/tenant/downloadFile/' + id + "/" + director_id,
                          type: 'GET',
                          success: function (response) {
                         var h=director_id.split(".").pop();
                        console.log("Extension: = ",h);
                        console.log(response);

                        if(h=="jpg"|| h=="png"||h=="jpeg"){
                            window.open('/assets/uploads/Tenant'+ id + "/"+ director_id,"_blank");
                        }
                          }
                      })
                  }
                      if(type=="certificate"){
                         $.ajax({
                                url: '/api/tenant/downloadFile/' + id + "/" + certificate_of_incorporation,
                                type: 'GET',
                                success: function (response) {
                               var h=certificate_of_incorporation.split(".").pop();
                              console.log("Extension: = ",h);
                              console.log(response);

                              if(h=="jpg"|| h=="png"||h=="jpeg"){
                                  window.open('/assets/uploads/Tenant'+ id + "/"+ certificate_of_incorporation,"_blank");
                              }
                                }
                            })
                        }
                         if(type=="tax_clear"){
                         $.ajax({
                                url: '/api/tenant/downloadFile/' + id + "/" + tax_clearance,
                                type: 'GET',
                                success: function (response) {
                               var h=tax_clearance.split(".").pop();
                              console.log("Extension: = ",h);
                              console.log(response);

                              if(h=="jpg"|| h=="png"||h=="jpeg"){
                                  window.open('/assets/uploads/Tenant'+ id + "/"+ tax_clearance,"_blank");
                              }
                                }
                            })
                        }
                        if(type=="vat_reg"){
                          $.ajax({
                                url: '/api/tenant/downloadFile/' + id + "/" + vat_reg,
                                type: 'GET',
                                success: function (response) {
                                var h=vat_reg.split(".").pop();
                                console.log("Extension: = ",h);
                                console.log(response);

                                if(h=="jpg"|| h=="png"||h=="jpeg"){
                                   window.open('/assets/uploads/Tenant'+ id + "/"+ vat_reg,"_blank");
                                    }
                                }
                          })
                        }
}


function getTenant() {
   // $("#btn").prop("disabled", true);
    // ---------------------------

    var baseurl = "/api/tenants/get-all-tenants";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data);
            $("#tenant_table").DataTable({
                data: data,
                columns: [

                    {"data":"id"},
                    {"data": function (row) {
                            return row.business_name;

                        } },
                    {"data": function (row) {



                            return `<a class="" href="viewTenantDocuments" >

                            <button class="btn btn-primary" style="margin-top: 8px" onclick="setLocalfile('`+row.id +`')">Open Files</button>
                            </a>`;
                        },
                        "sortable":false,
                        "searchable":false
                    },
                    {"data":function(){
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="generateDocuments()">Genarate Reply Documents</a>
                              </div>`;
                        },
                        "sortable":false,
                        "searchable":false
                    }

                ]
            });
        }
    };
    xmlhttp.send();



    // ---------------------
    /*$.ajax({
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
                            <td><a class="" href="./view_tenantDocuments.html" >
                            <button class="btn btn-success" style="margin-top: 8px" onclick="setLocalfile('${items[i].id}')">Open Files</button>
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
    })*/
}
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
    var company = $('#fileUploadForm')[9];

    var ajaxData = new FormData(application)
    ajaxData.append(cr14,cr14_form.files[0])
    ajaxData.append(cr6,cr6_form.files[0])
    ajaxData.append(director,director_id.files[0])
    ajaxData.append(bank,bank_statement.files[0])
    ajaxData.append(vat,vat_reg.files[0])
    ajaxData.append(tax,tax_clearance.files[0])
    ajaxData.append(article,article_associ.files[0])
    ajaxData.append(certificate_of,certificate_of_inco.files[0])
    ajaxData.append(company,company_profile.files[0])

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

    $("#btnSubmit").prop("disabled", false);
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
                       $('#errorModal').modal('show');
                       console.log(e);
                   }


               })


}

function setType(filetype){
 localStorage.removeItem("filetype");
 localStorage.setItem("filetype", JSON.stringify(filetype));

}
function setLocal(id){
 localStorage.removeItem("id");
 localStorage.setItem("id", JSON.stringify(id));

}
function setLeasefile(file){
    // var file=document.getElementById("formName2").innerText;
    setLocal(id)
    localStorage.removeItem("file");
    localStorage.setItem("file", JSON.stringify(file));
}

function loadleasefile(){
var id = JSON.parse(localStorage.getItem("id"));
 $.ajax({
        url: '/api/tenant/fetchleasefile/' + id ,
        type: 'GET',
        success: function (response) {
        console.log(response);
        setLeasefile(response[0].file);
        }
    })
}


function getLeaseDocument() {
   // $("#btn").prop("disabled", true);

    //----------------------
    var baseurl = "/api/v1/lease/getleases";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data);
            $("#dataTable").DataTable({
                data: data,
                columns: [

                    {"data":"id"},
                    {"data":function (row) {
                            return row.tenant.business_name;
                        }},
                    {"data":"startDate"},
                    {"data":function(row) {

                            if(row.status=="Active") {
                            return `<span class="badge badge-pill badge-success ">A</span><small class="text-muted">`+row.status.substr(1,row.status.length);
                            }else if(row.status=="Terminated"){
                                return `<span class="badge badge-pill badge-danger ">T</span><small class="text-muted">`+row.status.substr(1,row.status.length);
                            }else if(row.status=="Expired"){
                                return `<span class="badge badge-pill badge-warning ">E</span><small class="text-muted">`+row.status.substr(1,row.status.length);
                            }

                        },
                        "searchable":false
                    },
                    {"data":function (row) {

                            return `<a  href="LeaseForm"  target="_blank"> <button class="btn btn-primary" style="margin-top: 8px" onclick="setLocal('`+row.id+`'),FetchRecord()">Open File</button> <button class="btn btn-sm" type="button" ></button></a>`;
                        },
                        "sortable":false,
                        "searchable":false
                    },
                    {"data":function(row) {

                            return `
                            <button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="generateDocuments()">Genarate ExpiredLease Documents</a>
                              </div>
                            ` ;
                        },
                        "sortable":false,
                        "searchable":false
                    }

                ]
            });
        }
    };
    xmlhttp.send();

    //----------------------------

   /* $.ajax({
        url: '/api/v1/lease/getleases',
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
                            <td>${items[i].tenant.business_name} </td>
                            <td>${items[i].startDate}</td>
                            <td><span class="badge badge-pill badge-success mr-2">S</span><small class="text-muted">${items[i].status}</td>
                            <td> <a  href="LeaseForm"  target="_blank"> <button class="btn btn-success" style="margin-top: 8px" onclick="setLocal('${items[i].id}'),FetchRecord()">Open File</button>
                            <button class="btn btn-sm" type="button" >
                            </button>
                            </a>

                             </td>
                            <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="generateDocuments()">Genarate ExpiredLease Documents</a>
                              </div>
                            </td>
                          </tr`


                let tr = document.createElement("tr");


                tr.innerHTML = html;

                t_body.appendChild(tr);


            }

        }
    })*/
}
function setAddTenantDropDown() {
    $.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            console.log(response)
            let dropDown = document.getElementById("tenant_list");

            /*while (dropDown.hasChildNodes()) {
                dropDown.removeChild(dropDown.firstChild);
            }*/

            for (let i = 0; i < response.length; i++) {
                let option = document.createElement("option");

                option.text = response[i].business_name;
                option.setAttribute("value", `${response[i].id}`)

                dropDown.appendChild(option);
            }
        }
    })
}

function onSetTenants() {

    console.log("tenantId");
    var select = document.getElementById("tenant_list");

    var selected = select.options[select.selectedIndex];


    // setDropDownLocal(id);
    var tenantId = selected.value;
    console.log(tenantId);

    tenantAssignLocalTenant(tenantId)


}

function tenantAssignLocalTenant(tenantId) {
    localStorage.removeItem("tenantId");
    localStorage.setItem("tenantId", JSON.stringify(tenantId));
    console.log(tenantId);


}


function saveReplyDetails() {


    var data = new FormData();



    var p=document.getElementById("addressline1");

    if(p.value.toString().length==0){
        alert("Address Line 1 is required","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var we =document.getElementById("addressline2");
    if(we.value.toString().length==0){
        alert("Address Line2 is Required","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }

    var pr=document.getElementById("addressline3");
    if(pr.value.toString().length==0){
        alert(" Address line 3 is Required","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }


    var ss=document.getElementById("shop_size");

    if(ss.value.toString().length==0){
        alert("Shop size is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var sso=document.getElementById("floor_number");

    if(ss.value.toString().length==0){
        alert("Floor is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var re=document.getElementById("rent");

    if(re.value.toString().length==0){
        alert("Rent fee is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var df=document.getElementById("deposit_fee");

    if(df.value.toString().length==0){
        alert("Deposit Fee is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var oc=document.getElementById("operation_cost");

    if(oc.value.toString().length==0){
        alert("Operation cost is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var lt=document.getElementById("lease_term");

    if(lt.value.toString().length==0){
        alert("Lease Term is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var fop=document.getElementById("fit_out_period");

    if(fop.value.toString().length==0){
        alert("Fit out Period is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }
    var guh=document.getElementById("tenant_list");

    if(fop.value.toString().length==0){
        alert("Fit out Period is Required!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    }



    let tenantId = JSON.parse(localStorage.getItem("tenantId"));
    console.log(tenantId)




    var jsonDataObj = {
        "business_name": $("#business_name").val(),
        "addressline1": $("#addressline1").val(),
        "addressline2": $("#addressline2").val(),
        "addressline3": $("#addressline3").val(),
        "fit_out_period": $("#fit_out_period").val(),
        "lease_term":$("#lease_term").val(),
        "operation_cost":$("#operation_cost").val(),
        "deposit_fee":$("#deposit_fee").val(),
        "rent":$("#rent").val(),
        "shop_size":$("#shop_size").val(),
        "floor_number":$("#floor_number").val(),
    };
    data.append("jsondata", JSON.stringify(jsonDataObj));
    $("#btnSubmit").prop("disabled", false);
    $.ajax({
        type: "POST",
        url: "/api/v1/replyDocuments",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (response) {

            $('#exampleModal').modal('show');
            console.log(response)

        },
        error: function (e) {
            $('#errorModal').modal('show');
            console.log(e);
        }




    });

}
function getReplyDetails(){
    var id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: '/api/v1/getreply/' + id,
        type: 'GET',
        success: function (response) {
            let obj= response
            console.log(obj)

            var t_body = document.getElementById("t_body");
            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }


                let html = `<tr>
                      <td bgcolor='#FFFFFF' style='text-align:left;' width='100%'>
                        <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                            The Director
                          </p>
                          <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                            obj[0].deposit_fee
                          </p>
                          <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                            ${obj[0].rent} ${obj.deposit_fee}
                          </p>
                          <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                            {obj[0].deposit_fee}
                          </p>
                          <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px; padding:0; font-weight:normal;margin-left:20px;'>
                            Harare
                          </p>
                        <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px;margin-left:20px; padding:0; font-weight:normal;'>
                          Dear Sir /Madam
                        </p>
                        <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px;margin-left:20px; padding:0; font-weight:normal;'>
                          We refer to your application letter for space to let at Joina City and are pleased to advice you that shop number
                          ${items[i].floor_number}  on the floor ${items[i].floor_number}  has been reserved for you.
                         </p><br><br>
                        <p style='color:#222222; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:19px; margin-top:0; margin-bottom:20px;margin-left:20px; padding:0; font-weight:normal;'>
                          The following will apply.<br>
                            <br>Shop Size                                 -   ${items[i].shop_size} square metres<br>
                               Rent                                       -   ${items[i].rent} per month excluding VAT
                            <br>Deposit                                   -   ${items[i].deposit_fee}
                            <br>Operating Cost                            -   ${items[i].operation_cost}<br>
                               Lease Term                                 -   ${items[i].lease_term}<br>
                               Shop Fit-Out Period                        -   ${items[i].fit_out_period}<br><br>


                               A draft Lease Agreement will be generated  for your  perusal and the final Lease  Agreement will be generated thereafter for your signatures.


                              <br><br><br> Terms and Conditions Shall be as per the Lease Agreement.<br><br><br>

                              We hope you shall find all in order


                            <br><br><br><br>
                            Thank You

                            <br><br><br><br>
                            <strong>Francis Makuwa</strong>
                            <strong>For New World Property Managers</strong>
                            <br>

                            {signature}

                        </p>

                      </td>
                    </tr>`


                let tr = document.createElement("tr");


                tr.innerHTML = html;

                t_body.appendChild(tr);




        }
    })
}

function getDoc(){
    var id = JSON.parse(localStorage.getItem("id"));

    $.ajax({
        url: '/api/v1/exportreply/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)
        },

    })

}
function getDetails() {
    // $("#btn").prop("disabled", true);
    // ---------------------------

    var baseurl = "/api/v1/getallreply";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data);
            $("#reply_table").DataTable({
                data: data,
                columns: [

                    {"data": "id"},
                    {
                        "data": function (row) {
                            return row.business_name;

                        }
                    },
                    {
                        "data": function (row) {
                            return row.deposit_fee;

                        }
                    },
                    {
                        "data": function (row) {
                            return row.rent;

                        }
                    },
                    {
                        "data": function (row) {
                            return row.floor_number;

                        }
                    },

                    {
                        "data": function (row) {
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                               <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo"  href="./replydocuments.html">Generate Reply Documents</a>
                              </div>`;
                        },
                        "sortable": false,
                        "searchable": false
                    }

                ]
            });
        }
    };
    xmlhttp.send();
}



function saveOtherDetails(){
    let doc = $('#other_doc')[0];
    let document_name = document.getElementById("document_name").value

    let ajaxData = new FormData(doc)


    let tenantId = JSON.parse(localStorage.getItem("tenantId"));
    ajaxData.append("tenantId",tenantId)


    ajaxData.append("document_name", JSON.stringify(document_name));

    console.log(ajaxData)
    $("#btnSubmit").prop("disabled", false);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/v1/uploadOther/" + tenantId,
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


    })



}
function setDocumentName(document_name){
    // var file=document.getElementById("formName2").innerText;
    localStorage.removeItem("document_name");
    localStorage.setItem("document_name", JSON.stringify(document_name));
}

function loadOtherFile(){
    let id = JSON.parse(localStorage.getItem("tenantId"));
    let name = JSON.parse(localStorage.getItem("document_name"))
    $.ajax({
        url: '/api/v1/getoth/'+id + '/' + name,
        type: 'GET',
        success: function (response) {
            console.log("response",response);
            localStorage.setItem("file", JSON.stringify(response));

        }
    })
}

function getAll() {
    // $("#btn").prop("disabled", true);
    // ---------------------------
    let tenant_id = JSON.parse(localStorage.getItem("tenantId"));

    var baseurl = "/api/v1/getAll_other/" + tenant_id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data);
            $("#other_table").DataTable({
                data: data,
                columns: [

                    {"data": "id"},
                    {
                        "data": function (row) {

                            return row.document_name;

                        }
                    },
                    {
                        "data": function (row) {
                            return `<a  href="otherForm">
                            <button class="btn btn-primary" style="margin-top: 8px" onclick="setDocumentName('` + row.document_name + `')">Open Files</button>
                            </a>`;
                        },
                        "sortable": false,
                        "searchable": false
                    },
                    {
                        "data": function (row) {
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                               <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" >update</a>
                              </div>
                              <div class="dropdown-menu dropdown-menu-right">
                               <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#">delete</a>
                              </div>`;
                        },
                        "sortable": false,
                        "searchable": false
                    }

                ]
            });

        }
    };
    xmlhttp.send();
}



