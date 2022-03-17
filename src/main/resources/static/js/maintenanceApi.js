function setLocal(id) {
    localStorage.removeItem("id");
    localStorage.setItem("id",JSON.stringify(id));


}
function SetLocal(id,request,description,dateLogged) {
    localStorage.removeItem("id");
    localStorage.removeItem("request");
    localStorage.removeItem("description");
    localStorage.removeItem("dateLogged");
    localStorage.setItem("id",JSON.stringify(id));
    localStorage.setItem("description",JSON.stringify(description));
    localStorage.setItem("request",JSON.stringify(request));
    localStorage.setItem("dateLogged",JSON.stringify(dateLogged));

}
function toggleView(id) {
    let active = document.getElementById(id);

    let local = localStorage.getItem("deactivate")
    let deactivate = document.getElementById(local);
    deactivate.classList.add("hide-sections")

    active.classList.remove("hide-sections")

    localStorage.setItem("deactivate", id);
}


//Get All Request
function getRequest() {

    var baseurl = "http://localhost:8090/api/maintenance/getAll";
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
                    {"data":"request"},
                    {"data":"description"},
                    {"data":"levelOfUrgency"},
                    {"data":"dateLogged"},
                    {"data":"schedule.scheduleDate",
                    "render":function (schedule){
                        if(!schedule){
                            return'unscheduled';
                        }else {
                            return schedule;
                        }
                    }},
                    {"data":"status",
                    "render":function (status){
                        if(status==="Pending"){
                            return'<span class="badge badge-primary"> ' +status+'</span>';
                        }else{
                            return '<span class="badge badge-danger">' +status+'</span>';
                        }
                    }},
                    {"data":"id",
                    "render": function (data){
                        return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" onclick="setLocal(`+ data+`)">Schedule</a>

                      </div>`
                    }},

                ]
            });
        }
    };
    xmlhttp.send();
}

var alertplaceholder = document.getElementById("liveAlertPlaceholder");

function alert(message,type){
    var t=document.getElementById("ww");
    if(t){
        t.innerHTML='<div class="alert ww alert-'+type+' alert-dismissible" role = "alert">'+ message+'</div>'
    }else{
        var h =document.createElement("div");
        h.setAttribute("id","ww");
        h.innerHTML='<div class="alert ww alert-'+type+' alert-dismissible" role = "alert">'+ message+'</div>'

        alertplaceholder.append(h);
    }
}
//Get Overdue Request
function getOverdue() {
    var baseurl = "http://localhost:8090/api/maintenance/status/overdue";
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
                    {"data":"request"},
                    {"data":"description"},
                    {"data":"levelOfUrgency"},
                    {"data":"dateLogged"},
                    {"data":"schedule.scheduleDate",
                        "render":function (schedule){
                            if(!schedule){
                                return'unscheduled';
                            }else {
                                return schedule;
                            }
                        }},

                    {"data":"id",
                        "render": function (data){
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" onclick="setLocal(`+ data+`)">Schedule</a>

                      </div>`
                        }},

                ]
            });
        }
    };
    xmlhttp.send();
}

