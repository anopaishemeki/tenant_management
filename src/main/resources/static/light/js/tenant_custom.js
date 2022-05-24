function setLocal(id){
    localStorage.removeItem("id");
    localStorage.setItem("id", JSON.stringify(id));
    alert(id)
}

function toggleView(id) {
    let active = document.getElementById(id);

    let local = localStorage.getItem("id")
    let deactivate = document.getElementById(local);
    deactivate.classList.add("hide-sections")

    active.classList.remove("hide-sections")

    localStorage.setItem("deactivate", id);
}

function getProperties(){
    $.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for(let i = 0; i < items.length; i++){
                let new_html = `<td>
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="2474">
                              <label class="custom-control-label" for="2474"></label>
                            </div>
                          </td>
                          <td>
                            <div class="avatar avatar-md">
                              <img src="./assets/avatars/face-3.jpg" alt="..." class="avatar-img rounded-circle">
                            </div>
                          </td>
                          <td>
<!--                            <p class="mb-0 text-muted"><strong>Brown, Asher D.</strong></p>-->
                            <small class="mb-0 text-muted">${items[i].id}</small>
                          </td>
                          <td>
                            <p class="mb-0 text-muted">${items[i].name}</p>
                            <small class="mb-0 text-muted">Ap #331-7123 Lobortis Avenue</small>
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
                              <a class="dropdown-item" href="#">View</a>
<!--                              <a class="dropdown-item" href="#">Assign</a>-->
                            </div>
                          </td>`


                let tr = document.createElement("tr");

                tr.innerHTML = new_html;

                t_body.appendChild(tr);
            }
        }
    })
}

function  saveProperty(){
    let  name = document.getElementById("propertyName").value
    let  address = "";
    let  tenant = "";
    let  insurance = ""
    let  description = document.getElementById("description").value
    let  propertyType = document.getElementById("propertyType").value
    let  owner = ""
    let  assetValue = document.getElementById("assetValue").value;

    //property contact details
    let propertyEmail = document.getElementById("propertyEmail").value;
    let propertyPhone = document.getElementById("propertyPhone").value;
    let propertMobileNumber = document.getElementById("propertMobileNumber").value;


    //owner Object properties
    let ownerName = document.getElementById("ownerFirstName").value;
    let ownerLastname = document.getElementById("ownerLastName").value;

    let OwnerAddressAddress = document.getElementById("ownerAddress").value;
    let owerZipCode = document.getElementById("ownerZipCode").value;
    let ownerCity = document.getElementById("ownerCity").value;
    let ownerCountry = document.getElementById("ownerCountry").value;

    let ownerPhone = document.getElementById("ownerPhone").value;
    let ownerCell = document.getElementById("ownerCellNumber").value;
    let ownerEmail = document.getElementById("ownerEmailAddress").value;

    //property address object properties
    let propertyAddressAddress = document.getElementById("propertyAddress").value;
    let propertyZipCode = document.getElementById("propertyZipCode").value;
    let propertyCity = document.getElementById("propertyCity").value;
    let propertyCountry = document.getElementById("propertyCountry").value;

    let data = {
        name,
        addressObject: {
            address : propertyAddressAddress,
            zipCode : propertyZipCode,
            city : propertyCity,
            country : propertyCountry,
            property : 0
        },
        address,
        tenant,
        insurance,
        description,
        propertyType,
        ownerObject : {
            name : ownerName,
            lastName : ownerLastname,
            address : "",
            addressObject : {
                address : OwnerAddressAddress,
                zipCode: owerZipCode,
                city: ownerCity,
                country : ownerCountry,
                property : 0
            },
            contactDetailsObject : {
                phone: ownerPhone,
                MobileNumber : ownerCell,
                email : ownerEmail
            }
        },
        propertyContactObject : {
            phone : propertyEmail,
            mobileNumber : propertyPhone,
            email : propertMobileNumber
        },
        owner,
        assetValue
    }

    $.ajax({
        url: '/api/property/save-property',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            alert("success" + response)
            console.log(response)
            // getProperties();
        }
    })
}

//Property Details
function editPropertyDetails(id){
    $.ajax({
        url: '/api/property/get-property/'+id,
        type: 'GET',
        success: function (response) {

            let html = `<div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="propertyName">Property Name</label>
                            <input type="text" class="form-control" id="propertyName" placeholder="${response.name}">
                          </div>
                            <div class="form-group col-md-6">
                                <label for="propertyType">Property Type</label>
                                <select id="propertyType" class="form-control">
                                    <option selected>Choose...</option>
                                    <option value="Multi Story"> Multi Story</option>
                                    <option value="Complex Building">Complex Building</option>
                                    <option value="Shopping Mall">Shopping Mall</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="assetValue">Property Value</label>
                          <input type="number" class="form-control" id="assetValue" placeholder="${response.assetValue}">
                        </div>
                        <div class="form-row">
                          <div class="col-md-12 mb-4">
                            <div class="card shadow">
                              <div class="card-body">
                                <div class="form-group mb-3">
                                  <label for="description">Description</label>
                                  <textarea class="form-control" id="description" rows="4" placeholder="${response.description}"></textarea>
                                </div>
                              </div> <!-- /.card-body -->
                              <hr class="my-4">
                              <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Property Details</span></button>
                            </div> <!-- /.card -->
                          </div> <!-- /.col -->
                        </div>`



            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;

        }
    })
}

