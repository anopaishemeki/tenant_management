function getInvoices() {
    $.ajax({
        url: '/api/invoice/get-all-invoices',
        type: 'GET',
        success: function (response) {
            console.log(response)

            localStorage.setItem('invoiceList', JSON.stringify(response));

            let t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }
            // console.log(response[1].paymentDate)

            for (let i = response.length - 1; i >= 0; i--) {
                let html = `<td>${response[i].dateIssued}</td>
                                                    <td>${response[i].id}</td>
                                                    <td>${response[i].compartmentObject.tenantObject.business_name}</td>
                                                    <td>${response[i].dueDate}</td>
                                                    <td>${response[i].amount}</td>
                                                    <td><span class="text-success">${response[i].status}</span></td>
                                                    <td><button type="button" onclick="viewInvoice(${response[i].id})" class="btn btn-secondary btn-sm"><i class="bi bi-trash-fill"></i>view </button></td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr);
            }

        }
    })
}

function viewInvoice(id){
    let invoiceList = JSON.parse(localStorage.getItem('invoiceList'))
    let properties = JSON.parse(localStorage.getItem('i_properties'));
    let container = document.getElementById('invoiceDetails');

    for (let i = 0; i < invoiceList.length; i++){
        if (id == invoiceList[i].id){
            for (let j = 0; j < properties.length; j++){
                if (properties[j].id == invoiceList[i].compartmentObject.property){
                    let html = `<div class="card-body">
                                                <dl class="row align-items-center mb-0">
                                                    <dt class="col-sm-2 mb-3 text-muted"> Portfolio</dt>
                                                    <dd class="col-sm-4 mb-3">
                                                        <strong>${properties[j].name}</strong>
                                                    </dd>
                                                    <dt class="col-sm-2 mb-3 text-muted"> Lettable Space</dt>
                                                    <dd class="col-sm-4 mb-3">
                                                        <strong>${invoiceList[i].compartmentObject.compartmentNumber}</strong>
                                                    </dd>
                                                </dl>
                                                <dl class="row align-items-center mb-0">
                                                    <dt class="col-sm-2 mb-3 text-muted">Occupying Tenant</dt>
                                                    <dd class="col-sm-4 mb-3">
                                                        <strong>${invoiceList[i].compartmentObject.tenantObject.business_name}</strong>
                                                    </dd>
                                                    <dt class="col-sm-2 mb-3 text-muted"> Issue Date</dt>
                                                    <dd class="col-sm-4 mb-3">
                                                        <strong>${invoiceList[i].dateIssued}</strong>
                                                    </dd>
                                                </dl>
                                                <dl class="row mb-0">
                                                    <dt class="col-sm-2 mb-3 text-muted">Due Date</dt>
                                                    <dd class="col-sm-4 mb-3">${invoiceList[i].dueDate}</dd>
                                                    <dt class="col-sm-2 mb-3 text-muted">Invoice Status</dt>
                                                    <dd class="col-sm-4 mb-3">${invoiceList[i].status}</dd>
                                                    <!--<dt class="col-sm-2 mb-3 text-muted">Phone</dt>
                                                    <dd class="col-sm-4 mb-3"> +1 (286) 984-3158</dd>
                                                    <dt class="col-sm-2 mb-3 text-muted">Mobile</dt>
                                                    <dd class="col-sm-4 mb-3">978</dd>
                                                    <dt class="col-sm-2 mb-3 text-muted">Date registered</dt>
                                                    <dd class="col-sm-4 mb-3">2002-08-31</dd>
                                                    <dt class="col-sm-2 mb-3 text-muted">Date Captured</dt>
                                                    <dd class="col-sm-4 mb-3">2022-05-11</dd>
                                                    <dt class="col-sm-2 text-muted">Description</dt>
                                                    <dd class="col-sm-10"> </dd>
                                                    <dt class="col-sm-2 text-muted">Address</dt>
                                                    <dd class="col-sm-10"> Cupiditate veniam o , Eius adipisicing qui , Zimbabwe</dd>-->
                                                </dl>
                                                <hr class="my-4">
                                                <div class="form-row">
                                                    <table class="table table-hover  dataTables table-borderless border-v table-sm"
                                                           style="width:100%!important;">
                                                        <thead class="thead-dark">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>item</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                            <!--th>Due Date</th>
                                            <th>Invoice Total</th>
                                            <th>Status</th>
                                            <th>View</th>-->
                                                        </tr>
                                                        </thead>
                                                        <tbody id="t_body-4">

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> <!-- .card-body -->`

                    container.innerHTML = html


                    let services = JSON.parse(invoiceList[i].servicesList);

                    let t_body = document.getElementById('t_body-4');

                    let rent = document.createElement('tr');

                    let rentHtml = `<td>1</td>
                                    <td>Rent</td>
                                    <td>Monthly rent</td>
                                    <td>${invoiceList[i].rentalAmount}</td>`

                    rent.innerHTML = rentHtml;

                    t_body.appendChild(rent)

                    for (let i = 0; i < services.length; i ++){
                        let html2 = `<td>${i+2}</td>
                                                    <td>${services[i].serviceName}</td>
                                                    <td>description</td>
                                                    <td>${services[i].amount}</td>`

                        let tr = document.createElement('tr');

                        tr.innerHTML = html2;
                        t_body.appendChild(tr);
                    }

                    $('#verticalModal-view-invoice').modal('show')
                }
            }
            break;
        }
    }
}

function saveInvoice(){
    let compartment = JSON.parse(localStorage.getItem('selectedLettable'));
    let amount = 0;
    let  dueDate = document.getElementById('date-input2').value;
    let servicesList = [];

    let response = JSON.parse(localStorage.getItem('i_services'))

    let selectedServicesList = JSON.parse(localStorage.getItem('selectedCategories'))

    for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < selectedServicesList.length; j++) {
            if (response[i].id == selectedServicesList[j]) {
                amount = amount + Number.parseFloat(response[i].amount)

                servicesList.push(response[i])
            }
            console.log(response[i]);
        }
    }

    servicesList = JSON.stringify(servicesList);

    let data = {
        compartment,
        amount,
        dueDate,
        servicesList,
        rentalAmount : JSON.parse(localStorage.getItem('rent'))
    }

    $.ajax({
        url: '/api/invoice/save-invoice',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response)
            getInvoices()
        }
    })
}

function setAddPropertyDropDown() {
    $.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            localStorage.setItem('i_properties', JSON.stringify(response));

            console.log(response)
            let dropDown = document.getElementById("simple-select33");

            while (dropDown.hasChildNodes()) {
                dropDown.removeChild(dropDown.firstChild);
            }

            let opt = document.createElement("option");

            opt.text = "Select a property"
            opt.setAttribute("value", `-1`)

            dropDown.appendChild(opt);

            for (let i = 0; i < response.length; i++) {
                let option = document.createElement("option");

                option.text = response[i].name;
                option.setAttribute("value", `${response[i].id}`)

                dropDown.appendChild(option);
            }
        }
    })

    let data = [];
    localStorage.setItem('selectedCategories', JSON.stringify(data))
}

function setLettableSpaceDropdown() {
    let dropDown = document.getElementById("simple-select33").value;
    if (dropDown == "-1") {
        $.ajax({
            url: '/api/compartment/get-compartments',
            type: 'GET',
            success: function (response) {
                localStorage.setItem('i_lettable', JSON.stringify(response));

                let drop = document.getElementById("simple-select44");

                while (drop.hasChildNodes()) {
                    drop.removeChild(drop.firstChild);
                }

                let opt = document.createElement("option");

                opt.text = "Select a Lettable Space"
                opt.setAttribute("value", `-1`)

                drop.appendChild(opt);

                for (let i = 0; i < response.length; i++) {
                    let option = document.createElement("option");

                    if(response[i].tenant == null){
                        continue
                    }

                    option.text = response[i].compartmentNumber;
                    option.setAttribute("value", `${response[i].id}`)

                    drop.appendChild(option);
                }
            }
        })
    } else {
        $.ajax({
            url: '/api/compartment/get-compartments-for-specific-property/' + dropDown,
            type: 'GET',
            success: function (response) {
                localStorage.setItem('i_lettable', JSON.stringify(response));

                let drop = document.getElementById("simple-select44");

                while (drop.hasChildNodes()) {
                    drop.removeChild(drop.firstChild);
                }

                let opt = document.createElement("option");

                opt.text = "Select a Lettable Space"
                opt.setAttribute("value", `-1`)

                drop.appendChild(opt);

                for (let i = 0; i < response.length; i++) {
                    let option = document.createElement("option");

                    option.text = response[i].compartmentNumber;
                    option.setAttribute("value", `${response[i].id}`)

                    drop.appendChild(option);
                }
            }
        })
    }
}

function appendLettableSpace() {
    let properties = JSON.parse(localStorage.getItem('i_properties'))
    let letaleSpaces = JSON.parse(localStorage.getItem('i_lettable'))

    let space = document.getElementById('simple-select44').value;


    let t_body = document.getElementById("t_body-2");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    for (let i = 0; i < letaleSpaces.length; i++) {
        if (letaleSpaces[i].id == space) {
            let html = `<td>${letaleSpaces[i].dateIssued}</td>
                                                    <td>${letaleSpaces[i].compartmentNumber}</td>
                                                    <td>${letaleSpaces[i].floorArea} &#13217;</td>
                                                    <td>$ ${letaleSpaces[i].rentalRate} /&#13217;</td>
                                                    <td>$ ${letaleSpaces[i].rentalRate * letaleSpaces[i].floorArea}</td>
                                                    `

            localStorage.removeItem('rent');
            localStorage.setItem('rent', JSON.stringify(letaleSpaces[i].rentalRate * letaleSpaces[i].floorArea))

            let tr = document.createElement('tr');
            tr.innerHTML = html;

            t_body.innerHTML = html;

            localStorage.removeItem('selectedLettable')
            localStorage.setItem('selectedLettable', JSON.stringify(space))
            break;
        }
    }

}

function setServiceDropDown() {
    $.ajax({
        url: '/api/services/get-all-services',
        type: 'GET',
        success: function (response) {
            localStorage.setItem('i_services', JSON.stringify(response));

            console.log(response)
            let dropDown = document.getElementById("service-drop-down");

            while (dropDown.hasChildNodes()) {
                dropDown.removeChild(dropDown.firstChild);
            }

            let opt = document.createElement("option");

            opt.text = "Select a service"
            opt.setAttribute("value", `-1`)

            dropDown.appendChild(opt);

            for (let i = 0; i < response.length; i++) {
                let option = document.createElement("option");

                option.text = response[i].serviceName;
                option.setAttribute("value", `${response[i].id}`)

                dropDown.appendChild(option);
            }
        }
    })
}

function appendServices() {
    let response = JSON.parse(localStorage.getItem('i_services'))

    let selectedServicesList = JSON.parse(localStorage.getItem('selectedCategories'))
    let service = document.getElementById('service-drop-down').value;

    var verify = false

    for (let i = 0; i < selectedServicesList.length; i++) {
        if (selectedServicesList[i] == service) {
            verify = true
        }
    }

    if (verify) {
        console.log(true)
    } else {
        selectedServicesList.push(service)
    }
    console.log(selectedServicesList)
    localStorage.setItem('selectedCategories', JSON.stringify(selectedServicesList))

    let t_body = document.getElementById("t_body-3");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    let total = 0;

    for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < selectedServicesList.length; j++) {
            if (response[i].id == selectedServicesList[j]) {
                let html = `
                                 <td>${response[i].serviceName}</td>
                                 <td>
                                    <input class="form-control form-control-sm" type="number" id="_${response[i].id}" onfocusout="updateAmount('${response[i].id}')" placeholder=".form-control-sm" value="${response[i].amount}">
                                  </td>
                                  <td><button type="button" onclick="removeService('${response[i].id}')" class="btn btn-danger btn-secondary btn-sm"><i class="bi bi-trash-fill"></i>remove </button></td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr)

                total = total + Number.parseFloat(response[i].amount)
            }
        }
    }


