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
    $.ajax({
        url: 'http://localhost:8080/api/maintenance/getAll',
        type: 'GET',
        success: function (response) {
            let items = response

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
                        <td> ${items[i].status}
                        </td>                        
                        <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#" onclick="setLocal( ${items[i].id})">Schedule</a>
                       
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
    })
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
    $.ajax({
        url: 'http://localhost:8080/api/maintenance/status/overdue',
        type: 'GET',
        success: function (response) {
            let items = response

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
                                              
                        <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#">Schedule</a>
                       
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
    })
}

//Get Overdue Request
function getPending() {
    $.ajax({
        url: 'http://localhost:8080/api/maintenance/status/pending',
        type: 'GET',
        success: function (response) {
            let items = response

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
                                              
                        <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="text-muted sr-only">Action</span>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-toggle="modal" data-target="#varyModal" data-whatever="@mdo" href="#">Schedule</a>
                       
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
    })
}

// add schedule
function schedule(){
    var id = JSON.parse(localStorage.getItem("id"));
    var jsonDataObj = {
        "schedule":{
            "scheduleDate":$("#date-input1").val()
        }


    }
$.ajax({
    dataType:"json",
    crossDomain:"true",
    contentType:"application/json; charset=utf-8",
    data:JSON.stringify(jsonDataObj),
    type:"PUT",
    url:"http://localhost:8080/api/maintenance/"+ id+"/schedule",
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
    $.ajax({
        url: 'http://localhost:8080/api/maintenance/getAllScheduled',
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




    })
}
function Attend(){
    var id = JSON.parse(localStorage.getItem("id"));
    var request = JSON.parse(localStorage.getItem("request"));
    var description = JSON.parse(localStorage.getItem("description"));
    var dateLogged = JSON.parse(localStorage.getItem("dateLogged"));

    var data = {
        "dateLogged": dateLogged,
        "request": request,
        "description":description
    }
    var f=document.getElementById("2");
    f.setAttribute("disabled","true");
    $.ajax({
        dataType:"json",
        crossDomain:"true",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(data),
        type:"POST",
        url:"http://localhost:8080/api/maintenance/attended",
        success: function (response){
            console.log(response);

        },error:function (e){
            // if(e.status.toString()=="200"){
            //     var r=document.getElementById("0");
            //     r.setAttribute("style","display:all")
            //     var s=document.getElementById("1");
            //     s.setAttribute("style","display:none")
            //     var t=document.getElementById("2");
            //     t.setAttribute("style","display:none")
            //
            //     alert("Schedule Added Successfully" ,"success")
            //
            //     var g = document.getElementById("cont");
            //     g.setAttribute("style","display:none");
            // }
            console.log("ERROR",e);
        }

    })
    $.ajax({
        dataType:"json",
        crossDomain:"true",
        contentType:"application/json; charset=utf-8",
        type:"DELETE",
        url:"http://localhost:8080/api/maintenance/"+id+"/attended",
        success: function (response){
            var r=document.getElementById("1");
            r.setAttribute("style","display:all")
            var s=document.getElementById("2");
            s.setAttribute("style","display:none")
            // var t=document.getElementById("2");
            // t.setAttribute("style","display:none")

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
//Get Overdue Request
function getAttended() {
    $.ajax({
        url: 'http://localhost:8080/api/maintenance/getAllAttended',
        type: 'GET',
        success: function (response) {
            let items = response

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
    })
}
