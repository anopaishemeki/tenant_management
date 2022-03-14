function getInvoices(){
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

            for (let i = response.length-1; i >= 0; i--) {
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

function appendLettableSpace(){
    let properties = JSON.parse(localStorage.getItem('i_properties'))
    let letaleSpaces = JSON.parse(localStorage.getItem('i_lettable'))

    let space = document.getElementById('simple-select44').value;


    let t_body = document.getElementById("t_body-2");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    for (let i = 0; i < letaleSpaces.length; i++) {
        if (letaleSpaces[i].id == space){
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