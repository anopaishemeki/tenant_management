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
    console.log("success",res.status); 
})

}

// change icon on search box and fetch searched data

function ChangeIconAndSearch(){
    var y=document.getElementById('searchbox');
    y.setAttribute("style","background-image:url('../../assets/images/giphy.gif'); background-size :60px 60px; background-position: top -10px left -10px");

    var t_body = document.getElementById("t_body");


    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    let items = JSON.parse(localStorage.getItem("lease"));


    var field = document.getElementById("searchbox").value.trim();
    for (let i = 0; i < items.length; i++) {
        let string = JSON.stringify(items[i]);

        if (string.toLowerCase().includes(field.toLowerCase())){

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

            t_body.appendChild(tr);

        }
    }
    var y=document.getElementById('searchbox');
    y.setAttribute("style","background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/16px-Search_Icon.svg.png'); background-position: 10px 10px");

}

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


//customising notice modal
function showPhonefooter(){
    var d =document.getElementById("phonefooter");
    var e =document.getElementById("emailfooter");
    d.setAttribute("style","display:all");
    e.setAttribute("style","display:none");
}
function showEmailfooter(){
    var d =document.getElementById("phonefooter");
    var e =document.getElementById("emailfooter");
    d.setAttribute("style","display:none");
    e.setAttribute("style","display:all");
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
        message=` I am writing this letter from New World to inform you that your  Lease is about to expire ( `+tLeft+` Days Left ) Expiring on `+endDate+` ,Consider coming and renew it before it expires. `

    }

    if(status=="Expired"){
        message=`I hope i find you well. I am writing this letter from New World to inform you that your  Lease has Expired on `+endDate+` ,Consider coming and renew it if you still want us to continue being at you service `

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

                t_body.appendChild(tr);
            }
        }
    })

}


//Get Leases
function getLeases() {
    $.ajax({
        url: 'http://localhost:8090/api/v1/lease/getleases',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)
            localStorage.setItem("lease", JSON.stringify(items));

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


                t_body.appendChild(tr);
            }
        }
    })

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
                t_body.appendChild(tr);
            }
        }
    });


}

