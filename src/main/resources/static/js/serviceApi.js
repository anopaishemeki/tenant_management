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
        url: '/api/services/save-service',
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
                $('#failModal').modal('show')
                console.log("error",error)
            }
        }
    })
}

function getService() {

    var baseurl = "/api/services/get-all-services";
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
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" onclick="setLocal(`+ data+`)">Update</a>
                        <a class="dropdown-item" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo" href="#" onclick="setLocal(`+ data+`)">Delete</a>
                      </div>`
                        }},

                ]
            });
        }
    };
    xmlhttp.send();
}

function setLocal(id) {
    localStorage.removeItem("id");
    localStorage.setItem("id", JSON.stringify(id));


}

var alertplaceholder = document.getElementById("liveAlertPlaceholder");

function updateService() {
    var id = JSON.parse(localStorage.getItem("id"));

    let serviceName = document.getElementById("serviceName").value;

    let amount = document.getElementById("amount").value;

    var jsonDataObj = {

        serviceName,
        amount

    }
    console.log("update details")
    console.log(jsonDataObj);

    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonDataObj),
        type: "PUT",
        url: "/api/services/updateService/" + id ,

        success: function (response) {
            console.log(response);

        }, error: function (e) {
            if (e.status.toString() == "200") {
                $('#successModal').modal('show')

                var rtx = document.getElementById("cont");
                rtx.setAttribute("style", "display:none");
                var rt = document.getElementById("liveAlertPlaceholder22");
                rt.setAttribute("style", "display:all");
                var r = document.getElementById("0");
                r.setAttribute("style", "display:all")
                var s = document.getElementById("1");
                s.setAttribute("style", "display:none")
                var t = document.getElementById("2");
                t.setAttribute("style", "display:none")



                var g = document.getElementById("cont");
                g.setAttribute("style", "display:none");
            }
            console.log("ERROR", e);
        }

    })
}
function deleteService(){


    var id = JSON.parse(localStorage.getItem("id"));
    console.log(id);

    $.ajax({
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        type: "DELETE",
        url: "/api/services/delete-service/"+id,
        success: function (response) {
            console.log("Delete")
            var r = document.getElementById("1");
            r.setAttribute("style", "display:all")
            var s = document.getElementById("2");
            s.setAttribute("style", "display:none")





            var g = document.getElementById("cont");
            g.setAttribute("style", "display:none");
            console.log(response);

        }, error: function (e) {
            if (e.status.toString() == "200") {


                var rtx = document.getElementById("7");
                rtx.setAttribute("style", "display:none")


                var rt = document.getElementById("deleteSuccess");
                rt.setAttribute("style", "display:all")
                var r = document.getElementById("12");
                r.setAttribute("style", "display:none")
                var s = document.getElementById("21");
                s.setAttribute("style", "display:none")
                var rw = document.getElementById("01");
                rw.setAttribute("style", "display:all")
                // var t=document.getElementById("2");
                // t.setAttribute("style","display:none")




                var g = document.getElementById("cont");
                g.setAttribute("style", "display:none");
                console.log("ERROR", e);
            } else {
                alert("Request attended unSuccessfully", "danger")
                console.log("ERROR", e);
            }


        }

    })
}
