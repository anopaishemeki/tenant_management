$(document).ready(
    function(){
        $("#tenantForm").submit(function (event){
            event.preventDefault();
            ajaxPost();

        });

        function ajaxPost(){

            var formData = {
                name: $("#fname").val(),
                surname:$("#lname").val() ,
                email: $("#email").val(),
                phone: $("#mob").val(),
                id_passport: $("#passport").val(),
                tenantBusiness:{
                    business_name:$("#bname").val(),
                    business_type:$("#btype").val(),
                    services:$("#service").val(),
                },
                address: {
                    house_no:$("#house").val(),
                    street:$("#street").val(),
                    city:$("#city").val(),
                    country:$("#country").val()

                }
            }

            $.ajax(({
                type: "POST",
                contentType:"application/json",
                url: "http://localhost:16000/tenants/addTenants",
                data: JSON.stringify(formData),
                dataType: "json",
                success: function (result){
                    if(result.status == "success"){
                        console.log("Success");
                    }
                    else{
                        console.log("Error");
                    }
                }
            }))

        }
    }
)