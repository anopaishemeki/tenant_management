function saveNoticeDocuments(){
    var file = $('#fileUploadForm')[0];
    var data = new FormData(file);

    var n = document.getElementById("file")

    if(n.value.toString().length==0){
        alert("Notice File Not Uploaded!!","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
    
    }
    $("#btnSubmit").prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/v1/uploadNotice",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {

            var r=document.getElementById("retry");
            r.setAttribute("style","display:none");
            console.log("SUCCESS : ", data);
            $("#btnSubmit").prop("disabled", false);
            alert('Document Saved Successfully ', 'success')



        },
        error: function (e) {
            if(e.status.toString()=="200"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:none");
                alert("Document  Saved Successfully ", 'success');
                console.log("ERROR : ", e);

            }else if(e.status.toString()=="500"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:all");
                alert(e.responseJSON.message, 'danger');
                $("#btnSubmit").prop("disabled", false);
                console.log("Date :",document.getElementById("startDate").value)
                console.log("ERROR : ", e);

            }else{

                var r=document.getElementById("retry");
                r.setAttribute("style","display:all");
                console.log("ERROR : ", e);
                alert(e.message, 'success');
                $("#btnSubmit").prop("disabled", false);
            }


        }

    });

}
function getLease() {

    var baseurl = "http://localhost:8090/api/v1/lease/getleases";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",baseurl,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status ==200){
            var data = JSON.parse(xmlhttp.responseText);
            console.log(xmlhttp.responseText);
            $("#dataTable").DataTable({
                data:data,
                columns:[
                    {"data":"id"},
                    {"data":"name",
                    render:function(data){
                        return "<i class='fe fe-user'></i> <strong>"+data+"</strong>"
                    }},
                    {"data":"endDate",
                        render:function(data){
                            return "<i class='fe fe-calendar'></i> <strong>"+data+"</strong>"
                        }},
                    {"data":"status",
                    render:function(data){
                        if(data==="Active"){
                            return "<span class='badge badge-pill badge-success'> "+data+"</span>";
                        } else if(data==="Expired"){
                            return "<span class='badge badge-pill badge-warning'> "+data+"</span>";
                        }else{
                            return "<span class='badge badge-pill badge-danger'> "+data+"</span>";

                        }
                    }},
                    {"data":"id",
                        "sortable":false,
                        "searchable":false,
                        render:function (data) {
                        return '<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick="setLocal('`+data+`')"> <span class="text-muted sr-only">Action</span></button>'+`
                            <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item"   onclick="setLocal('`+data+`')" href="#">Terminate</a>
                            <a class="dropdown-item"  onclick="DownloadLeaseAgreementForm()">View More Details</a>
                        </div>`

                    }}
                ],
                autoWidth: true,
                "lengthMenu": [
                    [10, 25,50, 100, -1],
                    [10, 25,50, 100, "All"]
                ]
            });
        }
    };
}

