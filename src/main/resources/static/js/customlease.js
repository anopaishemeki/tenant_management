



//Save Lesase
$(document).ready(function () {

    $(".alert-success").hide();
    $(".alert-danger").hide();
    $("#btnSubmit").click(function () {

        if (document.getElementById("buildingName").val() == "") {
            window.alert("Name Is Required");
        }

        var file = $('#fileUploadForm')[0];
        var data = new FormData(file);


        var jsonDataObj = {
            "name": $("#leaseName").val(),
            "buildingName": $("#buildingName").val(),
            "buildingLocation": $("#buildingLocation").val(),
            "rentalFee": $("#rentalFee").val(),
            "startDate": $("#startDate").val(),
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


                console.log("SUCCESS : ", data);
                $("#btnSubmit").prop("disabled", false);
                $(".alert-success").show();
                $(".alert-danger").hide();


            },
            error: function (e) {

                $(".alert-success").hide();
                $(".alert-danger").show();
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);

            }

        });

    });

});


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
// Terminating Lease

function Terminate() {
    var id = JSON.parse(localStorage.getItem("id"));
    let status="Terminated";

    let data={
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
            let ar =document.getElementById("alrt");
            let btn=document.getElementById("liveAlertBtn");

            ar.style.visibility("hidden");
            btn.style.visibility("hidden");

        }
        ,
        error: function (e) {

            console.log("ERROR : ", e.message);


        }
    });
}
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper);
}

if (alertTrigger) {
    alertTrigger.addEventListener('click', function () {
        alert('Lease Terminated Successfully !!', 'success')
    })
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
            let rentalFee=document.getElementById("rentalFee");
            let duration=document.getElementById("duration");
            let startDate=document.getElementById("startDate");
            let agreementDate=document.getElementById("agreementDate");
            let status=document.getElementById("status");
            let endDate=document.getElementById("endDate");
            let floorNumber=document.getElementById("floorNumber");
            let timeLeft=document.getElementById("timeLeft");
            let terms=document.getElementById("terms");







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
            terms.placeholder=`${response.terms}`;


                tenantName.setAttribute("disabled",true);
                buildingName.setAttribute("disabled",true);
                buildingLocation.setAttribute("disabled",true);
                rentalFee.setAttribute("disabled",true);
                duration.setAttribute("disabled",true);
                startDate.setAttribute("disabled",true);
                agreementDate.setAttribute("disabled",true);
                floorNumber.setAttribute("disabled",true);
                terms.setAttribute("disabled",true);







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
            let rentalFee=document.getElementById("rentalFee");
            let duration=document.getElementById("duration");
            let startDate=document.getElementById("startDate");
            let agreementDate=document.getElementById("agreementDate");
            let status=document.getElementById("status");
            let endDate=document.getElementById("endDate");
            let floorNumber=document.getElementById("floorNumber");
            let timeLeft=document.getElementById("timeLeft");
            let terms=document.getElementById("terms");
            let btnSubmit=document.getElementById("btnSaveUpdate");
           let tlError=document.getElementById("TenantleaseError")






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
            terms.placeholder=`${response.terms}`;

            let terminate="Terminated";
            let Cstatus=`${response.status}`;
            if(terminate==Cstatus){
                tenantName.setAttribute("disabled",true);
                buildingName.setAttribute("disabled",true);
                buildingLocation.setAttribute("disabled",true);
                rentalFee.setAttribute("disabled",true);
                duration.setAttribute("disabled",true);
                startDate.setAttribute("disabled",true);
                agreementDate.setAttribute("disabled",true);
                floorNumber.setAttribute("disabled",true);
                terms.setAttribute("disabled",true);
                btnSubmit.setAttribute("disabled",true);
                tlError.style.visibility="visible";


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

            var t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let html = `<td>  ${items[i].id}
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
                            <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setLocal('${items[i].id}')" href="#">Terminate</a>
                            <a class="dropdown-item" href="./LeaseDetail.html" onclick="setLocal('${items[i].id}')">View More</a>
                        </div>
                    </td>`


                let tr = document.createElement("tr");
                // tr.className = "row"

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

