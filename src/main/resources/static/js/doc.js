
function getTenant() {
    $("#btn").prop("disabled", true);
    $.ajax({
        url: '/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {
            let items = response


            console.log(response)

            var t_body = document.getElementById("t_body");
            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let html = `<tr class="accordion-toggle collapsed" id="c-2474" data-toggle="collapse" data-parent="#c-2474" href="#collap-2474 ${items[i].id}">
                            <td>${items[i].id}</td>
                            <td>${items[i].name} ${items[i].surname}</td>
                            <td><span class="badge badge-pill badge-success mr-2">S</span><small class="text-muted">${items[i].rent_status}</small></td>
                            <td><a class="" href="./view_tenantDocuments.html" onclick="setLocalfile('${items[i].tenantId}')">Display Documents
                            <button class="btn btn-sm" type="button" >
                            </button>
                            </a>

                             </td>
                            <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="text-muted sr-only">Action</span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="generateDocuments()">Genarate Reply Documents</a>
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



