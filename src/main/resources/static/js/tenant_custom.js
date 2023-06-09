function getTenants() {
    // -----
    var baseurl = "/api/tenants/get-all-tenants";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var data = JSON.parse(xmlhttp.responseText);


            var url = "/api/v1/lease/getleases";
            var xxx = new XMLHttpRequest();
            xxx.open("GET", url, true);
            xxx.onreadystatechange = function () {

                if (xxx.readyState == 4 && xxx.status == 200) {


                    var leases = JSON.parse(xxx.responseText);

                    for (let i = 0; i < data.length; i++ ){
                        data[i].leases = [];
                        for (let j = 0; j < leases.length; j++){
                            if (data[i].id == leases[j].tenant_id){

                                data[i].leases.push(leases[j]);
                            }
                        }
                    }


                    let un_archieved=[];
                    let archived=[];
                    for(let i=0;i<data.length;i++){
                        if(data[i].status.toString()=="0"){
                            un_archieved.push(data[i]);
                        }else{

                            archived.push(data[i]);
                        }
                    }

                    console.log("active :" ,un_archieved);
                    console.log("in-active :" ,archived);
                    var printCounter = 0;

                    $("#tenants").DataTable({
                        data: un_archieved,
                        columns: [

                            {"data":"id"},
                            {"data":"business_name"},
                            {"data":"phone"},
                            {"data":function(row) {

                                    let compartment = "";
                                    for (let i = 0; i < row.compartmentObjectlist.length; i++) {
                                        compartment = compartment + " ; " + row.compartmentObjectlist[i].compartmentNumber;

                                    }
                                    compartment = compartment.substr(2, compartment.length);


                                    if(compartment.length==0) {
                                        compartment = "...."
                                    }


                                    return compartment ;
                                },
                                "sortable":false,
                                "searchable":false
                            },
                            {"data":function (row) {
                                    var rentStatus="";
                                    if(row.rentStatus===null) {
                                        rentStatus="unpaid"
                                    }else{
                                        rentStatus=row.rentStatus;
                                    }
                                    return rentStatus;
                                }},
                            {"data":function(row) {

                                    let rentalFee="";;
                                    for (let i = 0; i < row.compartmentObjectlist.length; i++) {
                                        rentalFee = rentalFee +" ; $ " + Math.round((row.compartmentObjectlist[i].rentalRate *row.compartmentObjectlist[i].floorArea + Number.EPSILON) * 100) / 100;

                                    }
                                    rentalFee = rentalFee.substr(3,rentalFee.length);

                                    if(rentalFee.length==0){
                                        rentalFee="...."
                                    }

                                    return rentalFee ;
                                },
                                "sortable":false,
                                "searchable":false
                            },
                            {"data":function (row) {
                                    return"<div class='d-flex justify-content-center'><span style='color: red ;cursor: pointer' class='fe fe-16 fe-anchor'></span></div>";
                                },
                                "sortable":false,
                                "searchable":false
                            },
                            {"data":function(row){
                                    return`<button class="btn btn-sm " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style="font-size: 20px;color: blueviolet" class="fe fe-edit"></span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item"  onclick="LocalTenantID('`+row.id+`')" href="tenantDetail">View</a>
                                <a class="dropdown-item" onclick="LocalTenantID('`+row.id+`')" href="editTenant">Edit</a>
                                <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#assign" onclick="LocalTenantID('`+row.id+`');setAddPropertyDropDown(),loadData() " href="#">Assign</a>
                              </div>`
                                },
                                "sortable":false,
                                "searchable":false
                            }
                        ],
                        orderCellsTop: true,
                        fixedHeader: true,
                        dom: 'lfrtipB',

                        buttons: [
                            {
                                extend: 'collection',
                                text: '<span class="fe fe-24 fe-twitch"></span> Export Data',
                                buttons: [
                                    {extend:'excel',
                                        messageTop:"List Of Active Tenants"
                                    },
                                    {extend:'csv',
                                        messageTop:"List Of Active Tenants"
                                    },
                                    {extend:'pdf',
                                        messageBottom:null,
                                        messageTop:"List Of Active Tenants"
                                    }

                                ]
                            },
                            {extend:'collection',
                            text:'Print <span class="fe fe-24 fe-printer"></span>',
                            buttons:[
                                {   extend:"print",
                                    text:"Print All Records",
                                    messageBottom: function () {
                                        printCounter++;

                                        if ( printCounter === 1 ) {
                                            return 'This is the first time you have printed this document.';
                                        }
                                        else {
                                            return 'You have printed this document '+printCounter+' times today.';
                                        }
                                    },
                                    messageTop:"List Of Active Tenants"
                                },
                                {   extend:"print",
                                    text:"Print Current Table",
                                    messageBottom: function () {
                                        printCounter++;

                                        if ( printCounter === 1 ) {
                                            return 'This is the first time you have printed this document.';
                                        }
                                        else {
                                            return 'You have printed this document '+printCounter+' times today.';
                                        }
                                    },
                                    exportOptions: {
                                        modifier: {
                                            page: 'current'
                                        }
                                    },
                                    messageTop:"List Of Active Tenants"
                                }
                            ]},

                            {
                                popoverTitle: 'Visibility control',
                                text:'Column Visibility <span class="fe fe-24 fe-eye"></span>',
                                extend: 'colvis',
                                collectionLayout: 'two-column'

                            }
                        ]
                    /* "language":
                            {"buttons":
                                    {"print":'Print <span class="fe fe-24 fe-printer"></span>'}

                            }*/



                      /*  buttons: [

                            'excel',
                            'print',
                            'pdf'

                            /!*'pdf',
                            {
                                extend: 'pdf',
                                text: 'Save current page',
                                exportOptions: {
                                    modifier: {
                                        page: 'current'
                                    }
                                }
                            }*!/
                        ]*/
                    });

                    $("#tenants2").DataTable({
                        data: archived,
                        columns: [

                            {"data":"id"},
                            {"data":"business_name"},
                            {"data":"phone"},
                            {"data":function(row) {

                                    let compartment = "";
                                    for (let i = 0; i < row.compartmentObjectlist.length; i++) {
                                        compartment = compartment + " ; " + row.compartmentObjectlist[i].compartmentNumber;

                                    }
                                    compartment = compartment.substr(2, compartment.length);


                                    if(compartment.length==0) {
                                        compartment = "...."
                                    }


                                    return compartment ;
                                },
                                "sortable":false,
                                "searchable":false
                            },
                            {"data":function (row) {
                                    var rentStatus="";
                                    if(row.rentStatus===null) {
                                        rentStatus="unpaid"
                                    }else{
                                        rentStatus=row.rentStatus;
                                    }
                                    return rentStatus;
                                }},
                            {"data":function(row) {

                                    let rentalFee=0;
                                    for (let i = 0; i < row.compartmentObjectlist.length; i++) {
                                       // rentalFee = rentalFee +" ; $ " + Math.round((row.compartmentObjectlist[i].rentalRate *row.compartmentObjectlist[i].floorArea + Number.EPSILON) * 100) / 100;

                                        rentalFee = rentalFee + row.compartmentObjectlist[i].rentalRate * row.compartmentObjectlist[i].floorArea ;
                                    }
                                  //  rentalFee = rentalFee.substr(3,rentalFee.length);

                                    if(rentalFee==0){
                                        rentalFee="...."
                                    }else{
                                        rentalFee="$ "+Math.round((rentalFee + Number.EPSILON) * 100) / 100;
                                    }

                                    return rentalFee ;
                                },
                                "sortable":false,
                                "searchable":false
                            },
                            {"data":function (row) {
                                    return"<div class='d-flex justify-content-center'><span style='color: red ;cursor: pointer' class='fe fe-16 fe-anchor'></span></div>";
                                },
                                "sortable":false,
                                "searchable":false
                            },
                            {"data":function(row){
                                    return`<button class="btn btn-sm " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style="font-size: 20px;color: blueviolet" class="fe fe-edit"></span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item"  onclick="LocalTenantID('`+row.id+`')" href="tenantDetail">View</a>
                                <a class="dropdown-item" onclick="LocalTenantID('`+row.id+`')" href="editTenant">Edit</a>
                                <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#assign" onclick="LocalTenantID('`+row.id+`');setAddPropertyDropDown(),loadData() " href="#">Assign</a>
                              </div>`
                                },
                                "sortable":false,
                                "searchable":false
                            }
                        ],
                        orderCellsTop: true,
                        fixedHeader: true,
                        dom: 'lfrtipB',

                        buttons: [
                            {
                                extend: 'collection',
                                text: '<span class="fe fe-24 fe-twitch"></span> Export Data',
                                buttons: [
                                    {extend:'excel',
                                        messageTop:"List Of InActive Tenants"
                                    },
                                    {extend:'csv',
                                        messageTop:"List Of InActive Tenants"
                                    },
                                    {extend:'pdf',
                                        messageBottom:null,
                                        messageTop:"List Of InActive Tenants"
                                    }

                                ]
                            },
                            {extend:'collection',
                                text:'Print <span class="fe fe-24 fe-printer"></span>',
                                buttons:[
                                    {   extend:"print",
                                        text:"Print All Records",
                                        messageBottom: function () {
                                            printCounter++;

                                            if ( printCounter === 1 ) {
                                                return 'This is the first time you have printed this document.';
                                            }
                                            else {
                                                return 'You have printed this document '+printCounter+' times today.';
                                            }
                                        },
                                        messageTop:"List Of InActive Tenants"
                                    },
                                    {   extend:"print",
                                        text:"Print Current Table",
                                        messageBottom: function () {
                                            printCounter++;

                                            if ( printCounter === 1 ) {
                                                return 'This is the first time you have printed this document.';
                                            }
                                            else {
                                                return 'You have printed this document '+printCounter+' times today.';
                                            }
                                        },
                                        exportOptions: {
                                            modifier: {
                                                page: 'current'
                                            }
                                        },
                                        messageTop:"List Of InActive Tenants"
                                    }
                                ]},

                            {
                                popoverTitle: 'Visibility control',
                                text:'Column Visibility <span class="fe fe-24 fe-eye"></span>',
                                extend: 'colvis',
                                collectionLayout: 'two-column'

                            }
                        ]
                    });
                }
            }
            xxx.send();


        }
    };
    xmlhttp.send();

    // --------
    /*$.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            let items = response
            const today = new Date();

            console.log(response)

            var t_body = document.getElementById("t_body");
            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let compartment = "";
                let rentalFee="";
                for (let j = 0; j < response[i].compartmentObjectlist.length; j++){
                    compartment =compartment +" ; "+ response[i].compartmentObjectlist[j].compartmentNumber;
                    rentalFee = rentalFee +" ; $ " +response[i].compartmentObjectlist[j].rentalRate * response[i].compartmentObjectlist[j].floorArea ;
                }
                compartment = compartment.substr(2,compartment.length);
                rentalFee = rentalFee.substr(3,rentalFee.length);

                if(compartment.length==0){
                    compartment="...."
                }
                if(rentalFee.length==0){
                    rentalFee="...."
                }
                console.log(compartment);
                let html = `<tr class="accordion-toggle collapsed" id="c-2474" data-toggle="collapse" data-parent="#c-2474" href="#collap-2474 ${items[i].id}">
                            <td>${items[i].id}</td>
                            <td>${items[i].business_name}</td>
                            <td>${items[i].phone}</td>
                            <td>${compartment}</td>
                            
                            <td><span class="badge badge-pill badge-success mr-2">S</span><small class="text-muted">${items[i].rent_status}</small></td>
                           
                            <td> ${rentalFee}</td>
                            <td><button class="btn btn-sm " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style="font-size: 20px;color: blueviolet" class="fe fe-edit"></span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="viewTenant('${i}')">View</a>
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Assign</a>
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



//View hide Archieved Tenants

function viewhideArchieved(){
    var archDiv=document.getElementById("viewhideArchieved");
   var aa= archDiv.getAttribute("style");
    if(aa=="display:none"){
        archDiv.setAttribute("style","display:all");
    }else{
        archDiv.setAttribute("style","display:none");
    }
    var btn =document.getElementById("btnShowHide");
    var btn2 =document.getElementById("btnShowHide2");

    if(btn.innerText=="Show"){
        btn.innerText="Hide";
        btn2.setAttribute("class","fe fe-chevron-up fe-16 ml-2");
    }else{
        btn.innerText="Show";
        btn2.setAttribute("class","fe fe-chevron-down fe-16 ml-2");
    }

}


// Renewing Lease
function loadData() {
    var id = JSON.parse(localStorage.getItem("t_id"));


    $.ajax({
        url: '/api/tenants/getTenantByID/' + id,
        type: 'GET',
        success: function (response) {
            let items = response;

            console.log(response);
            let nametag = document.getElementById("TenantName2");
            if (nametag) {

                nametag.value= response.business_name;
               // setLocalTenantID(response.tenant_id)
            }
            let namet = document.getElementById("tenantName3");
            if (namet) {

                namet.innerHTML= response.business_name;
                // setLocalTenantID(response.tenant_id)
            }
        }
    });


    let id2 = document.getElementById("id2");



    if (id2) {
        id2.innerText = id;
    }

}

//save Tenant
function saveTenant() {
    let name = document.getElementById("name").value
    let property = "null";
    let lease = " Active"
    let surname = document.getElementById("surname").value
    let email = document.getElementById("email").value
    let id_passport = document.getElementById("passport").value;


    let b_email = document.getElementById("b_email").value
    let b_phone = document.getElementById("b_phone").value
    let b_tel = document.getElementById("b_tel").value;
    let address = document.getElementById("address").value;
    //property contact details
    let phone = document.getElementById("phone").value;


    //owner Object properties
    let website = document.getElementById("website").value;
    let business_name = document.getElementById("business_name").value;

    let business_type = document.getElementById("business_type").value;
    let services = document.getElementById("services").value;


    let city = document.getElementById("city").value;
    let country = document.getElementById("country").value;

    //property address object properties
    let rent_status = "Paid";


    let data = {
        city,
        country,
        email,
        website,
        address,
        b_email,
        b_phone,
        b_tel,
        id_passport,
        lease,
        name,
        phone,
        property,
        rent_status,
        surname,
        business_name,
        business_type,
        services
    }

    $.ajax({
        url: '/api/tenants/addTenant',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            $('#successModal').modal('show');
            console.log(response)

        },
        error: function (e) {
            console.log(e);
        }

    })

    $("#tenant_form")[0].reset();
}


//edit tenant
function EditTenant() {

    var p = document.getElementById("done");
    p.setAttribute("style","display: all");

    var o = document.getElementById("retry");
    o.setAttribute("style","display: none");

    var y = document.getElementById("modal-body");
    if (y) {
        y.setAttribute("style", "display:all");
    }

    var h = document.getElementById("err");
    if (h) {

        h.innerHTML = ''
    }


    let id = JSON.parse(localStorage.getItem("t_id"));

    let business_name = document.getElementById("business_name").value;


    if(business_name.toString()==""){
        alert("Business Name is Required", "danger");
        return;
    }

    let business_type = document.getElementById("business_type").value;
    if(business_type.toString()==""){
        alert("Business Type is Required", "danger");
        return;
    }
    let b_phone = document.getElementById("b_phone").value;

    let b_tel = document.getElementById("b_tel").value;
    if(b_phone.toString()=="" && b_tel.toString()==""){
        alert("Either Business Phone Number / Tel is Required", "danger");
        return;
    }

    let name = document.getElementById("name").value;
    if(name.toString()==""){
        alert("Tenant First Name is Required", "danger");
        return;
    }

    let surname = document.getElementById("surname").value;
    if(surname.toString()==""){
        alert("Tenant Last Name is Required", "danger");
        return;
    }
    let email = document.getElementById("email").value;

    let id_passport = document.getElementById("passport").value;
    if(id_passport.toString()==""){
        alert("Tenant ID or Passport Number is Required", "danger");
        return;
    }

    let b_email = document.getElementById("b_email").value;
   /* if(b_email.toString()==""){
        alert("Business Email is Required", "danger");
        return;
    }*/


    let address = document.getElementById("address").value;
    if(address.toString()==""){
        alert("Address is Required", "danger");
        return;
    }
    let phone = document.getElementById("phone").value;
    if(phone.toString()==""){
        alert("Tenant Phone Number is Required", "danger");
        return;
    }
    //property contact details



    //owner Object properties
    let website = document.getElementById("website").value;


    let services = document.getElementById("services").value;


    let city = document.getElementById("city").value;
    if(city.toString()==""){
        alert("City is Required", "danger");
        return;
    }
    let country = document.getElementById("country").value;
    if(country.toString()==""){
        alert("Country is Required", "danger");
        return;
    }

    $('#staticBackdrop').modal('show');
    var y = document.getElementById("modal-body");
    if (y) {
        y.setAttribute("style", "display:all");
    }


    let data = {
        city,
        country,
        email,
        website,
        address,
        b_email,
        b_phone,
        b_tel,
        id_passport,
        name,
        phone,
        surname,
        business_name,
        business_type,
        services
    };

    $.ajax({
        url: '/api/tenants/updateTenant/'+id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response);
            alert('Tenant Updated Successfully !!', 'success');
            return;

        },
        error: function (e) {
            if (e.status.toString() == "200") {

                alert('Tenant Updated Successfully !!', 'success');
                return;
            } else if (e.status.toString() == "500") {

                alert( e.responseJSON.message, 'danger');
                console.log("ERROR : ", e.responseJSON.message);
                return;
            } else {
                alert(e.responseJSON.message, 'danger')
                console.log("ERROR : ", e);
                return;
            }
        }

    });

    $("#tenant_form")[0].reset();
}