//Get Pending Request
function getPending() {


    var baseurl = "http://localhost:8090/api/maintenance/status/pending";
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
                    {"data":"request"},
                    {"data":"description"},
                    {"data":"levelOfUrgency"},
                    {"data":"dateLogged"},
                    {"data":"schedule.scheduleDate",
                        "render":function (schedule){
                            if(!schedule){
                                return'unscheduled';
                            }else {
                                return schedule;
                            }
                        }},

                    {"data":"id",
                        "render": function (data){
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" onclick="setLocal(`+ data+`)">Schedule</a>

                      </div>`
                        }},

                ]
            });
        }
    };
    xmlhttp.send();
}

// add schedule
function schedule(){
    var id = JSON.parse(localStorage.getItem("id"));
    var jsonDataObj = {
        "schedule":{
            "scheduleDate":$("#date-input1").val(),
            "team":$("#teamInput").val()
        }


    }
$.ajax({
    dataType:"json",
    crossDomain:"true",
    contentType:"application/json; charset=utf-8",
    data:JSON.stringify(jsonDataObj),
    type:"PUT",
    url:"http://localhost:8090/api/maintenance/"+ id+"/schedule",
    success: function (response){
        console.log(response);

    },error:function (e){
        if(e.status.toString()=="200"){
            var r=document.getElementById("0");
            r.setAttribute("style","display:all")
            var s=document.getElementById("1");
            s.setAttribute("style","display:none")
            var t=document.getElementById("2");
            t.setAttribute("style","display:none")

            alert("Schedule Added Successfully" ,"success")

            var g = document.getElementById("cont");
            g.setAttribute("style","display:none");
        }
        console.log("ERROR",e);
    }

})
}


//Get Scheduled
function getScheduled() {
    /*$.ajax({
        url: 'http://localhost:8090/api/maintenance/getAllScheduled',
        type: 'GET',
        success: function (response) {
            let items = response

            console.log(response)

            var t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                if (items[i].schedule === null){
                    continue
                }
                let html = `
                        <td></td>
                        <td>  ${items[i].id}
                        </td>
                        <td>  ${items[i].request}
                        </td>
                        <td>  ${items[i].description}
                        </td>
                         <td> ${items[i].levelOfUrgency}</td> 
                        <td> ${items[i].dateLogged}
                        </td> 
                        <td> ${items[i].schedule.scheduleDate}
                        </td> 
                                              
                        <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" 
                        data-whatever="@mdo" href="#" onclick="SetLocal( '${items[i].id}','${items[i].request}', '${items[i].description}','${items[i].dateLogged}')">
                        Attended</a>
                       
                      </div>
                    </td>`


                let tr = document.createElement("tr");
                // tr.className = "row"

                tr.innerHTML = html;

                // tr.setAttribute("onclick", `setPropertyDetails('${items[i].id}'), toggleView('propertyDetailsDiv') `);

                // let htmlSpacer = "<td colspan=\"100\">"
                // let spacer = document.createElement("tr");
                // spacer.className = "spacer";
                //
                // spacer.innerHTML = htmlSpacer;

                // t_body.appendChild(spacer);
                t_body.appendChild(tr);
            }
        }




    })*/
    var baseurl = "http://localhost:8090/api/maintenance/getAllScheduled";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",baseurl,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status ==200){
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data)
            $("#example").DataTable({
                data:data,


                columns:[

                    {"data": "id"},
                    {"data": "request"},
                    {"data": "description"},
                    {"data": "levelOfUrgency"},
                    {"data": "dateLogged"},
                    {
                        "data": "schedule.scheduleDate",
                        "render": function (schedule) {


                            if (!schedule) {
                                return 'unscheduled';
                            } else {
                                return schedule;
                            }
                        }
                    },
                    {
                        "data": "schedule.team",
                        "render": function (schedule) {


                            if (!schedule) {
                                return 'unassigned';
                            } else {
                                return schedule;
                            }
                        }
                    },
                    {
                        "data": "status",
                        "render": function (status) {
                            if (status === "Pending") {
                                return '<span class="badge badge-primary"> ' + status + '</span>';
                            } else {
                                return '<span class="badge badge-danger">' + status + '</span>';
                            }
                        }
                    },
                    {
                        "data": "id",
                        "render": function (data) {
                            return `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" 
                        data-whatever="@mdo" href="#" onclick="SetLocal( `+data+`)">
                        Attended</a>
                       
                      </div>`
                        }
                    },

                ]

            });
        }
    };
    xmlhttp.send();
}

//Mark attended
function Attended(){
    var id = JSON.parse(localStorage.getItem("id"));
    var f=document.getElementById("2");
    f.setAttribute("disabled","true");
    $.ajax({

        type:"GET",
        url:"http://localhost:8090/api/maintenance/"+id,
        success: function (response){
            console.log(response);
            $.ajax({
                dataType:"json",
                crossDomain:"true",
                contentType:"application/json; charset=utf-8",
                data:JSON.stringify(response),
                type:"POST",
                url:"http://localhost:8090/api/maintenance/attended",
                success: function (response){
                    console.log(response);
                    console.log("Posted");


                },error:function (e){

                    console.log("ERROR",e);
                }

            })

        },error:function (e){

            console.log("ERROR",e);
        }

    })

    $.ajax({
                        dataType:"json",
                        crossDomain:"true",
                        contentType:"application/json; charset=utf-8",
                        type:"DELETE",
                        url:"http://localhost:8090/api/maintenance/attended/"+id,
                        success: function (response){
                            console.log("Delete")
                            var r=document.getElementById("1");
                            r.setAttribute("style","display:all")
                            var s=document.getElementById("2");
                            s.setAttribute("style","display:none")


                            alert("Request attended Successfully" ,"success")


                            var g = document.getElementById("cont");
                            g.setAttribute("style","display:none");
                            console.log(response);

                        },error:function (e){
                            if(e.status.toString()=="200"){
                                var r=document.getElementById("1");
                                r.setAttribute("style","display:all")
                                var s=document.getElementById("2");
                                s.setAttribute("style","display:none")
                                // var t=document.getElementById("2");
                                // t.setAttribute("style","display:none")

                                alert("Request attended Successfully" ,"success")


                                var g = document.getElementById("cont");
                                g.setAttribute("style","display:none");
                                console.log("ERROR",e);
                            }else{
                                alert("Request attended unSuccessfully" ,"danger")
                                console.log("ERROR",e);
                            }



                        }

                    })

}


//Get Attended
function getAttended() {
    /*$.ajax({
        url: 'http://localhost:8090/api/maintenance/getAllAttended',
        type: 'GET',
        success: function (response) {
            let items = response

            localStorage.setItem("attended", JSON.stringify(items));

            console.log(response)

            var t_body = document.getElementById("t_body");

            while (t_body.hasChildNodes()) {
                t_body.removeChild(t_body.firstChild);
            }

            for (let i = 0; i < items.length; i++) {
                let html = `
                        <td></td>
                        <td>  ${items[i].id}
                        </td>
                        <td>  ${items[i].request}
                        </td>
                        <td>  ${items[i].description}
                        </td>
                        <td> ${items[i].dateLogged}
                        </td> 
                        <td> ${items[i].dateAttended}
                        </td> 
                                              
                        `


                let tr = document.createElement("tr");
                // tr.className = "row"

                tr.innerHTML = html;

                // tr.setAttribute("onclick", `setPropertyDetails('${items[i].id}'), toggleView('propertyDetailsDiv') `);

                // let htmlSpacer = "<td colspan=\"100\">"
                // let spacer = document.createElement("tr");
                // spacer.className = "spacer";
                //
                // spacer.innerHTML = htmlSpacer;

                // t_body.appendChild(spacer);
                t_body.appendChild(tr);
            }
        }
    })*/
    var baseurl = "http://localhost:8090/api/maintenance/getAllAttended";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",baseurl,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status ==200){
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data)
            $("#example").DataTable({
                data:data,


                columns:[

                    {"data": "id"},
                    {"data": "request"},
                    {"data": "description"},
                    {"data": "dateLogged"},
                    {"data": "dateAttended"}
                ]

            });
        }
    };
    xmlhttp.send();
}

// Request Filter
function searchFilterRequest(){
    let items = JSON.parse(localStorage.getItem("request"));

    let field = document.getElementById("requestSearch").value;

    var t_body = document.getElementById("t_body");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    for (let i = 0; i < items.length; i++) {
        let scheduledDate = (items[i].schedule === null) ? "unscheduled" : (items[i].schedule.scheduleDate)
        let color = (items[i].status === "Pending") ? "badge badge-primary" : "badge badge-danger"
        let string = JSON.stringify(items[i])

        if (string.toLowerCase().includes(field.toLowerCase())){
            let new_html = `<td></td>
                        <td>  ${items[i].id}
                        </td>
                        <td>  ${items[i].request}
                        </td>
                        <td>  ${items[i].description}
                        </td>
                        <td>${items[i].levelOfUrgency}</td>
                        <td> ${items[i].dateLogged}
                        </td> 
                        
                        <td> ${scheduledDate}</td>
                        <td><span class="${color}">${items[i].status}</span>
                        </td>                        
                        <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" onclick="setLocal( ${items[i].id})">Schedule</a>
                       
                      </div>
                    </td>`


            let tr = document.createElement("tr");

            tr.innerHTML = new_html;

            t_body.appendChild(tr);
        }
    }
}

// Attended Filter

function searchFilterAttended(){
    let items = JSON.parse(localStorage.getItem("attended"));

    let field = document.getElementById("attendedSearch").value;

    var t_body = document.getElementById("t_body");

    while (t_body.hasChildNodes()) {
        t_body.removeChild(t_body.firstChild);
    }

    for (let i = 0; i < items.length; i++) {

        let string = JSON.stringify(items[i])

        if (string.toLowerCase().includes(field.toLowerCase())){
            let new_html = `<td></td>
                        <td>  ${items[i].id}
                        </td>
                        <td>  ${items[i].request}
                        </td>
                        <td>  ${items[i].description}
                        </td>
                        <td> ${items[i].dateLogged}
                        </td> 
                        <td> ${items[i].dateAttended}
                        </td> `


            let tr = document.createElement("tr");

            tr.innerHTML = new_html;

            t_body.appendChild(tr);
        }
    }
}

function saveRequest() {
    let request = document.getElementById("request").value
    let levelOfUrgency = document.getElementById("levelOfUrgency").value
    let description = document.getElementById("description").value

    let data = {
        request,
        levelOfUrgency,
        description
    }
    console.log("data",data)

    $.ajax({
        url: 'http://localhost:8090/api/maintenance',
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