function updatePropertyDetails(id){
    let  name = document.getElementById("propertyName").value
    let  description = document.getElementById("description").value
    let  propertyType = document.getElementById("propertyType").value
    let  propertyAssetValue = document.getElementById("assetValue").value;

    let data = {
        name : name,
        description :description,
        propertyType : propertyType,
        assetValue : propertyAssetValue
    }

    $.ajax({
        url: '/api/property/update-property/'+id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {

            editPropertyDetails(id);
            alert("Update Completed Successfully");

            /*let html =  `<div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="propertyName">Property Name</label>
                            <input type="text" class="form-control" id="propertyName" placeholder="${response.name}">
                          </div>
                            <div class="form-group col-md-6">
                                <label for="propertyType">Property Type</label>
                                <select id="propertyType" class="form-control">
                                    <option selected>Choose...</option>
                                    <option value="Multi Story"> Multi Story</option>
                                    <option value="Complex Building">Complex Building</option>
                                    <option value="Shopping Mall">Shopping Mall</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="assetValue">Property Value</label>
                          <input type="number" class="form-control" id="assetValue" placeholder="${response.assetValue}">
                        </div>
                        <div class="form-row">
                          <div class="col-md-12 mb-4">
                            <div class="card shadow">
                              <div class="card-body">
                                <div class="form-group mb-3">
                                  <label for="description">Description</label>
                                  <textarea class="form-control" id="description" rows="4" placeholder="${response.description}"></textarea>
                                </div>
                              </div> <!-- /.card-body -->
                              <hr class="my-4">
                              <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Property Details</span></button>
                            </div> <!-- /.card -->
                          </div> <!-- /.col -->
                        </div>`

            let container = document.getElementById("update_propertyDetails");

            container.innerHTML = html;*/
        }
    })
}

/*function discardEditPropertyDetailsChanges(id){
    $.ajax({
        url: '/api/property/get-property/'+id,
        type: 'GET',
        success: function (response) {
            let html =  `<div class="col-sm-6">
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
}*/

//Property Address
function editPropertyAddress(id){
    $.ajax({
        url: '/api/address/get-address/'+id,
        type: 'GET',
        success: function (response) {

            let html = `<div class="form-group">
                            <label for="propertyAddress">Address</label>
                            <input type="text" class="form-control" id="propertyAddress" placeholder="${response.address}">
                          </div>
                          <!--<div class="form-group">
                            <label for="inputAddress2">Address 2</label>
                            <input type="text" class="form-control" id="inputAddress6" placeholder="Apartment, studio, or floor">
                          </div>-->
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="propertyCity">City</label>
                              <input type="text" class="form-control" id="propertyCity" placeholder="${response.city}">
                            </div>
                            <div class="form-group col-md-4">
                              <label for="propertyCountry">Country</label>
                              <select id="propertyCountry" class="form-control">
                                <option selected>${response.country}</option>
                                <option>...</option>
                              </select>
                            </div>
                            <div class="form-group col-md-2">
                              <label for="propertyZipCode">Zip</label>
                              <input type="text" class="form-control" id="propertyZipCode" ${response.country}>
                            </div>
                          </div>
                          <hr class="my-4">
                          <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyAddress('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Address</span></button>
                       `

            let container = document.getElementById("update_PropertyAddress");
            container.innerHTML = html;

        }
    })
}

function updatePropertyAddress(id){
    //property address object properties
    let name = document.getElementById("propertyAddress").value;
    let address = document.getElementById("propertyAddress").value;
    let zipCode = document.getElementById("propertyZipCode").value;
    let country = document.getElementById("propertyCountry").value;
    let city = document.getElementById("propertyCity").value;


    let data = {
        name,
        address,
        zipCode,
        city,
        country
    }

    $.ajax({
        url: ' /api/address/update-address/'+id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response);
            alert("Update Completed Successfully");


            editPropertyAddress(id);
        }
    })
}

/*function discardEditPropertyAddress(id){
    $.ajax({
        url: '/api/address/get-address/'+id,
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
}*/

//Property Owner Details
function editPropertyOwnerDetails(id){
    $.ajax({
        url: '/api/owner/get-owner/'+id,
        type: 'GET',
        success: function (response) {
            let html = `<div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="ownerFirstName">Firstname</label>
                              <input type="text" id="ownerFirstName" class="form-control" placeholder="${response.name}">
                            </div>
                            <div class="form-group col-md-6">
                              <label for="ownerLastName">Lastname</label>
                              <input type="text" id="ownerLastName" class="form-control" placeholder="${response.lastName}">
                            </div>
                          </div>
                          <hr class="my-4">
                          <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyOwnerDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Owner</span></button>
                        `

            let container = document.getElementById("update_PropertyOwnerDetails");
            container.innerHTML = html;
        }
    })
}