function alert(message, type) {

    if(message=="Tenant Updated Successfully !!"){
        var p = document.getElementById("retry");
        p.setAttribute("style","display: none");
        var o = document.getElementById("done");
        o.setAttribute("style","display: all");
    }else{
        var p = document.getElementById("retry");
        p.setAttribute("style","display: all");
        var o = document.getElementById("done");
        o.setAttribute("style","display: none");
    }

    var y = document.getElementById("modal-body");

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
var alertPlaceholder = document.getElementById('liveAlertPlaceholder');

function LocalTenantID(id) {
    localStorage.removeItem("t_id");
    localStorage.setItem("t_id", JSON.stringify(id));


}

function setLocalfile(id) {
    localStorage.removeItem("tenantId");
    localStorage.setItem("tenantId", JSON.stringify(id));
}

function setType(filetype) {
    localStorage.removeItem("filetype");
    localStorage.setItem("filetype", JSON.stringify(filetype));

}

function setLocalfiles(application_letter, article, bank_statement, cr6_form, cr14_form, director_id, tax_clearance, vat_reg, certificate_of_incorporation) {
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
/*Edit Tenant*/
// view Tenant Details
function getTenantForEdit() {
    let id = JSON.parse(localStorage.getItem("t_id"));
    $.ajax({
        url: '/api/tenants/getTenantByID/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response);
            let name = document.getElementById("name");
            name.value=response.name;

            let surname = document.getElementById("surname");
            surname.value=response.surname;
            let email = document.getElementById("email");
            email.value=response.email;
            let id_passport = document.getElementById("passport");
            id_passport.value=response.id_passport;

            let b_email = document.getElementById("b_email");
            b_email.value=response.b_email;
            let b_phone = document.getElementById("b_phone");
            b_phone.value=response.b_phone
            let b_tel = document.getElementById("b_tel");
            b_tel.value=response.b_tel;
            let address = document.getElementById("address");
            address.value=response.address;
            //property contact details
            let phone = document.getElementById("phone");
            phone.value=response.phone;


            //owner Object properties
            let website = document.getElementById("website");
            website.value=response.website;
            let business_name = document.getElementById("business_name");
            business_name.value=response.business_name;

            let business_type = document.getElementById("business_type");
            business_type.value=response.business_type;
            let services = document.getElementById("services");
            services.value=response.services;


            let city = document.getElementById("city");
            city.value=response.city;
            let country = document.getElementById("country");
            country.value=response.country;


        }

    })
}




// view Tenant Details
function getTenantBYid() {
    let id = JSON.parse(localStorage.getItem("t_id"));
    $.ajax({
        url: '/api/tenants/getTenantByID/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response);
            let businessName = document.getElementById("businessName");
            businessName.innerHTML = `${response.business_name}`;
            let businessType = document.getElementById("businessType");
            businessType.innerHTML = `${response.business_type}`;
            let businessEmail = document.getElementById("b_email");
            businessEmail.innerHTML = `${response.b_email}`;
            let businessPhone = document.getElementById("b_phone");
            businessPhone.innerHTML = `${response.b_phone}`;
            let businessTel = document.getElementById("b_tel");
            businessTel.innerHTML = `${response.b_tel}`;
            let businessCountry = document.getElementById("businessCountry");
            businessCountry.innerHTML = `${response.country}`;
            let businessCity = document.getElementById("businessCity");
            businessCity.innerHTML = `${response.city}`;

            if (response.website == null) {
                let website = document.getElementById("website");
                website.innerHTML = "N/A";
            } else {
                let website = document.getElementById("website");
                website.innerHTML = `${response.website}`;
                website.setAttribute("href", `${response.website}`);
            }

            if (response.website == null) {
                let businessService = document.getElementById("businessService");
                businessService.innerHTML = "N/A";
            } else {
                let businessService = document.getElementById("businessService");
                businessService.innerHTML = `${response.services}`;
            }

            let tenantname = document.getElementById("tenantname");
            tenantname.innerHTML = `${response.name}`;
            let tenantsurname = document.getElementById("tenantsurname");
            tenantsurname.innerHTML = `${response.surname}`;
            let tenantphone = document.getElementById("tenantphone");
            tenantphone.innerHTML = `${response.phone}`;

            let tenantemail = document.getElementById("tenantemail");
            tenantemail.innerHTML = `${response.email}`;

            let businessName2 = document.getElementById("businessName2");
            businessName2.innerHTML = `${response.business_name}`;

            let businessName3 = document.getElementById("businessName3");
            businessName3.innerHTML = `${response.business_name}`;


            $("#tenant-compartment").DataTable({
                data: response.compartmentObjectlist,
                columns: [
                    {"data": "id"},
                    {
                        "data": function (row) {
                            return "Space ID : " + row.compartmentNumber + "<br> Floor : " + row.floorNumber;

                        },
                        "sortable": false,
                        "searchable": false
                    },
                    {
                        "data": function (row) {
                            return "$" + row.rentalRate;
                        }
                    },

                    {
                        "data": function (row) {
                            return row.floorArea + " &#13217";
                        }
                    },
                    {
                        "data": function (row) {
                            return "$" +Math.round((row.floorArea * row.rentalRate + Number.EPSILON) * 100) / 100;
                        }
                    },
                    {
                        "data": function (row) {
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="view-compartment.html" onclick="setLocalCompartment('` + row.id + `')">View</a>
                                </div>`
                        },
                        "sortable": false,
                        "searchable": false
                    }
                ]
            })


        }
    })
    $.ajax({
        url: '/api/tenant/fetchfile/' + id,
        type: 'GET',
        success: function (response) {
            console.log(response);
            if (response.length == 0) {
                let processing = document.getElementById("processing");
                processing.setAttribute("style", "display:none");

                let notAvailable = document.getElementById("notavailable");
                notAvailable.setAttribute("style", "display:all");

                let found = document.getElementById("documents");
                found.setAttribute("style", "display:none");
            } else {
                setLocalfile(id);
                setLocalfiles(response[0].application_letter, response[0].article, response[0].bank_statement, response[0].cr6_form, response[0].cr14_form, response[0].director_id, response[0].tax_clearance, response[0].vat_reg, response[0].certificate_of_incorporation);

                let processing = document.getElementById("processing");
                processing.setAttribute("style", "display:none");

                let notAvailable = document.getElementById("notavailable");
                notAvailable.setAttribute("style", "display:none");

                let found = document.getElementById("documents");
                found.setAttribute("style", "display:all");
            }

        }
    })

}


function getTenantsAssign() {
 /*   $.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var tenant_list = document.getElementById("tenant_list");
            // while (tenant_list.hasChildNodes()) {
            //     tenant_list.removeChild(tenant_list.firstChild);
            // }

            for (let i = 0; i < items.length; i++) {
                let html =
                    `<option>${items[i].name} ${items[i].surname}</option>`

                let tr = document.createElement("option");


                tr.innerHTML = html;

                tenant_list.appendChild(tr);

            }

        }

    })*/

    $.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var buildings = document.getElementById("building_option");
//             let btn = document.getElementById("btnSub")
//             let html2 = `                              <button class="btn btn-primary" onclick="getCompartmentDetails()">ok</button>
// `

            // while (tenant_list.hasChildNodes()) {
            //     tenant_list.removeChild(tenant_list.firstChild);
            // }

            for (let i = 0; i < items.length; i++) {
                let html =
                    `<option value="${items[i].id}" >${items[i].name}</option>`

                let tr = document.createElement("option");


                tr.innerHTML = html;

                buildings.appendChild(tr);


            }

            // $("building_option").change(getCompartmentDetails($("building_option").value()));

        }


    })
}


function getCompartmentDetails() {

    $.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            let buildings = response

            console.log($("#building_option").val());

            let prop = document.getElementById("building_option").value;


            for (let i = 0; i < buildings.length; i++) {

                if (buildings[i].name === prop) {

                    console.log(buildings[i].id);
                    let id = buildings[i].id;

                    $.ajax({
                        url: '/api/compartment/get-compartments-for-specific-property/' + id,
                        type: 'GET',
                        data: {id},
                        success: function (response) {
                            let compartments = response

                            console.log(response)


                            let fl = document.getElementById("compartmentDropdown");
                            // while (tenant_list.hasChildNodes()) {
                            //     tenant_list.removeChild(tenant_list.firstChild);
                            // }

                            for (let i = 0; i < compartments.length; i++) {
                                // if (compartments[i].status){
                                let html =
                                    `<option value="${compartments[i].id}">${compartments[i].compartmentNumber}</option>`

                                let tr = document.createElement("option");


                                tr.innerHTML = html;

                                fl.appendChild(tr);
                            }

                        }

                    })


                }
            }


        }


    })

}


function searchFilter() {
    let items = JSON.parse(localStorage.getItem("properties"));

    let field = document.getElementById("propertySearch").value;

    let t_body = document.getElementById("t_body");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    for (let i = 0; i < items.length; i++) {
        let string = JSON.stringify(items[i])

        if (string.toLowerCase().includes(field.toLowerCase())) {
            let new_html = `<td>
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="2474">
                              <label class="custom-control-label" for="2474"></label>
                            </div>
                          </td>
                          <td>
                            <div class="avatar avatar-md">
                              <img src="assets/avatars/office-building.png" alt="..." class="avatar-img rounded-circle">
                            </div>
                          </td>
                          <td>
<!--                            <p class="mb-0 text-muted"><strong>Brown, Asher D.</strong></p>-->
                            <small class="mb-0 text-muted">${items[i].id}</small>
                          </td>
                          <td>
                            <p class="mb-0 text-muted">${items[i].name}</p>
                            <small class="mb-0 text-muted">${items[i].addressObject.address}</small>
                          </td>
                          <td>
                            <p class="mb-0 text-muted"><a href="#" class="text-muted">${items[i].propertyContactObject.phone} ${items[i].propertyContactObject.mobileNumber}</a></p>
                            <small class="mb-0 text-muted">${items[i].propertyContactObject.email}</small>
                          </td>
                          <td class="w-25">
                          <p class="mb-0 text-muted">${items[i].ownerObject.name} ${items[i].ownerObject.lastName}</p>
                          <small class="text-muted"> ${items[i].ownerObject.contactDetailsObject.mobileNumber} ${items[i].ownerObject.contactDetailsObject.email} </small>
                          </td>
                          <td class="text-muted">13/09/2020</td>
                          <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="text-muted sr-only">Action</span>
                          </button>
                            <div class="dropdown-menu dropdown-menu-right"  >
                              <a class="dropdown-item" href="edit_property.html" onclick="setLocal('${items[i].id}')">Edit</a>
                              <a class="dropdown-item" href="view-property.html" onclick="setLocal('${items[i].id}','${items[i].name}')">View</a>
<!--                              <a class="dropdown-item" href="#">Assign</a>-->
                            </div>
                          </td>`


            let tr = document.createElement("tr");

            tr.innerHTML = new_html;

            t_body.appendChild(tr);
        }
    }
}

/************************************compartment section******************************************************/

function setAddPropertyDropDown() {
    $.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            console.log(response)
            let dropDown = document.getElementById("property-dropdown");

            /* while (dropDown.hasChildNodes()) {
                 dropDown.removeChild(dropDown.firstChild);
             }*/

            for (let i = 0; i < response.length; i++) {
                let option = document.createElement("option");

                option.text = response[i].name;
                option.setAttribute("value", `${response[i].id}`)

                dropDown.appendChild(option);
            }
        }
    })
}

