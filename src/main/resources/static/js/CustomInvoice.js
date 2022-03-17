function getInvoices() {
    $.ajax({
        url: 'http://localhost:8090/api/invoice/get-all-invoices',
        type: 'GET',
        success: function (response) {
            console.log(response)

            let t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }
            console.log(response[1].paymentDate)

            for (let i = response.length - 1; i >= 0; i--) {
                let html = `<td>${response[i].dateIssued}</td>
                                                    <td>${response[i].id}</td>
                                                    <td>${response[i].compartment}</td>
                                                    <td>${response[i].dueDate}</td>
                                                    <td>${response[i].amount}</td>
                                                    <td><span class="text-success">${response[i].status}</span></td>
                                                    <td>view</td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr);
            }

        }
    })
}

function setAddPropertyDropDown() {
    $.ajax({
        url: 'http://localhost:8090/api/property/get-all-properties',
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
            url: 'http://localhost:8090/api/compartment/get-compartments',
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
    } else {
        $.ajax({
            url: 'http://localhost:8090/api/compartment/get-compartments-for-specific-property/' + dropDown,
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

            let tr = document.createElement('tr');
            tr.innerHTML = html;

            t_body.innerHTML = html;
        }
    }

}

function setServiceDropDown() {
    $.ajax({
        url: 'http://localhost:8090/api/services/get-all-services',
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

    let selectedServicesList  = JSON.parse(localStorage.getItem('selectedCategories'))
    let service = document.getElementById('service-drop-down').value;

    var verify = false

    for (let i = 0 ; i <selectedServicesList.length; i++){
        if (selectedServicesList[i] == service){
            verify = true
        }
    }

    if (verify){
        console.log(true)
    }else {
        selectedServicesList.push(service)
    }
    console.log(selectedServicesList)
    localStorage.setItem('selectedCategories', JSON.stringify(selectedServicesList))

    let t_body = document.getElementById("t_body-3");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }


    for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < selectedServicesList.length; j++){
            if (response[i].id == selectedServicesList[j]) {
                let html = `
                                 <td>${response[i].serviceName}</td>
                                 <td>
                                    <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" value="${response[i].amount}">
                                  </td>
                                  <td><button type="button" onclick="removeService('${response[i].id}')" class="btn btn-danger btn-secondary btn-sm"><i class="bi bi-trash-fill"></i>remove </button></td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr)
            }
        }
    }
}

function refreshServices(){
    let response = JSON.parse(localStorage.getItem('i_services'))

    let selectedServicesList  = JSON.parse(localStorage.getItem('selectedCategories'))


    let t_body = document.getElementById("t_body-3");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }


    for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < selectedServicesList.length; j++){
            if (response[i].id == selectedServicesList[j]) {
                let html = `
                                 <td>${response[i].serviceName}</td>
                                 <td>
                                    <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" value="${response[i].amount}">
                                  </td>
                                  <td><button type="button" onclick="removeService('${response[i].id}')" class="btn btn-danger btn-secondary btn-sm">remove </button></td>
                                                    `

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr)
            }
        }
    }
}

function removeService(id){
    let selectedServicesList  = JSON.parse(localStorage.getItem('selectedCategories'))
    console.log(selectedServicesList)

    for (let i = 0; i < selectedServicesList.length; i++){
        console.log(selectedServicesList[i])
        if (id == selectedServicesList[i]) {
            selectedServicesList.splice(i, 1)

            localStorage.removeItem('selectedCategories')
            localStorage.setItem('selectedCategories', JSON.stringify(selectedServicesList))
            refreshServices()
        }
    }
}