function updatePropertyOwnerDetails(id){
    let name = document.getElementById("ownerFirstName").value;
    let lastName = document.getElementById("ownerFirstName").value;

    let data = {
        name,
        lastName
    }

    $.ajax({
        url: '/api/owner/update-owner/'+id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            editPropertyOwnerDetails(id)
        }
    })
}

/*function discardEditPropertyOwnerDetails(id){
    $.ajax({
        url: '/api/owner/get-owner/'+id,
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
}*/

//Property Owner Address
function editPropertyOwnerAddress(id){
    $.ajax({
        url: '/api/address/get-address/'+id,
        type: 'GET',
        success: function (response) {
            let html = `                          <hr class="my-4">
                          <h5 class="mb-2 mt-4">Address</h5>
                          <p class="mb-4">Input Property Owner Address</p>
                          <div class="form-row">
                            <div class="form-group col-md-12">
                              <div class="form-group">
                                <label for="ownerAddress">Address</label>
                                <input type="text" class="form-control" id="ownerAddress" placeholder="${response.address}">
                              </div>
                            </div>
                          </div>
                          <div class="form-row">
                            <div class="form-group col-md-4">
                              <label for="ownerZipCode">Zip code</label>
                              <input class="form-control input-zip" id="ownerZipCode" ${response.country}>
                            </div>
                            <div class="form-group col-md-4">
                              <label for="ownerCountry">Country</label>
                              <select id="ownerCountry" class="form-control">
                                <option valye="">${response.country}</option>
                                <option>...</option>
                              </select>
                            </div>
                            <div class="form-group col-md-4">
                              <label for="ownerCity">City</label>
                             <input type="text" class="form-control" id="ownerCity" placeholder="${response.city}">
                        
                            </div>
                          </div>
                          <hr class="my-4">
                          <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyOwnerAddress('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Address</span></button>
                        `

            let container = document.getElementById("update_PropertyOwnerAddress");
            container.innerHTML = html;
        }
    })
}

function updatePropertyOwnerAddress(id){
    let address = document.getElementById("ownerAddress").value;
    let zipCode = document.getElementById("ownerZipCode").value;
    let city = document.getElementById("ownerCity").value;
    let country = document.getElementById("ownerCountry").value;

    let data = {
        address,
        zipCode,
        city,
        country
    }

    $.ajax({
        url: ' /api/address/update-address/'+id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            editPropertyOwnerAddress(id);
        }
    })
}

function discardEditPropertyOwnerAddress(id){
    $.ajax({
        url: '/api/address/get-address/'+id,
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
function editPropertyOwnerContactDetails(id){
    $.ajax({
        url: '/api/contact-details/get-contact-details/'+id,
        type: 'GET',
        success: function (response) {

            let html = `<div class="form-row">
                                <div class="form-group col-md-12">
                                    <label for="ownerEmailAddress">Email</label>
                                    <input type="email" class="form-control" id="ownerEmailAddress" placeholder="${response.email}">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="ownerPhone">Phone</label>
                                    <input type="text" class="form-control" id="ownerPhone" placeholder="${response.phone}">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="ownerCellNumber">Mobile Number</label>
                                    <input type="text" class="form-control" id="ownerCellNumber" placeholder="${response.mobileNumber}">
                                </div>
                            </div>
                            <hr class="my-4">
                            <button type="button" class="btn mb-2 btn-outline-success" onclick="updatePropertyOwnerContactDetails('${id}')"><span class="fe fe-upload-cloud fe-16"> Update Contacts</span></button>
`


            let container = document.getElementById("update_PropertyOwnerContactDetails");
            container.innerHTML = html;
        }
    })
}

function updatePropertyOwnerContactDetails(id){
    let phone = document.getElementById("ownerPhone").value;
    let MobileNumber = document.getElementById("ownerCellNumber").value;
    let email = document.getElementById("ownerEmailAddress").value;

    let data = {
        phone,
        MobileNumber,
        email
    }

    $.ajax({
        url: ' /api/contact-details/update-contact-details/'+id,
        type: 'PUT',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            editPropertyOwnerContactDetails(id);
        }
    })
}

function discardEditPropertyOwnerContactDetails(id){
    $.ajax({
        url: '/api/contact-details/get-contact-details/'+id,
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


function setPropertyDetails(){
    let id = JSON.parse(localStorage.getItem("id"))

    let url = '/api/property/get-property/'+id

    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            editPropertyDetails(id);
            editPropertyAddress(response.address);
            editPropertyOwnerDetails(response.owner);
            alert("owner" + response.owner)
            editPropertyOwnerAddress(response.ownerObject.address);
            editPropertyOwnerContactDetails(response.ownerObject.contactDetailsObject.id);
        }
    })
}