function setAddTenantDropDown() {
   /* $.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            console.log(response)
            let dropDown = document.getElementById("tenant_list");

            while (dropDown.hasChildNodes()) {
                dropDown.removeChild(dropDown.firstChild);
            }
            let option = document.createElement("option");

            option.text = "Available Business";
            dropDown.appendChild(option);

            for (let i = 0; i < response.length; i++) {
                let option = document.createElement("option");

                option.text = response[i].business_name;
                option.setAttribute("value", `${response[i].id}`)

                dropDown.appendChild(option);
            }
        }
    })*/



    /*tenant dropdown*/
    var baseurl = "/api/tenants/get-all-tenants";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var data = JSON.parse(xmlhttp.responseText);


            var url = "/api/v1/lease/getleases";
            var xxx = new XMLHttpRequest();
            xxx.open("GET", url, true);
            xxx.onreadystatechange = function () {

                if (xxx.readyState == 4 && xxx.status == 200) {


                    var leases = JSON.parse(xxx.responseText);

                    for (let i = 0; i < data.length; i++ ){
                        data[i].leases = [];
                        for (let j = 0; j < leases.length; j++){
                            if (data[i].id == leases[j].tenant_id){

                                data[i].leases.push(leases[j]);
                            }
                        }
                    }

                    console.log(data);



                 /*   Fillling*/

                    let dropDown = document.getElementById("tenant_list");

                    while (dropDown.hasChildNodes()) {
                        dropDown.removeChild(dropDown.firstChild);
                    }
                    let option = document.createElement("option");

                    option.text = "Available Business";
                    dropDown.appendChild(option);

                    for (let i =0;i<data.length;i++){
                        if (data[i].leases.length.toString()==="0"){
                            let option = document.createElement("option");

                            option.text = data[i].business_name;
                            option.setAttribute("value", `${data[i].id}`)

                            dropDown.appendChild(option);
                        }else{

                           var terminated = new Boolean(false);

                            for ( let j =0;j<data[i].leases.length;j++){

                                if(data[i].leases[j].status==="Expired"){

                                    terminated = false
                                }
                                else if(data[i].leases[j].status==="Active"){

                                    terminated = false
                                }
                                else if(data[i].leases[j].status==="Terminated"){
                                    terminated=true;
                                    break;
                                }
                            }
                            if(terminated===false){
                                let option = document.createElement("option");

                                option.text = data[i].business_name;
                                option.setAttribute("value", `${data[i].id}`);

                                dropDown.appendChild(option);
                            }
                        }

                    }


                   /* let dropDown = document.getElementById("tenant_list");

                    while (dropDown.hasChildNodes()) {
                        dropDown.removeChild(dropDown.firstChild);
                    }
                    let option = document.createElement("option");

                    option.text = "Available Business";
                    dropDown.appendChild(option);
                     for (let i = 0; i < response.length; i++) {
                        let option = document.createElement("option");

                        option.text = response[i].business_name;
                        option.setAttribute("value", `${response[i].id}`)

                        dropDown.appendChild(option);
                    }*/

              /*   filling*/

                }
            }
            xxx.send();


        }
    };
    xmlhttp.send();


    /*tenant dropdown*/


}