/*    for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < selectedServicesList.length; j++) {
            total =
        }
    }*/

    let html = `
                                 <td><strong>TOTAL</strong></td>
                                 <td>
                                    &nbsp;&nbsp;$ ${total}
                                  </td>
                                                    `

    let tr = document.createElement('tr');
    tr.innerHTML = html;

    t_body.appendChild(tr)
}

function refreshServices() {
    let response = JSON.parse(localStorage.getItem('i_services'))

    let selectedServicesList = JSON.parse(localStorage.getItem('selectedCategories'))


    let t_body = document.getElementById("t_body-3");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    let total = 0;

    for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < selectedServicesList.length; j++) {
            if (response[i].id == selectedServicesList[j]) {
                let html = `
                                 <td>${response[i].serviceName}</td>
                                 <td>
                                    <input class="form-control form-control-sm" type="number" id="_${response[i].id}" onfocusout="updateAmount('${response[i].id}')" placeholder=".form-control-sm" value="${response[i].amount}">
                                  </td>
                                  <td><button type="button" onclick="removeService('${response[i].id}')" class="btn btn-danger btn-secondary btn-sm">remove </button></td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr)

                total = total + Number.parseFloat(response[i].amount)
            }
        }
    }
    let html = `
                                 <td><strong>TOTAL</strong></td>
                                 <td>
                                    &nbsp;&nbsp;$ ${total}
                                  </td>
                                                    `

    let tr = document.createElement('tr');
    tr.innerHTML = html;

    t_body.appendChild(tr)
}

function removeService(id) {
    let selectedServicesList = JSON.parse(localStorage.getItem('selectedCategories'))
    console.log(selectedServicesList)

    for (let i = 0; i < selectedServicesList.length; i++) {
        console.log(selectedServicesList[i])
        if (id == selectedServicesList[i]) {
            selectedServicesList.splice(i, 1)

            localStorage.removeItem('selectedCategories')
            localStorage.setItem('selectedCategories', JSON.stringify(selectedServicesList))
            refreshServices()
        }
    }
}

function updateAmount(id){
    let response = JSON.parse(localStorage.getItem('i_services'))

    for (let i = 0; i < response.length; i++) {
        if (id == response[i].id){
            response[i].amount = document.getElementById('_'+id).value;

        }
    }

    localStorage.removeItem('i_services');
    localStorage.setItem('i_services', JSON.stringify(response));
    appendServices();
}

