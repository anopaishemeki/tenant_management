function getTenants() {
    $.ajax({
        url: 'http://localhost:8090/api/tenants/get-all-tenants',
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
                let html = `<tr class="accordion-toggle collapsed" id="c-2474" data-toggle="collapse" data-parent="#c-2474" href="#collap-2474 ${items[i].id}">
                            <td>${items[i].id}</td>
                            <td>${items[i].name} ${items[i].surname}</td>
                            <td>${today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}</td>
                            <td>${items[i].shop_number}</td>
                            
                            <td><span class="badge badge-pill badge-success mr-2">S</span><small class="text-muted">${items[i].rent_status}</small></td>
                            <td>${items[i].deposit}</td>
                            <td>${items[i].rental_fee}</td>
                            <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
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
    })
}


function saveTenant() {
    let name = document.getElementById("name").value
    let property = "Joina City";
    let lease = " Active"
    let surname = document.getElementById("surname").value
    let email = document.getElementById("email").value
    let id_passport = document.getElementById("passport").value;

    //property contact details
    let phone = document.getElementById("phone").value;
    let deposit = document.getElementById("deposit").value;


    //owner Object properties
    let rental_fee = document.getElementById("rent").value;
    let business_name = document.getElementById("business_name").value;

    let business_type = document.getElementById("business_type").value;
    let services = document.getElementById("services").value;
    let shop_number = document.getElementById("shop_no").value;
    let street = document.getElementById("street").value;


    let city = document.getElementById("city").value;
    let house_no = document.getElementById("house").value;
    let country = document.getElementById("country").value;

    //property address object properties
    let rent_status = "Paid";


    let data = {
        city,
        country,
        house_no,
        street,
        deposit,
        email,
        id_passport,
        lease,
        name,
        phone,
        property,
        rent_status,
        rental_fee,
        surname,
        business_name,
        business_type,
        services,
        shop_number
    }

    $.ajax({
        url: 'http://localhost:8090/api/tenants/addTenant',
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


//to view tenant details
function viewTenant(id) {
    console.log("Working!");
    $("#tenant_table").addClass("d-none");
    $("#view_Tenant").addClass("d-block");
    var view_tenant = document.getElementById("view_Tenant");


    $.ajax({
        url: 'http://localhost:8090/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            let items = response

            let tenant_profile_html = `
                <div class="row justify-content-center">
                          <div class="col-12">
                            <h2 class="h3 mb-4 page-title text-muted">Tenant id: ${items[id].id}</h2>
                            <div class="row mt-5 align-items-center">
<!--                              <div class="col-md-3 text-center mb-5">-->
<!--                                <div class="avatar avatar-xl">-->
<!--                                  <img src="../../assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">-->
<!--                                </div>-->
<!--                              </div>-->
                              <div class="col">
                                <div class="row align-items-center">
                                  <div class="col-md-7">
                                    <h4 class="mb-1">${items[id].name} ${items[id].surname}</h4>
                                    <p class="small mb-3"><span class="badge badge-dark">${items[id].city}, ${items[id].country}</span></p>
                                  </div>
                                </div>
                                <div class="row mb-4">
                                  <div class="col-md-7">
                                    <p class="text-muted"><strong> Identification No:</strong>  ${items[id].id_passport} <br> <strong>Email Address:</strong>  ${items[id].email} <br> <strong>Phone Number:</strong>  ${items[id].phone} </p>
                                  </div>
                                  <div class="col">
                                    <p class="small mb-0 text-muted">House ${items[id].house_no}</p>
                                    <p class="small mb-0 text-muted">P.O. Box 464, ${items[id].city}</p>
                                    <p class="small mb-0 text-muted">${items[id].country}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row my-4">
                              <div class="col-md-4">
                                <div class="card mb-4 shadow">
                                  <div class="card-body my-n3">
                                    <div class="row align-items-center">
                                      <div class="col-3 text-center">
<!--                          <span class="circle circle-lg bg-light">-->
<!--&lt;!&ndash;                            <i class="fe fe-user fe-24 text-primary"></i>&ndash;&gt;-->
<!--                          </span>-->
                                      </div> <!-- .col -->
                                      <div class="col">
                                        <a href="#">
                                          <h3 class="h5 mt-4 mb-1">Services to Personal</h3>
                                        </a>
                                        <p class="text-muted">
                                        <ul class="list-unstyled">
                                        <li>Parking</li>
                                        <li>.</li>
                                        <li>.</li>
                                        <li>.</li>
</ul></p>
                                      </div> <!-- .col -->
                                    </div> <!-- .row -->
                                  </div> <!-- .card-body -->
<!--                                  <div class="card-footer">-->
<!--                                    <a href="" class="d-flex justify-content-between text-muted"><span>Account Settings</span><i class="fe fe-chevron-right"></i></a>-->
<!--                                  </div> &lt;!&ndash; .card-footer &ndash;&gt;-->
                                </div> <!-- .card -->
                              </div> <!-- .col-md-->
                              <div class="col-md-4">
                                <div class="card mb-4 shadow">
                                  <div class="card-body my-n3">
                                    <div class="row align-items-center">
                                      <div class="col-3 text-center">
<!--                          <span class="circle circle-lg bg-light">-->
<!--&lt;!&ndash;                            <i class="fe fe-shield fe-24 text-primary"></i>&ndash;&gt;-->
<!--                          </span>-->
                                      </div> <!-- .col -->
                                      <div class="col">
                                        <a href="#">
                                          <h3 class="h5 mt-4 mb-1">Business Details</h3>
                                        </a>
                                        <p class="text-muted">
                                        <ul class="list-unstyled">
                                        <li><strong>Name:</strong> ${items[id].business_name}</li>
                                        <li><strong>Type:</strong> ${items[id].business_type}</li>
                                        <li><strong>Shop No:</strong> ${items[id].shop_number}</li>
                                        <li><strong>Services:</strong> ${items[id].services}</li>
</ul></p>
                                      </div> <!-- .col -->
                                    </div> <!-- .row -->
                                  </div> <!-- .card-body -->
<!--                                  <div class="card-footer">-->
<!--                                    <a href="" class="d-flex justify-content-between text-muted"><span>Security Settings</span><i class="fe fe-chevron-right"></i></a>-->
<!--                                  </div> &lt;!&ndash; .card-footer &ndash;&gt;-->
                                </div> <!-- .card -->
                              </div> <!-- .col-md-->
                              <div class="col-md-4">
                                <div class="card mb-4 shadow">
                                  <div class="card-body my-n3">
                                    <div class="row align-items-center">
                                      <div class="col-3 text-center">
<!--                          <span class="circle circle-lg bg-light">-->
<!--&lt;!&ndash;                            <i class="fe fe-bell fe-24 text-primary"></i>&ndash;&gt;-->
<!--                          </span>-->
                                      </div> <!-- .col -->
                                      <div class="col">
                                        <a href="#">
                                          <h3 class="h5 mt-4 mb-1">Notifications</h3>
                                        </a>
                                        <p class="text-muted">
                                        <ul class="list-unstyled">
                                        <li>Maintance Due</li>
                                        <li>Missing Documents</li>
                                        <li>Lease Updated</li>
                                        <li>Late Rent</li>
                                        </ul></p>
                                      </div> <!-- .col -->
                                    </div> <!-- .row -->
                                  </div> <!-- .card-body -->
<!--                                  <div class="card-footer">-->
<!--                                    <a href="" class="d-flex justify-content-between text-muted"><span>Notification Settings</span><i class="fe fe-chevron-right"></i></a>-->
<!--                                  </div> &lt;!&ndash; .card-footer &ndash;&gt;-->
                                </div> <!-- .card -->
                              </div> <!-- .col-md-->
                            </div> <!-- .row-->
                            <h3>Subscription & Payments</h3>
                            <p class="text-muted">Tenant Lease and Rental details...</p>
                            <div class="card-deck my-4">
                              <div class="card mb-4 shadow">
                                <div class="card-body text-center my-4">
                                  <a href="#">
                                    <h3 class="h5 mt-4 mb-0">Lease</h3>
                                  </a>
                                  <p class="text-muted">package</p>
                                  <span class="h1 mb-0">$ 6000</span>
                                  <p class="text-muted">year</p>
                                  <ul class="list-unstyled">
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Consectetur adipiscing elit</li>
                                    <li>Integer molestie lorem at massa</li>
                                    <li>Eget porttitor lorem</li>
                                  </ul>
                                  <span class="dot dot-lg bg-success"></span>
                                  <span class="text-muted ml-3">Active</span>
                                </div> <!-- .card-body -->
                              </div> <!-- .card -->
                              <div class="card mb-4">
                                <div class="card-body text-center my-4">
                                  <a href="#">
                                    <h3 class="h5 mt-4 mb-0">Rent</h3>
                                  </a>
                                  <p class="text-muted">package</p>
                                  <span class="h1 mb-0">$ ${items[id].rental_fee}</span>
                                  <p class="text-muted">month</p>
                                  <ul class="list-unstyled">
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Consectetur adipiscing elit</li>
                                    <li>Integer molestie lorem at massa</li>
                                    <li>Eget porttitor lorem</li>
                                  </ul>
                                  <button type="button" class="btn mb-2 btn-primary btn-lg">Review</button>
                                </div> <!-- .card-body -->
                              </div> <!-- .card -->
                            </div> <!-- .card-group -->
                            <h6 class="mb-3">Last payments</h6>
                            <table class="table table-borderless table-striped">
                              <thead>
                              <tr role="row">
                                <th>ID</th>
                                <th>Payment Date</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <th scope="col">1331</th>
                                <td>2020-12-26 01:32:21</td>
                                <td>$16.9</td>
                                <td>Paypal</td>
                                <td><span class="dot dot-lg bg-warning mr-2"></span>Due</td>
                                <td>
                                  <div class="dropdown">
                                    <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <span class="text-muted sr-only">Action</span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                      <a class="dropdown-item" href="#">Edit</a>
                                      <a class="dropdown-item" href="#">Remove</a>
                                      <a class="dropdown-item" href="#">Assign</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="col">1156</th>
                                <td>2020-04-21 00:38:38</td>
                                <td>$9.9</td>
                                <td>Paypal</td>
                                <td><span class="dot dot-lg bg-danger mr-2"></span>False</td>
                                <td>
                                  <div class="dropdown">
                                    <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <span class="text-muted sr-only">Action</span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                      <a class="dropdown-item" href="#">Edit</a>
                                      <a class="dropdown-item" href="#">Remove</a>
                                      <a class="dropdown-item" href="#">Assign</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="col">1038</th>
                                <td>2019-06-25 19:13:36</td>
                                <td>$9.9</td>
                                <td>Credit Card </td>
                                <td><span class="dot dot-lg bg-success mr-2"></span>Paid</td>
                                <td>
                                  <div class="dropdown">
                                    <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <span class="text-muted sr-only">Action</span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                      <a class="dropdown-item" href="#">Edit</a>
                                      <a class="dropdown-item" href="#">Remove</a>
                                      <a class="dropdown-item" href="#">Assign</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="col">1227</th>
                                <td>2021-01-22 13:28:00</td>
                                <td>$9.9</td>
                                <td>Paypal</td>
                                <td><span class="dot dot-lg bg-success mr-2"></span>Paid</td>
                                <td>
                                  <div class="dropdown">
                                    <button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <span class="text-muted sr-only">Action</span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                      <a class="dropdown-item" href="#">Edit</a>
                                      <a class="dropdown-item" href="#">Remove</a>
                                      <a class="dropdown-item" href="#">Assign</a>
                                    </div>`

            let div = document.createElement("div");


            div.innerHTML = tenant_profile_html;

            view_tenant.appendChild(div);

        }


    });


}


function getTenantsAssign() {
    $.ajax({
        url: 'http://localhost:8090/api/tenants/get-all-tenants',
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

    })

    $.ajax({
        url: 'http://localhost:8090/api/property/get-all-properties',
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


function getCompartmentDetails(){

    $.ajax({
        url: 'http://localhost:8090/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            let buildings = response

            console.log($("#building_option").val());

            let prop = document.getElementById("building_option").value;


            for (let i = 0; i < buildings.length; i++) {

                if(buildings[i].name === prop ){

                    console.log(buildings[i].id);
                    let id = buildings[i].id;

                    $.ajax({
                        url: 'http://localhost:8090/api/compartment/get-compartments-for-specific-property/'+id,
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
                              <img src="../../assets/avatars/office-building.png" alt="..." class="avatar-img rounded-circle">
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
        url: 'http://localhost:8090/api/property/get-all-properties',
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
    $.ajax({
        url: 'http://localhost:8090/api/tenants/get-all-tenants',
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
    })
}


function tenantAssignLocalTenant(tenant_id) {
    localStorage.removeItem("tenant_id");
    localStorage.setItem("tenant_id", JSON.stringify(tenant_id));


}

function tenantAssignLocalCompartment(compartment_id){
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

        url: 'http://localhost:8090/api/compartment/get-compartments-for-specific-property/' + compartment_id,
        type: 'GET',
        success: function (response) {
            console.log(response)
            let dropDown = document.getElementById("compartmentDropdown");

            while (dropDown.hasChildNodes()) {
                dropDown.removeChild(dropDown.firstChild);
            }
            let option = document.createElement("option");

            option.text = "Select Compartment";
            dropDown.appendChild(option);


            for (let i = 0; i < response.length; i++) {
                if( response[i].status!="1"){
                let option = document.createElement("option");

                option.text = response[i].compartmentNumber;
                option.setAttribute("value", `${response[i].id}`);

                dropDown.appendChild(option);
                }
            }



        }
    })
}

function setTenantOnCompartment(){
    //let id = JSON.parse(localStorage.getItem("compartment_id"));

    var id  =document.getElementById("compartmentDropdown").value

    let tenant_id = JSON.parse(localStorage.getItem("tenant_id"));
    console.log(id);
    console.log(tenant_id)
    var data= {
        "tenant": tenant_id,
        "status":"1"
    }
    $.ajax({

        url: 'http://localhost:8090/api/compartment/update-compartment/'+ id,
        type: 'PUT',
        dataType:"json",
        crossDomain:"true",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(data),
        success: function () {
            $('#assignedModal').modal('show')


//fgjhk

        }
    })

    $("assign_form")[0].reset();

}




