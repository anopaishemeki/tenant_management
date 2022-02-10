function getTenants(){

    $.ajax({
        url: 'http://localhost:16000/api/tenants/get-all-tenants',
        type: 'GET',
        success: function (response) {

            console.log(response);

        }
    })
}