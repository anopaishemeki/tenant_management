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