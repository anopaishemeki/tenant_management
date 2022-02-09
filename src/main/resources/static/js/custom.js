
function getProperties(){
    $.ajax({
        url: 'http://localhost:8090/api/property/get-all-properties',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for(let i = 0; i < items.length; i++){
                let html = `<th scope="row" id="row ${items[i].id}">
                                                <label class="control control--checkbox">
<!--                                                    <input type="checkbox"/>-->
<!--                                                    <div class="control__indicator"></div>-->
                                                </label>
                                            </th>
                                            <td>
                                                ${items[i].id}
                                            </td>
                                            <td><a href="#">${items[i].name}</a></td>
                                            <td>
                                                ${items[i].addressObject.city +" ,"+ items[i].addressObject.country}
                                                <small class="d-block">${items[i].addressObject.address}</small>
                                            </td>
                                            <td>
                                                 ${items[i].ownerObject.name}
                                                 <small class="d-block">${items[i].ownerObject.contactDetailsObject.phone + " ,"+ items[i].ownerObject.contactDetailsObject.email}</small>
                                            </td>
                                            <td>${items[i].status}</td>
                                            <td><i class="bi bi-eye-fill eye"></i></td>`

                let tr = document.createElement("tr");
                // tr.className = "row"
                tr.style.boxShadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"

                tr.innerHTML = html;

                let htmlSpacer = "<td colspan=\"100\">"
                let spacer = document.createElement("tr");
                spacer.className = "spacer";

                spacer.innerHTML = htmlSpacer;

                t_body.appendChild(spacer);
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
    let  city = document.getElementById("city").value;
    let  owner = ""
    // let  province = document.getElementById().value;
    let  status = document.getElementById("status").value;
    let  assetValue = document.getElementById("assetValue").value;
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
        city,
        ownerObject : {
            name : ownerName + " "+ownerLastname,
            address : "",
            addressObject : {
                name: ownerAddressName,
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
        }
    })
    getProperties();
}







