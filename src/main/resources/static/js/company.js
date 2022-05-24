
function saveCompany(){
    let ban = $('#DocumentUploadForm')[0];
    let log = $('#DocumentUploadForm')[1];


    let ajaxData = new FormData(ban)

    ajaxData.append(log,logo.files[0])

    ajaxData.append("company_name",company_name)
    ajaxData.append("company_location",company_location)


    $("#btnSubmit").prop("disabled", false);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/v1/savecompany",
        data: ajaxData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (response) {
            $('#successModal').modal('show');
            console.log(response)


        },
        error: function (e) {

            console.log(e);
        }


    })







}

function decryptKey(){
    var id = JSON.parse(localStorage.getItem("t_id"));

    $.ajax({
        url: '/api/v1/decrypt/' + id,
        type: 'Get',
        success: function (response) {
            console.log(response)
        },

    })

}