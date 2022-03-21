function setLocal(id) {
    localStorage.removeItem("id");
    localStorage.setItem("id",JSON.stringify(id));


}

function saveService() {
    let serviceName = document.getElementById("serviceName").value
    let amount = document.getElementById("amount").value



    let data = {
        serviceName,
        amount

    }
    console.log("data",data)

    $.ajax({
        url: 'http://localhost:8090/api/services/save-service',
        type: 'POST',
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            // alert("success" + response)
            console.log("response",response)
            // getProperties();
            // let element = document.getElementById("successModal");
            $('#toast').modal('show')

            document.getElementById("_form").reset();
        },
        error:function (error){

            if(error.status.toString()==="200"){
                let element = document.getElementById("toast");

                $('#successModal').modal('show')


                document.getElementById("_form").reset();

            }else{
                console.log("error",error)
            }
        }
    })
}

function getService() {

    var baseurl = "http://localhost:8090/api/services/get-all-services";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",baseurl,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status ==200){
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data)
            $("#example").DataTable({
                data:data,
                columns:[

                    {"data":"id"},
                    {"data":"serviceName"},
                    {"data":"amount"},
                    {"data":"id",
                        "render": function (data){
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" onclick="setLocal(`+ data+`)">Edit</a>

                      </div>`
                        }},

                ]
            });
        }
    };
    xmlhttp.send();
}