function savePayment() {
    let paymentDate = document.getElementById('date-input2').value;
    let compartment = document.getElementById('simple-select44').value;
    let reference = document.getElementById('reference').value;
    let amount = document.getElementById('amount').value;
    let method = document.getElementById('payment-method').value;
    let invoice = document.getElementById('simple-select55').value;
    let property = document.getElementById('simple-select55').value;

    property = property == -1 ? null : property;

    amount.replace(",", "")

    let data = {
        paymentDate,
        compartment,
        reference,
        amount,
        method,
        invoice
    }

    $.ajax({
        url: '/api/payment/save-payment',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response)

            $('#verticalModal').modal('hide')
            $('#successModal').modal('show')
            getPayments();
        }
    })
}

function getPayments() {
    $.ajax({
        url: '/api/payment/get-payments',
        type: 'GET',
        success: function (response) {
            console.log(response)

            let t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }
            // console.log(response[1].paymentDate)

            for (let i = response.length-1; i >= 0; i--) {
                let html = `<td>${response[i].paymentDate}</td>
                                                    <td>${response[i].reference}</td>
                                                    <td>${response[i].tenantObject.business_name}</td>
                                                    <td>${response[i].method}</td>
                                                    <td>${response[i].invoice}</td>
                                                    <td><span class="text-success">${response[i].amount}</span></td>`

                let tr = document.createElement('tr');
                tr.innerHTML = html;

                t_body.appendChild(tr);
            }

        }
    })
}

function setAddPropertyDropDown() {
    $.ajax({
        url: '/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
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
            url: '/api/compartment/get-compartments',
            type: 'GET',
            success: function (response) {
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

                setInvoiceDropdown();
            }
        })
    } else {
        $.ajax({
            url: '/api/compartment/get-compartments-for-specific-property/' + dropDown,
            type: 'GET',
            success: function (response) {
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

                setInvoiceDropdown();
            }
        })
    }
}

function setInvoiceDropdown(){
    let dropDown = document.getElementById("simple-select44").value;
    if (dropDown == "-1") {
        $.ajax({
            url: '/api/invoice/get-all-invoices',
            type: 'GET',
            success: function (response) {
                let drop = document.getElementById("simple-select55");

                while (drop.hasChildNodes()) {
                    drop.removeChild(drop.firstChild);
                }

                let opt = document.createElement("option");

                opt.text = "Select invoice"
                opt.setAttribute("value", `-1`)

                drop.appendChild(opt);

                for (let i = 0; i < response.length; i++) {
                    let option = document.createElement("option");

                    option.text = response[i].id;
                    option.setAttribute("value", `${response[i].id}`)

                    drop.appendChild(option);
                }
            }
        })
    } else {
        $.ajax({
            url: '/api/invoice/get-invoice-for-specic-compartment/' + dropDown,
            type: 'GET',
            success: function (response) {
                let drop = document.getElementById("simple-select55");

                while (drop.hasChildNodes()) {
                    drop.removeChild(drop.firstChild);
                }

                let opt = document.createElement("option");

                opt.text = "Select invoice"
                opt.setAttribute("value", `-1`)

                drop.appendChild(opt);

                for (let i = 0; i < response.length; i++) {
                    let option = document.createElement("option");

                    option.text = response[i].id;
                    option.setAttribute("value", `${response[i].id}`)

                    drop.appendChild(option);
                }
            }
        })
    }
}