function tenantAssignLocalTenant(tenant_id) {
    localStorage.removeItem("tenant_id");
    localStorage.setItem("tenant_id", JSON.stringify(tenant_id));


}

function tenantAssignLocalCompartment(compartment_id) {
    localStorage.removeItem("compartment_id");
    localStorage.setItem("compartment_id", JSON.stringify(compartment_id));
}

function onSetTenants() {

    // console.log("tenant_id");
    var select = document.getElementById("tenant_list");

    var selected = select.options[select.selectedIndex];


    // setDropDownLocal(id);
    var tenant_id = selected.value;
    console.log(tenant_id);

    tenantAssignLocalTenant(tenant_id)


}

function onSetProperty() {
    var select = document.getElementById("property-dropdown");

    var selected = select.options[select.selectedIndex];


    // setDropDownLocal(id);
    var compartment_id = selected.value;


    setAddCompartmentDropDown(compartment_id);
    tenantAssignLocalCompartment(compartment_id)
}

function setAddCompartmentDropDown(compartment_id) {

    $.ajax({

        url: '/api/compartment/get-compartments-for-specific-property/' + compartment_id,
        type: 'GET',
        success: function (response) {
            console.log(response)
            let dropDown = document.getElementById("compartmentDropdown");

            while (dropDown.hasChildNodes()) {
                dropDown.removeChild(dropDown.firstChild);
            }
            let option = document.createElement("option");

            option.text = "Select Compartment";
            option.value="";
            dropDown.appendChild(option);


            for (let i = 0; i < response.length; i++) {
                if (response[i].status != "1") {
                    let option = document.createElement("option");

                    option.text = response[i].compartmentNumber;
                    option.setAttribute("value", `${response[i].id}`);

                    dropDown.appendChild(option);
                }
            }


        }
    })
}

