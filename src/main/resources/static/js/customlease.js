//Save Lesase
function saveLease() {
    var y = document.getElementById("ldID");
    if (y) {
        y.setAttribute("style", "display:all");
    }
    var h = document.getElementById("err");
    if (h) {

        h.innerHTML = ''
    }

    var file = $('#fileUploadForm')[0];
    var data = new FormData(file);

    var s = document.getElementById("startDate");

    if (s.value.toString().length == 0) {
        alert("Start Date is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }
    /*    var si = document.getElementById("email");

        if (si.value.toString().length == 0) {
            alert("Email is Required", "danger");
            var r = document.getElementById("retry");
            r.setAttribute("style", "display:all");

            return
        }

        var sp = document.getElementById("phone");

        if (sp.value.toString().length == 0) {
            alert("Phone Number is Required", "danger");
            var r = document.getElementById("retry");
            r.setAttribute("style", "display:all");

            return
        }

        var su = document.getElementById("phone");

        if (su.value.toString().length != 17) {
            alert("Invalid Phone number, Use format : (263) xxx-xxx-xxx", "danger");
            var r = document.getElementById("retry");
            r.setAttribute("style", "display:all");

            return
        }*/

    var p = document.getElementById("duration");

    if (p.value.toString().length == 0) {
        alert("Lease Duration is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }
    var we = document.getElementById("leaseName");
    if (we.value.toString().length == 0) {
        alert("Tenant Name is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }

    var pr = document.getElementById("buildingLocation");
    if (pr.value.toString().length == 0) {
        alert("Building Location is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }
    var yp = document.getElementById("rentalFee");

    if (yp.value.toString().length == 0) {
        alert("Rental Fee is Required", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return

    }
    var ys = document.getElementById("agreementDate");

    if (ys.value.toString().length == 0) {
        alert("Lease Agreement Date is Required!!", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }
    var qs = document.getElementById("file");

    if (qs.value.toString().length == 0) {
        alert("Lease Agreement File Not Uploaded!!", "danger");
        var r = document.getElementById("retry");
        r.setAttribute("style", "display:all");

        return
    }


    var jsonDataObj = {
        "name": $("#leaseName").val(),
        "buildingName": $("#buildingName").val(),
        "buildingLocation": $("#buildingLocation").val(),
        "rentalFee": $("#rentalFee").val(),
        "startDate": $("#startDate").val(),
        "floorNumber": $("#floorNumber").val(),
        "duration": $("#duration").val(),
        "agreementDate": $("#agreementDate").val(),
        "terms": $("#terms").val()
    };
    data.append("jsondata", JSON.stringify(jsonDataObj));
    $("#btnSubmit").prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/v1/lease/addlease",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {

            var r = document.getElementById("retry");
            r.setAttribute("style", "display:none");
            console.log("SUCCESS : ", data);
            $("#btnSubmit").prop("disabled", false);
            alert('Lease Saved Successfully ', 'success');
            return


        },
        error: function (e) {
            if (e.status.toString() == "200") {

                var r = document.getElementById("retry");
                r.setAttribute("style", "display:none");
                alert("Lease  Saved Successfully ", 'success');
                console.log("ERROR : ", e);

            } else if (e.status.toString() == "500") {

                var r = document.getElementById("retry");
                r.setAttribute("style", "display:all");
                alert(e.responseJSON.message, 'danger');
                $("#btnSubmit").prop("disabled", false);
                console.log("Date :", document.getElementById("startDate").value)
                console.log("ERROR : ", e);

            } else {

                var r = document.getElementById("retry");
                r.setAttribute("style", "display:all");
                console.log("ERROR : ", e);
                alert(e.message, 'success');
                $("#btnSubmit").prop("disabled", false);
            }


        }

    });

}

// //Save Lesase
// $(document).ready(function () {
//
//     $(".alert-success").hide();
//     $(".alert-danger").hide();
//     $("#btnSubmit").click(function () {
//
//         if (document.getElementById("buildingName").value == "") {
//             window.alert("Name Is Required");
//         }
//
//         var file = $('#fileUploadForm')[0];
//         var data = new FormData(file);
//
//
//         var jsonDataObj = {
//             "name": $("#leaseName").val(),
//             "buildingName": $("#buildingName").val(),
//             "buildingLocation": $("#buildingLocation").val(),
//             "rentalFee": $("#rentalFee").val(),
//             "startDate": $("#startDate").val(),
//             "floorNumber":$("#floorNumber").val(),
//             "duration": $("#duration").val(),
//             "agreementDate": $("#agreementDate").val(),
//             "terms": $("#terms").val()
//         };
//         data.append("jsondata", JSON.stringify(jsonDataObj));
//         $("#btnSubmit").prop("disabled", true);
//         $.ajax({
//             type: "POST",
//             enctype: 'multipart/form-data',
//             url: "/api/v1/lease/addlease",
//             data: data,
//             processData: false,
//             contentType: false,
//             cache: false,
//             timeout: 600000,
//             success: function (data) {
//
//
//                 console.log("SUCCESS : ", data);
//                 $("#btnSubmit").prop("disabled", false);
//                 $(".alert-success").show();
//                 $(".alert-danger").hide();
//
//
//             },
//             error: function (e) {
//
//                 $(".alert-success").hide();
//                 $(".alert-danger").show();
//                 console.log("ERROR : ", e);
//                 $("#btnSubmit").prop("disabled", false);
//
//             }
//
//         });
//
//     });
//
// });


//Save Lease
// $(document).ready(function () {
//     $('.alert-success').hide()
//     $('.alert-danger').hide()
//     $('#submitBtn').onclick(function () {
//
//
//         var form = $('#fileUploadForm')[0];
//         var data = new FormData(form);
//
//
//         var jsonDataObj = {
//             "name": $("#leaseName").val(),
//             "buildingName": $("#buildingName").val(),
//             "buildingLocation": $("#buildingLocation").val(),
//             "rentalFee": $("#rentalFee").val(),
//             "startDate": $("#startDate").val(),
//             "duration": $("#duration").val(),
//             "agreementDate": $("#agreementDate").val(),
//             "terms": $("#terms").val()
//         };
//         data.append("jsondata", JSON.stringify(jsonDataObj));
//         $("#submitBtn").prop("disabled", true);
//         $.ajax({
//             type: "POST",
//             enctype: 'multipart/form-data',
//             url: 'http:localhost:8090/api/v1/lease/addlease',
//             data: data,
//             processData: false,
//             contentType: false,
//             cache: false,
//             timeout: 600000,
//             success: funtion(data)
//         {
//             console.log('SUCCESS:', data);
//             $('#submitBtn').prop("disabled", false);
//             $('.alert-success').show();
//             $('.alert-danger').hide();
//
//         }
//     ,
//
//         error:funtion(e)
//         {
//             $('.alert-success').hide();
//             $('.alert-danger').show();
//             console.log('ERROR :', e);
//             $('#submitBtn').prop("disabled", false);
//
//         }
//
//     });
//     });
// });

function setLocal(id) {
    localStorage.removeItem("id");
    localStorage.setItem("id", JSON.stringify(id));

}

function SetLocal(id, name) {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("name", JSON.stringify(name));

}

function setLocalLease(lease){
    localStorage.removeItem("lease");
    localStorage.setItem("lease", JSON.stringify(lease));

}

//Send Email from notices page
function SendMail(){
    return;
}

// change icon on search box and fetch searched data

function ChangeIconAndSearch(){
    var y=document.getElementById('searchbox');
    y.setAttribute("style","background-image:url('../../assets/images/giphy.gif'); background-size :60px 60px; background-position: top -10px left -10px");

    /* var t_body = document.getElementById("t_body");


    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }*/

    var record = document.getElementById("searchbox").value.trim();



    if (record.length!=0) {
        $.ajax({
            url: 'http://localhost:8090/api/v1/lease/search/' + record,
            type: 'GET',
            success: function (response) {
                let items = response;

                console.log(response);

                var t_body = document.getElementById("t_body");


                while (t_body.hasChildNodes()) {
                    t_body.removeChild(t_body.firstChild);
                }

                for (let i = 0; i < items.length; i++) {
                    let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td>  ${items[i].rentalFee}
                        </td>
                        <td> ${items[i].buildingName}
                        </td> 
                        <td> ${items[i].buildingLocation}
                        </td>
                        <td > ${items[i].terms}
                        </td>
                        <td > ${items[i].status}
                        </td>
                        <td >${items[i].agreementDate}
                    </td>
                    <td>
                        <button class="btn btn-sm dropdown-toggle more-horizontal" type="button"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" >
                            <span class="text-muted sr-only">Action</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="Edit-Lease.html" onclick="setLocal('${items[i].id}')">Edit</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#renewal" onclick="SetLocal('${items[i].id}','${items[i].name}'),loadData() " href="#">Renew</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</a>
                            <a class="dropdown-item" href="./LeaseDetail.html" onclick="setLocal('${items[i].id}')">View More Details</a>
                        </div>
                    </td>`


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
                var y=document.getElementById('searchbox');
                y.setAttribute("style","background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/16px-Search_Icon.svg.png'); background-position: 10px 10px");


            }
        });
    }


}
//filter records on backspace or delete in search box
document.addEventListener('keyup', (event) => {
    var name = event.key;
    if (name === 'Backspace' ||name === 'Delete') {

        var y=document.getElementById('searchbox');
        y.setAttribute("style","background-image:url('../../assets/images/giphy.gif'); background-size :60px 60px; background-position: top -10px left -10px");

        var t_body = document.getElementById("t_body");


        var record = document.getElementById("searchbox").value.trim();

        if (record.length>0) {
            $.ajax({
                url: 'http://localhost:8090/api/v1/lease/search/' + record,
                type: 'GET',
                success: function (response) {
                    let items = response;

                    console.log(response);

                    var t_body = document.getElementById("t_body");


                    while (t_body.hasChildNodes()) {
                        t_body.removeChild(t_body.firstChild);
                    }

                    for (let i = 0; i < items.length; i++) {
                        let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td>  ${items[i].rentalFee}
                        </td>
                        <td> ${items[i].buildingName}
                        </td> 
                        <td> ${items[i].buildingLocation}
                        </td>
                        <td > ${items[i].terms}
                        </td>
                        <td > ${items[i].status}
                        </td>
                        <td >${items[i].agreementDate}
                    </td>
                    <td>
                        <button class="btn btn-sm dropdown-toggle more-horizontal" type="button"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" >
                            <span class="text-muted sr-only">Action</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="Edit-Lease.html" onclick="setLocal('${items[i].id}')">Edit</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#renewal" onclick="SetLocal('${items[i].id}','${items[i].name}'),loadData() " href="#">Renew</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</a>
                            <a class="dropdown-item" href="./LeaseDetail.html" onclick="setLocal('${items[i].id}')">View More Details</a>
                        </div>
                    </td>`


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
                    var y=document.getElementById('searchbox');
                    y.setAttribute("style","background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/16px-Search_Icon.svg.png'); background-position: 10px 10px");


                }
            });
        }else if(record.length==0){
            $.ajax({
                url: 'http://localhost:8090/api/v1/lease/getleases',
                type: 'GET',
                success: function (response) {
                    let items = response

                    console.log(response)

                    var t_body = document.getElementById("t_body");


                    while (t_body.hasChildNodes()) {
                        t_body.removeChild(t_body.firstChild);
                    }

                    for (let i = 0; i < items.length; i++) {
                        let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td>  ${items[i].rentalFee}
                        </td>
                        <td> ${items[i].buildingName}
                        </td> 
                        <td> ${items[i].buildingLocation}
                        </td>
                        <td > ${items[i].terms}
                        </td>
                        <td > ${items[i].status}
                        </td>
                        <td >${items[i].agreementDate}
                    </td>
                    <td>
                        <button class="btn btn-sm dropdown-toggle more-horizontal" type="button"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" >
                            <span class="text-muted sr-only">Action</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="Edit-Lease.html" onclick="setLocal('${items[i].id}')">Edit</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#renewal" onclick="SetLocal('${items[i].id}','${items[i].name}'),loadData() " href="#">Renew</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</a>
                            <a class="dropdown-item" href="./LeaseDetail.html" onclick="setLocal('${items[i].id}')">View More Details</a>
                        </div>
                    </td>`


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

                    var y=document.getElementById('searchbox');
                    y.setAttribute("style","background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/16px-Search_Icon.svg.png'); background-position: 10px 10px");

                }

            })
        }
    }

}, false);
// store notice data
function setNotice(id, name, status, endDate,timeLeft) {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("status");
    localStorage.removeItem("endDate");
    localStorage.removeItem("tLeft");
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("tLeft", JSON.stringify(timeLeft));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("status", JSON.stringify(status));
    localStorage.setItem("endDate", JSON.stringify(endDate));
}

// fill send notice modal
function loaddata() {

    var id = JSON.parse(localStorage.getItem("id"));
    var name = JSON.parse(localStorage.getItem("name").trim());
    var tLeft=JSON.parse(localStorage.getItem("tLeft"));
    var status = JSON.parse(localStorage.getItem("status"));
    var endDate = JSON.parse(localStorage.getItem("endDate"));


    let nametag = document.getElementById("tName");
    let idtag = document.getElementById("tID");
    let nametag2 = document.getElementById("tName2");
    let idtag2 = document.getElementById("tID2");

    if (nametag) {
        nametag.value = name;
        nametag2.value = name;
    }
    if (idtag) {
        idtag.innerText = id;
        idtag2.innerText = id;
    }


    var Name = name.split(" ")[0];
    var surname = "";
    if ((name.split(" ").length)>2) {
        surname = name.split(" ")[2];
    } else {
        surname = name.split(" ")[1];
    }
    let phone = document.getElementById("phone");
    var email =document.getElementById("T_email");


    var message="";

    if(status=="Active"){
        message=`Dear `+name+`
I hope i find you well. I am writing this letter from New World to inform you that your  Lease is about to expire ( `+tLeft+` Days Left ) Expiring on `+endDate+` ,Consider coming and renew it before it expires. 
Yours Faithfully ....?
Thank You, Have a good day`
    }

    if(status=="Expired"){
        message=`Dear `+name+`
I hope i find you well. I am writing this letter from New World to inform you that your  Lease has Expired on `+endDate+` ,Consider coming and renew it if you still want us to continue being at you service 
Yours Faithfully ....?
Thank You, Have a good day`
    }

    var MessageBox=document.getElementById("cont");
    MessageBox.value=message;

    var subject=document.getElementById("subject");
    subject.value="Lease Expiry Notice"
    
    $.ajax({
        type: "GET",
        url: "/api/v1/lease/getEmail/" + Name + "/" + surname,


        success: function (response) {
            console.log(response);
            email.value=response.split(",")[0];
            if (phone) {
                phone.value = response.split(",")[1];;

            }

        },
        error: function (e) {
            console.log(e);
            if (e.status.toString()=="200"){
                email.value=e.split(",")[0];
                if (phone) {
                    phone.value = response.split(",")[1];;

                }
            }
        }


    })


}

// function Call
function call() {
    let phone = document.getElementById("phone");
    if (phone) {
      window.location="tel:"+phone.value ;
}
}

// Renewing Lease
function loadData() {
    var id = JSON.parse(localStorage.getItem("id"));
    var name = JSON.parse(localStorage.getItem("name"));


    let nametag = document.getElementById("TenantName2");
    let id2 = document.getElementById("id2");

    if (nametag) {
        nametag.placeholder = name;
    }
    if (id2) {
        id2.innerText = id;
    }

}

function renewlease() {

    // var h=document.getElementsByClassName("err");
    // if (h.length>=1) {
    //    for (let i =0;i<=h.length;i++){
    //        var n =h[i];
    //         document.body.removeChild(n);
    //       // n.setAttribute("display","none");
    //    }
    //
    // }
    var e = document.getElementById("ldID");
    e.setAttribute("style", "display:all");


    var id = JSON.parse(localStorage.getItem("id"));

    var startDate = document.getElementById("startDate2").value;
    var duration = document.getElementById("duration2").value;


    let data = {
        startDate,
        duration
    }
    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "PUT",
        url: "/api/v1/lease/renewlease/" + id,


        success: function (response) {
            console.log(response);
            let btn = document.getElementById("liveAlertBtn");
            let div = document.getElementById("renewalInfo");
            let Close = document.getElementById("Close");


            div.setAttribute("style", "display:none");
            btn.setAttribute("style", "display:none");
            Close.setAttribute("style", "display:all");
            alert2('Lease Renewed Successfully !!', 'success')

        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {
                let btn = document.getElementById("liveAlertBtn2");
                let div = document.getElementById("renewalInfo");
                let Close = document.getElementById("Close2");


                div.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert2('Lease Renewed Successfully !!', 'success')
                console.log("ERROR : ", e);
                return;
            } else if ((e.status.toString() == "500")) {
                // let ar = document.getElementById("alrt");
                // let btn = document.getElementById("liveAlertBtn");
                // let btn2 = document.getElementById("liveAlertkBtn");
                // let Close = document.getElementById("Close");
                //
                // ar.setAttribute("style", "display:none");
                // btn.setAttribute("style", "display:none");
                // btn2.setAttribute("style", "display:none");
                // Close.setAttribute("style", "display:all");
                alert2(e.responseJSON.message.toString(), 'danger')
                console.log("ERROR : ", e.responseJSON.message.toString());
                return;
            } else {
                let btn = document.getElementById("liveAlertBtn");
                let div = document.getElementById("renewalInfo");
                let Close = document.getElementById("Close");


                div.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert2('There was an Error in renewing the lease ! Please try again !!', 'danger')
                console.log("ERROR : ", e);
                return;
            }


        }
    });

}

// Terminating Lease

function Terminate() {

    var ty = document.getElementById("alrt");
    if (ty) {
        ty.setAttribute("style", "display:none");
    }


    var k = document.getElementById("ldID");
    if (k) {
        k.setAttribute("style", "display:all");
    }

    var e = document.getElementById("ldiD");
    if (e) {
        e.setAttribute("style", "display:all");
    }

    var id = JSON.parse(localStorage.getItem("id"));
    let status = "Terminated";

    let data = {
        status
    }
    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "PUT",
        url: "/api/v1/lease/terminatelease/" + id,


        success: function (response) {
            console.log(response)
            let ar = document.getElementById("alrt");
            let btn = document.getElementById("liveAlertBtn");
            let btn2 = document.getElementById("liveAlertkBtn");
            let Close = document.getElementById("Close");

            ar.setAttribute("style", "display:none");
            btn.setAttribute("style", "display:none");
            btn2.setAttribute("style", "display:none");
            Close.setAttribute("style", "display:all");
            alert('Lease Terminated Successfully !!', 'success')
            return;

        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {
                let ar = document.getElementById("alrt");
                let btn = document.getElementById("liveAlertBtn");
                let btn2 = document.getElementById("liveAlertkBtn");
                let Close = document.getElementById("Close");

                ar.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                btn2.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert('Lease Terminated Successfully !!', 'success')
                return;
            } else if (e.status.toString() == "500") {
                let ar = document.getElementById("alrt");
                let btn = document.getElementById("liveAlertBtn");
                let btn2 = document.getElementById("liveAlertkBtn");
                let Close = document.getElementById("Close");

                ar.setAttribute("style", "display:none");
                btn.setAttribute("style", "display:none");
                btn2.setAttribute("style", "display:none");
                Close.setAttribute("style", "display:all");
                alert('Lease Was already Terminated ', 'danger');
                console.log("ERROR : ", e.responseJSON.message);
                return;
            }


        }
    });
}

// Updating Lease

function saveUpdate() {

    var id = JSON.parse(localStorage.getItem("id"));
    var jsonDataObj = {
        "name": $("#TenantName").val(),
        "buildingName": $("#buildingName").val(),
        "buildingLocation": $("#buildingLocation").val(),
        "floorNumber": $("#floorNumber").val(),
        "rentalFee": $("#rentalFee").val(),
        "startDate": $("#startDate").val(),
        "duration": $("#duration").val(),
        "agreementDate": $("#agreementDate").val(),
        "terms": $("#terms").val()
    };

    let ar = document.getElementById("retry");
    ar.setAttribute("style", "display:none");
    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonDataObj),
        type: "PUT",
        url: "/api/v1/lease/updatelease/" + id,


        success: function (response) {
            console.log(response)

            Close.setAttribute("style", "display:all");
            alert('Lease Updated Successfully !!', 'success')
            return;

        }
        ,
        error: function (e) {
            if (e.status.toString() == "200") {

                Close.setAttribute("style", "display:all");
                alert('Lease Updated Successfully !!', 'success')
                return;
            } else if (e.status.toString() == "500") {

                ar.setAttribute("display", "all");
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
var alertPlaceholder2 = document.getElementById('liveAlertPlaceholder2');


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


    // var wrapper = document.createElement('div');
    // wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'
    // alertPlaceholder.append(wrapper);
}

function alert2(message, type) {

    var e = document.getElementById("ldID");
    if (e) {
        e.setAttribute("style", "display:none");
    }


    var i = document.getElementById("ldiD");
    if (i) {
        i.setAttribute("style", "display:none");
    }


    var h = document.getElementById("err");
    if (h) {

        h.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

    } else {
        var wrapper = document.createElement('div');
        wrapper.setAttribute("id", "err");
        wrapper.innerHTML = '<div class="alert  err alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'

        alertPlaceholder2.append(wrapper);
    }


}

// if (alertTrigger) {
//     alertTrigger.addEventListener('click', function () {
//         alert('Lease Terminated Successfully !!', 'success')
//     })
// }

// Fetching Record For Viewing
function FetchRecord() {

    var id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: 'http://localhost:8090/api/v1/lease/getLease/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)


            let id = document.getElementById("id");
            let buildingName = document.getElementById("buildingName");
            let tenantName = document.getElementById("TenantName");
            let buildingLocation = document.getElementById("buildingLocation");
            let rentalFee = document.getElementById("rentalFee");
            let duration = document.getElementById("duration");
            let startDate = document.getElementById("startDate");
            let agreementDate = document.getElementById("agreementDate");
            let status = document.getElementById("status");
            let endDate = document.getElementById("endDate");
            let floorNumber = document.getElementById("floorNumber");
            let timeLeft = document.getElementById("timeLeft");
            let terms = document.getElementById("terms");


            id.innerText = `${response.id}`;
            tenantName.placeholder = `${response.name}`;
            buildingName.placeholder = `${response.buildingName}`;
            buildingLocation.placeholder = `${response.buildingLocation}`;
            rentalFee.placeholder = `${response.rentalFee}`;
            duration.placeholder = `${response.duration}`;
            startDate.value = `${response.startDate}`;
            agreementDate.value = `${response.agreementDate}`;
            status.placeholder = `${response.status}`;
            endDate.value = `${response.endDate}`;
            floorNumber.placeholder = `${response.floorNumber}`;
            timeLeft.placeholder = `${response.timeLeft}`;
            terms.placeholder = `${response.terms}`;


            tenantName.setAttribute("disabled", true);
            buildingName.setAttribute("disabled", true);
            buildingLocation.setAttribute("disabled", true);
            rentalFee.setAttribute("disabled", true);
            duration.setAttribute("disabled", true);
            startDate.setAttribute("disabled", true);
            agreementDate.setAttribute("disabled", true);
            floorNumber.setAttribute("disabled", true);
            terms.setAttribute("disabled", true);


        }
    })

}


// Fetching Record For Editing
function fetchRecord() {
    var id = JSON.parse(localStorage.getItem("id"));
    $.ajax({
        url: 'http://localhost:8090/api/v1/lease/getLease/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response)


            let id = document.getElementById("id");
            let buildingName = document.getElementById("buildingName");
            let tenantName = document.getElementById("TenantName");
            let buildingLocation = document.getElementById("buildingLocation");
            let rentalFee = document.getElementById("rentalFee");
            let duration = document.getElementById("duration");
            let startDate = document.getElementById("startDate");
            let agreementDate = document.getElementById("agreementDate");
            let status = document.getElementById("status");
            let endDate = document.getElementById("endDate");
            let floorNumber = document.getElementById("floorNumber");
            let timeLeft = document.getElementById("timeLeft");
            let terms = document.getElementById("terms");
            let btnSubmit = document.getElementById("btnSaveUpdate");
            let tlError = document.getElementById("TenantleaseError")


            id.innerText = `${response.id}`;
            tenantName.placeholder = `${response.name}`;
            buildingName.placeholder = `${response.buildingName}`;
            buildingLocation.placeholder = `${response.buildingLocation}`;
            rentalFee.placeholder = `${response.rentalFee}`;
            duration.placeholder = `${response.duration}`;
            startDate.value = `${response.startDate}`;
            agreementDate.value = `${response.agreementDate}`;
            status.placeholder = `${response.status}`;
            endDate.value = `${response.endDate}`;
            floorNumber.placeholder = `${response.floorNumber}`;
            timeLeft.placeholder = `${response.timeLeft}`;
            terms.placeholder = `${response.terms}`;

            let terminate = "Terminated";
            let Cstatus = `${response.status}`;
            if (terminate == Cstatus) {
                tenantName.setAttribute("disabled", true);
                buildingName.setAttribute("disabled", true);
                buildingLocation.setAttribute("disabled", true);
                rentalFee.setAttribute("disabled", true);
                duration.setAttribute("disabled", true);
                startDate.setAttribute("disabled", true);
                agreementDate.setAttribute("disabled", true);
                floorNumber.setAttribute("disabled", true);
                terms.setAttribute("disabled", true);
                btnSubmit.setAttribute("disabled", true);
                tlError.style.visibility = "visible";


            }


        }
    })
}


// Load Terminate Table

function T_Records() {
    $.ajax({
        url: 'http://localhost:8090/api/v1/lease/getleases',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var t_body = document.getElementById("t_body");


            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td>  ${items[i].rentalFee}
                        </td>
                        <td> ${items[i].buildingName}
                        </td> 
                        <td> ${items[i].buildingLocation}
                        </td>
                        </td>
                        <td> ${items[i].status}
                        </td>
                        <td >${items[i].agreementDate}
                    </td>
                    <td>
                    
                        
                            <!--<a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</a>-->
                           <a href="#"> <span class="badge badge-pill badge-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</span></a>
                    </td>`

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
    let st = document.createElement("script");
    st.setAttribute("src", "../../js/jquery.dataTables.min.js");
    body.append(st);
    //
    //  let a = document.createElement("script");
    //  a.setAttribute("src","../../js/jquery.min.js");
    //  body.append(a);
    //
    //
    //  let b = document.createElement("script");
    //  b.setAttribute("src","../../js/popper.min.js");
    //  body.append(b);
    //
    //  let d= document.createElement("script");
    //  d.setAttribute("src","../../js/moment.min.js");
    //  body.append(d);
    //
    //  let u= document.createElement("script");
    //  u.setAttribute("src","../../js/bootstrap.min.js");
    //  body.append(u);
    //
    //  let e= document.createElement("script");
    //  e.setAttribute("src","../../js/simplebar.min.js");
    //  body.append(e);
    //
    //  let f= document.createElement("script");
    //  f.setAttribute("src","../../js/jquery.stickOnScroll.js");
    //  body.append(f);
    //
    //  let g= document.createElement("script");
    //  g.setAttribute("src","../../js/config.js");
    //  body.append(g);
    //
    //  let h= document.createElement("script");
    //  h.setAttribute("src","../../js/bootstrap.bundle.min.js");
    //  body.append(h);
    //
    //  let j= document.createElement("script");
    //  j.setAttribute("src","../../js/popper.min.js");
    //  body.append(j);
    //
    //  let k= document.createElement("script");
    //  k.setAttribute("src","../../js/apps.js");
    //  body.append(k);
    //
    //
    //
    //
    //
    //
    //  let rt=document.createElement("script");
    //  rt.setAttribute("src","../../js/dataTables.bootstrap4.min.js");
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


//Get Leases
function getLeases() {
    $.ajax({
        url: 'http://localhost:8090/api/v1/lease/getleases',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)


            var t_body = document.getElementById("t_body");


            // while (t_body.hasChildNodes()) {
            //     t_body.removeChild(t_body.firstChild);
            // }

            for (let i = 0; i < items.length; i++) {
                let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td>  ${items[i].rentalFee}
                        </td>
                        <td> ${items[i].buildingName}
                        </td> 
                        <td> ${items[i].buildingLocation}
                        </td>
                        <td > ${items[i].terms}
                        </td>
                        <td > ${items[i].status}
                        </td>
                        <td >${items[i].agreementDate}
                    </td>
                    <td>
                        <button class="btn btn-sm dropdown-toggle more-horizontal" type="button"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" >
                            <span class="text-muted sr-only">Action</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="Edit-Lease.html" onclick="setLocal('${items[i].id}')">Edit</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#renewal" onclick="SetLocal('${items[i].id}','${items[i].name}'),loadData() " href="#">Renew</a>
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</a>
                            <a class="dropdown-item" href="./LeaseDetail.html" onclick="setLocal('${items[i].id}')">View More Details</a>
                        </div>
                    </td>`


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
    let st = document.createElement("script");
    st.setAttribute("src", "../../js/jquery.dataTables.min.js");
    body.append(st);
    //
    //  let a = document.createElement("script");
    //  a.setAttribute("src","../../js/jquery.min.js");
    //  body.append(a);
    //
    //
    //  let b = document.createElement("script");
    //  b.setAttribute("src","../../js/popper.min.js");
    //  body.append(b);
    //
    //  let d= document.createElement("script");
    //  d.setAttribute("src","../../js/moment.min.js");
    //  body.append(d);
    //
    //  let u= document.createElement("script");
    //  u.setAttribute("src","../../js/bootstrap.min.js");
    //  body.append(u);
    //
    //  let e= document.createElement("script");
    //  e.setAttribute("src","../../js/simplebar.min.js");
    //  body.append(e);
    //
    //  let f= document.createElement("script");
    //  f.setAttribute("src","../../js/jquery.stickOnScroll.js");
    //  body.append(f);
    //
    //  let g= document.createElement("script");
    //  g.setAttribute("src","../../js/config.js");
    //  body.append(g);
    //
    //  let h= document.createElement("script");
    //  h.setAttribute("src","../../js/bootstrap.bundle.min.js");
    //  body.append(h);
    //
    //  let j= document.createElement("script");
    //  j.setAttribute("src","../../js/popper.min.js");
    //  body.append(j);
    //
    //  let k= document.createElement("script");
    //  k.setAttribute("src","../../js/apps.js");
    //  body.append(k);
    //
    //
    //
    //
    //
    //
    //  let rt=document.createElement("script");
    //  rt.setAttribute("src","../../js/dataTables.bootstrap4.min.js");
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

// Get Tenant Names
function getTenants() {
    $.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            let items = response;
            // const today = new Date();

            console.log(response);

            var t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }


            for (let i = 0; i < items.length; i++) {
                let html = `${items[i].name} ${items[i].surname}`;

                let tr = document.createElement("option");

                var name = `${items[i].name} ${items[i].surname}`;

                tr.setAttribute("value", name);


                tr.innerHTML = html;

                t_body.appendChild(tr);


            }
        }
    })
}

var h = document.getElementById("Days");
if (isChecked(h))

// get Property details
    function getProperty() {
        $.ajax({
            url: '/api/property/get-all-properties',
            type: 'GET',
            success: function (response) {
                let items = response

                console.log(response)

                var t_body = document.getElementById("BN_body");

                while (t_body.hasChildNodes()) {
                    t_body.removeChild(t_body.firstChild);
                }

                for (let i = 0; i < items.length; i++) {
                    let html = `${items[i].name}`

                    let tr = document.createElement("option");

                    var name = `${items[i].name}`;

                    tr.setAttribute("value", name);

                    tr.innerHTML = html;

                    t_body.appendChild(tr);
                }


                var tl_body = document.getElementById("BL_body");

                while (tl_body.hasChildNodes()) {
                    tl_body.removeChild(tl_body.firstChild);
                }

                for (let i = 0; i < items.length; i++) {
                    let html = `${items[i].addressObject.city}`

                    let tr = document.createElement("option");

                    var name = `${items[i].addressObject.city}`;

                    tr.setAttribute("value", name);

                    tr.innerHTML = html;

                    tl_body.appendChild(tr);
                }


            }
        })
    }

//Get Lease Notices
function getLeaseNotice() {
    var duration = document.getElementById("adjT").value;
    var unit = document.getElementById("opt");
    if (unit) {

        if (unit.value.toString() == "day") {
            duration = duration;

        } else if (unit.value.toString() == "month") {
            duration = duration * 30;

        } else if (unit.value.toString() == "year") {
            duration = duration * 12 * 30;
        }
    }

    $.ajax({
        url: 'http://localhost:8090/api/v1/lease/notice/' + duration,
        type: 'GET',
        success: function (response) {
            let items = response;

            console.log(response);

            var t_body = document.getElementById("t_body");


            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let html = `<td class="sorting_1">  ${items[i].id}
                        </td>
                        <td>  ${items[i].name}
                        </td>
                        <td> ${items[i].buildingName} , ${items[i].buildingLocation}
                        </td>
                        <td > ${items[i].startDate}
                        </td>
                        <td > ${items[i].endDate}
                        </td>
                         <td > ${items[i].status}
                        </td>
                        <td >${items[i].timeLeft}
                    </td>
                    <td>
                        <a href="#"><span  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setNotice('${items[i].id}','${items[i].name}','${items[i].status}','${items[i].endDate}','${items[i].timeLeft}'),loaddata()" class="badge badge-pill badge-success">Notify</span></a>

                    </td>`


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
    });


}


function saveProperty() {
    let name = document.getElementById("propertyName").value
    let address = "";
    let tenant = "";
    let insurance = ""
    let description = document.getElementById("description").value
    let propertyType = document.getElementById("propertyType").value
    let city = document.getElementById("city").value;
    let owner = ""
    // let  province = document.getElementById().value;
    let status = document.getElementById("status").value;
    let assetValue = document.getElementById("assetValue").value;
    let province = "";


    //owner Object properties
    let ownerName = document.getElementById("ownerFirstName").value;
    let ownerLastname = document.getElementById("ownerLastName").value;

    let ownerAddressName = document.getElementById("ownerAddressName").value;
    let OwnerAddressAddress = document.getElementById("ownerAddress").value;
    let owerZipCode = document.getElementById("OwnerZipCode").value;
    let ownerCity = document.getElementById("ownerCity").value;
    let ownerCountry = document.getElementById("ownerCountry").value;

    let ownerPhone = document.getElementById("ownerPhone").value;
    let ownerCell = document.getElementById("ownerCellNumber").value;
    let ownerEmail = document.getElementById("ownerEmailAddress").value;

    //property address object properties
    let propertyAddressName = document.getElementById("propertyAddressName").value;
    let propertyAddressAddress = document.getElementById("propertyAddress").value;
    let propertyZipCode = document.getElementById("propertyZipCode").value;
    let propertyCity = document.getElementById("propertyCity").value;
    let propertyCountry = document.getElementById("propertyCountry").value;

    let data = {
        name,
        addressObject: {
            name: propertyAddressName,
            address: propertyAddressAddress,
            zipCode: propertyZipCode,
            city: propertyCity,
            country: propertyCountry,
            property: 0
        },
        address,
        tenant,
        insurance,
        description,
        propertyType,
        city,
        ownerObject: {
            name: ownerName,
            lastName: ownerLastname,
            address: "",
            addressObject: {
                name: ownerAddressName,
                address: OwnerAddressAddress,
                zipCode: owerZipCode,
                city: ownerCity,
                country: ownerCountry,
                property: 0
            },
            contactDetailsObject: {
                phone: ownerPhone,
                MobileNumber: ownerCell,
                email: ownerEmail
            }
        },
        owner,
        province,
        status,
        assetValue
    }

    $.ajax({
        url: 'http://localhost:8090/api/property/save-property',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            alert("success" + response)
            console.log(response)
            getProperties();
        }
    })
}


//Property Details
function editPropertyDetails(id) {
    $.ajax({
        url: 'http://localhost:8090/api/property/get-property/' + id,
        type: 'GET',
        success: function (response) {

            let html = `                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Name is required">
                                                <span class="bi bi-file"></span>
                                                <input class="input100" id="update_propertyName" type="text" name="propertyName" placeholder="${response.name}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Description is required">
                                                <span class="bi bi-file-earmark-text"></span>
                                                <input class="input100" id="update_description" type="text" name="description" placeholder="${response.description}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Type is required">
                                                <span class="bi bi-house-door"></span>
                                                <select id="update_propertyType" class="btn input100 text-left" style="color: #8F91A5">
                                                    <option>Property Type</option>
                                                    <option value="Multi Story"> Multi Story</option>
                                                    <option value="Complex Building">Complex Building</option>
                                                    <option value="Shopping Mall">Shopping Mall</option>
                                                </select>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "status is required">
                                                <span class="bi bi-person-workspace"></span>
                                                <select id="update_status" class="btn input100 text-left" style="color: #8F91A5">
                                                    <option>Property Status</option>
                                                    <option value="Occupied"> Occupied</option>
                                                    <option value Vacant>Vacant</option>
                                                </select>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <span class="bi bi-building"></span>
                                                <input class="input100" type="text" id="update_city" name="City" placeholder="${response.city} ">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <span class="bi bi-map"></span>
                                                <input class="input100" id="update_country" type="text" name="country" placeholder="${response.province}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 validate-input m-b-16" data-validate = "Asset Value is required">
                                                <input class="input100" type="number" min="0" id="update_assetValue" name="assetValue" placeholder="${response.assetValue} ">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;

            let html2 = `<span class="bi bi-save2-fill" onclick="updatePropertyDetails('${id}')"></span>
                                                    <span class="bi bi-trash-fill" onclick="discardEditPropertyDetailsChanges('${id}')"></span>`

            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

function updatePropertyDetails(id) {
    let name = document.getElementById("update_propertyName").value;
    let description = document.getElementById("update_description").value;
    let propertyType = document.getElementById("update_propertyType").value;
    let propertyStatus = document.getElementById("update_status").value;
    let propertyCity = document.getElementById("update_city").value;
    let propertyCountry = document.getElementById("update_country").value;
    let propertyAssetValue = document.getElementById("update_assetValue").value;

    let data = {
        name: name,
        description: description,
        propertyType: propertyType,
        city: propertyCity,
        province: propertyCountry,
        status: propertyStatus,
        assetValue: propertyAssetValue
    }

    $.ajax({
        url: 'http://localhost:8090/api/property/update-property/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {

            // editPropertyDetails();
            alert("Update Completed Successfully");

            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Name is required">
                                                <p><span class="bi bi-file">&nbsp;</span> Name : ${response.name}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Description is required">
                                                <p> <span class="bi bi-file-earmark-text">&nbsp;</span>Description : ${response.description}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Type is required">
                                                <p><span class="bi bi-house-door">&nbsp;</span>Property Type : ${response.propertyType} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "status is required">
                                                <p><span class="bi bi-person-workspace">&nbsp;</span>Status : ${response.status}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <p><span class="bi bi-building">&nbsp;</span>City : ${response.city}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <p><span class="bi bi-map">&nbsp;</span>Country : ${response.province}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Asset Value is required">
                                                <p><span class="bi bi-currency-dollar">&nbsp;</span>Asset Value : ${response.assetValue} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyDetails('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

function discardEditPropertyDetailsChanges(id) {
    $.ajax({
        url: 'http://localhost:8090/api/property/get-property/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Name is required">
                                                <p><span class="bi bi-file">&nbsp;</span> Name : ${response.name}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Description is required">
                                                <p> <span class="bi bi-file-earmark-text">&nbsp;</span>Description : ${response.description}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Property Type is required">
                                                <p><span class="bi bi-house-door">&nbsp;</span>Property Type : ${response.propertyType} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "status is required">
                                                <p><span class="bi bi-person-workspace">&nbsp;</span>Status : ${response.status}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <p><span class="bi bi-building">&nbsp;</span>City : ${response.city}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <p><span class="bi bi-map">&nbsp;</span>Country : ${response.province}</p>
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Asset Value is required">
                                                <p><span class="bi bi-currency-dollar">&nbsp;</span>Asset Value : ${response.assetValue} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyDetails('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;

        }
    })
}

//Property Address
function editPropertyAddress(id) {
    $.ajax({
        url: 'http://localhost:8090/api/address/get-address/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address Name is required">
                                                <span class="bi bi-geo-alt"></span>
                                                <input class="input100" type="text" id="update_propertyAddressName" name="propertyAddressName" placeholder="${response.name}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 validate-input d-flex m-b-16" data-validate = "Zip Code is required">
                                                <span class="bi bi-file-earmark-zip"></span>
                                                <input class="input100" type="text" id="update_propertyZipCode" name="propertyZipCode" placeholder="${response.zipCode}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Country is required">
                                                <span class="bi bi-map"></span>
                                                <input class="input100" type="text" id="update_propertyCountry" name="propertyCountry" placeholder="${response.country}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address is required">
                                                <span class="bi bi-geo-alt"></span>
                                                <input class="input100" type="text" id="update_propertyAddress" name="propertyAddress" placeholder="${response.address}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <span class="bi bi-building"></span>
                                                <input class="input100" type="text" id="update_propertyCity" name="propertyCity" placeholder="${response.property}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_PropertyAddress");
            container.innerHTML = html;

            let html2 = `<span class="bi bi-save2-fill" onclick="updatePropertyAddress('${id}')"></span>
                                                    <span class="bi bi-trash-fill" onclick="discardEditPropertyAddress('${id}')"></span>`

            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyAddress");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

function updatePropertyAddress(id) {
    let name = document.getElementById("update_propertyAddressName").value;
    let address = document.getElementById("update_propertyAddress").value;
    let zipCode = document.getElementById("update_propertyZipCode").value;
    let city = document.getElementById("update_propertyCity").value;
    let country = document.getElementById("update_propertyCountry").value;

    let data = {
        name: name,
        address,
        zipCode,
        city,
        country
    }

    $.ajax({
        url: ' http://localhost:8090/api/address/update-address/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response);
            alert("Update Completed Successfully");

        }
    })
}

function discardEditPropertyAddress(id) {
    $.ajax({
        url: 'http://localhost:8090/api/address/get-address/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address Name is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Name : ${response.name}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 validate-input d-flex m-b-16" data-validate = "Zip Code is required">
                                                    <p><span class="bi bi-file-earmark-zip">&nbsp;Zip Code : ${response.zipCode}</span></p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Country is required">
                                                    <p><span class="bi bi-map">&nbsp;</span>Country : ${response.country}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Address : ${response.address}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                    <p><span class="bi bi-building">&nbsp;</span>City : ${response.city}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>`

            let container = document.getElementById("update_PropertyAddress");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyAddress('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyAddress");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

//Property Owner Details
function editPropertyOwnerDetails(id) {
    $.ajax({
        url: 'http://localhost:8090/api/property/get-property/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "First Name is required">
                                                <span class="bi bi-person-bounding-box"></span>
                                                <input class="input100" type="text" id="update_ownerFirstName" name="ownerFirstName" placeholder="${response.ownerObject.name}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Owner Last Name is required">
                                                <span class="bi bi-person-bounding-box"></span>
                                                <input class="input100" type="text" id="update_ownerLastName" name="ownerLastName" placeholder="${response.ownerObject.lastName}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_PropertyOwnerDetails");
            container.innerHTML = html;

            let html2 = `<span class="bi bi-save2-fill" onclick="updatePropertyOwnerDetails('${id}')"></span>
                                                    <span class="bi bi-trash-fill" onclick="discardEditPropertyOwnerDetails('${id}')"></span>`

            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

function updatePropertyOwnerDetails(id) {
    let name = document.getElementById("update_ownerFirstName").value;
    let lastName = document.getElementById("update_ownerLastName").value;

    let data = {
        name,
        lastName
    }

    $.ajax({
        url: 'http://localhost:8090/api/owner/update-owner/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {

        }
    })
}

function discardEditPropertyOwnerDetails(id) {
    $.ajax({
        url: 'http://localhost:8090/api/owner/get-owner/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "First Name is required">
                                                <p><span class="bi bi-person-bounding-box">&nbsp;</span>First Name : ${response.name} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Owner Last Name is required">
                                                <p><span class="bi bi-person-bounding-box"></span>Last Name : ${response.lastName} </p>
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`;

            let container = document.getElementById("update_PropertyOwnerDetails");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyOwnerDetails('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

//Property Owner Address
function editPropertyOwnerAddress(id) {
    $.ajax({
        url: 'http://localhost:8090/api/property/get-property/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address Name is required">
                                                <span class="bi bi-geo-alt"></span>
                                                <input class="input100" type="text" id="update_ownerAddressName" name="ownerAddressName" placeholder="${response.ownerObject.name}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 validate-input d-flex m-b-16" data-validate = "Zip Code is required">
                                                <span class="bi bi-file-earmark-zip"></span>
                                                <input class="input100" type="text" id="update_OwnerZipCode" name="OwnerZipCode" placeholder="${response.ownerObject.zipCode}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <span class="bi bi-map"></span>
                                                <input class="input100" type="text" id="update_ownerCountry" name="ownerCountry" placeholder="${response.ownerObject.country}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address is required">
                                                <span class="bi bi-geo-alt"></span>
                                                <input class="input100" type="text" id="update_ownerAddress" name="ownerAddress" placeholder="${response.ownerObject.address}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                <span class="bi bi-building"></span>
                                                <input class="input100" type="text" id="update_ownerCity" name="ownerCity" placeholder="${response.ownerObject.city}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_PropertyOwnerAddress");
            container.innerHTML = html;

            let html2 = `<span class="bi bi-save2-fill" onclick="updatePropertyOwnerAddress('${id}')"></span>
                                                    <span class="bi bi-trash-fill" onclick="discardEditPropertyOwnerAddress('${id}')"></span>`

            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerAddress");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

function updatePropertyOwnerAddress(id) {
    let name = document.getElementById("update_ownerAddressName").value;
    let address = document.getElementById("update_ownerAddress").value;
    let zipCode = document.getElementById("update_OwnerZipCode").value;
    let city = document.getElementById("update_ownerCity").value;
    let country = document.getElementById("update_ownerCountry").value;

    let data = {
        name,
        address,
        zipCode,
        city,
        country
    }

    $.ajax({
        url: ' http://localhost:8090/api/address/update-address/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {

        }
    })
}

function discardEditPropertyOwnerAddress(id) {
    $.ajax({
        url: 'http://localhost:8090/api/address/get-address/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address Name is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Name : ${response.name}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 validate-input d-flex m-b-16" data-validate = "Zip Code is required">
                                                    <p><span class="bi bi-file-earmark-zip">&nbsp;Zip Code : ${response.zipCode}</span></p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Country is required">
                                                    <p><span class="bi bi-map">&nbsp;</span>Country : ${response.country}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Address is required">
                                                    <p><span class="bi bi-geo-alt">&nbsp;</span>Address : ${response.address}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Username is required">
                                                    <p><span class="bi bi-building">&nbsp;</span>City : ${response.city}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>`

            let container = document.getElementById("update_PropertyOwnerAddress");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyOwnerAddress('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerAddress");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

//Property Owner Contact Details
function editPropertyOwnerContactDetails(id) {
    $.ajax({
        url: 'http://localhost:8090/api/contact-details/get-contact-details/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                            <div class="wrap-input100 bi bi-telephone d-flex validate-input m-b-16" data-validate = "Owner Phone is required">
                                                <input class="input100" type="text" id="update_ownerPhone" name="ownerPhone" placeholder="${response.phone}">
                                                <span class="focus-input100"></span>
                                            </div>
                                            <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Email Address is required">
                                                <span class="bi bi-envelope"></span>
                                                <input class="input100" type="text" id="update_ownerEmailAddress" name="ownerEmailAddress" placeholder="${response.email}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="wrap-input100 bi bi-phone d-flex validate-input m-b-16" data-validate = "Cell Number is required">
                                                <input class="input100" type="text" id="update_ownerCellNumber" name="ownerCellNumber" placeholder="${response.MobileNumber}">
                                                <span class="focus-input100"></span>
                                            </div>
                                        </div>`

            let container = document.getElementById("update_PropertyOwnerContactDetails");
            container.innerHTML = html;

            let html2 = `<span class="bi bi-save2-fill" onclick="updatePropertyOwnerContactDetails('${id}')"></span>
                                                    <span class="bi bi-trash-fill" onclick="discardEditPropertyOwnerContactDetails('${id}')"></span>`

            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerContactDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}

function updatePropertyOwnerContactDetails(id) {
    let phone = document.getElementById("update_ownerPhone").value;
    let MobileNumber = document.getElementById("update_ownerCellNumber").value;
    let email = document.getElementById("update_ownerEmailAddress").value;

    let data = {
        phone,
        MobileNumber,
        email
    }

    $.ajax({
        url: ' http://localhost:8090/api/contact-details/update-contact-details/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {

        }
    })
}

function discardEditPropertyOwnerContactDetails(id) {
    $.ajax({
        url: 'http://localhost:8090/api/contact-details/get-contact-details/' + id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="col-sm-6">
                                                <div class="wrap-input100  d-flex validate-input m-b-16" data-validate = "Owner Phone is required">
                                                    <p><span class="bi bi-telephone">&nbsp;</span>Phone : ${response.phone} </p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Email Address is required">
                                                    <p><span class="bi bi-envelope">&nbsp;</span>Email : ${response.email}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="wrap-input100 d-flex validate-input m-b-16" data-validate = "Cell Number is required">
                                                    <p><span class="bi bi-phone">&nbsp;</span>Cell Number : ${response.MobileNumber}</p>
                                                    <span class="focus-input100"></span>
                                                </div>
                                            </div>`

            let container = document.getElementById("update_PropertyOwnerContactDetails");

            container.innerHTML = html;


            let html2 = `<span class="bi bi-pen-fill pen-big" onclick="editPropertyOwnerContactDetails('${id}')"></span>`
            let iconsPropertyOwnerContactDetails = document.getElementById("iconsPropertyOwnerContactDetails");
            iconsPropertyOwnerContactDetails.innerHTML = html2;
        }
    })
}


function setPropertyDetails(id) {
    alert(id)
    let url = 'http://localhost:8090/api/property/get-property/' + id

    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            discardEditPropertyOwnerContactDetails(response.ownerObject.contactDetails);
            discardEditPropertyOwnerAddress(response.ownerObject.address);
            discardEditPropertyOwnerDetails(response.owner);
            discardEditPropertyAddress(response.address);
            discardEditPropertyDetailsChanges(id);
        }
    })
}