function setTenantOnCompartment() {
    //let id = JSON.parse(localStorage.getItem("compartment_id"));

    var id = document.getElementById("compartmentDropdown").value

    let tenant_id = JSON.parse(localStorage.getItem("tenant_id"));
    console.log(id);
    console.log(tenant_id)
    var data = {
        "tenant": tenant_id,
        "status": "1"
    };
    $.ajax({

        url: '/api/compartment/update-compartment/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function () {
            $('#assignedModal').modal('show')


        }
    });

    $("#assign_form")[0].reset();

}


function setTenantOnCompartment2() {

    var kombartment = document.getElementById("compartmentDropdown").value;
    if (kombartment.toString()==""){
        var assigning = document.getElementById("ldID");
        assigning.setAttribute("style","display:all;background: none;color: red;border: none;font-size: 20px");
        assigning.innerHTML=`No Lettable Space Selected
                                            <span class=" fe fe-24 fe-alert-triangle"></span>`

        return
    }
    var assigning = document.getElementById("ldID")
    assigning.setAttribute("style","display:all;background: none;color: green;border: none;font-size: 20px");
    assigning.innerHTML=` Assigning ...
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

    //let id = JSON.parse(localStorage.getItem("compartment_id"));

    var id = document.getElementById("compartmentDropdown").value

    let tenant_id = JSON.parse(localStorage.getItem("t_id"));
    console.log(id);
    console.log(tenant_id)
    var data = {
        "tenant": tenant_id,
        "status": "1"
    };
    $.ajax({

        url: '/api/compartment/update-compartment/' + id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function () {
           /* $('#assignedModal').modal('show')*/
            var assigning = document.getElementById("ldID");
            assigning.setAttribute("style","display:all;background: none;color: green;border: none;font-size: 20px");
            assigning.innerHTML=`Assigned Successfully
                                            <span class=" fe fe-24 fe-check"></span>`

            var b = document.getElementById("liveAlertBtn2");
            b.setAttribute("style","display:none");

            var b2 = document.getElementById("Close2");
            b2.setAttribute("style","display:all");

            var b3 = document.getElementById("hhh");
            b3.setAttribute("style","display:none")

            console.log("Assinged sukkessfully");
        }
    });

    $("#assign_form")[0].reset();

}

