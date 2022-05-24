function saveReplyDetails() {


    var data = new FormData();

    var s=document.getElementById("companyName");

    if(s.value.toString().length==0){
        alert("Company name is required","danger");
        var r=document.getElementById("retry");
        r.setAttribute("style","display:all");

        return
        }

var p=document.getElementById("addressLine1");

if(p.value.toString().length==0){
    alert("Address Line 1 is required","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var we =document.getElementById("addressLine2");
if(we.value.toString().length==0){
    alert("Address Line2 is Required","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}

var pr=document.getElementById("addressLine3");
if(pr.value.toString().length==0){
    alert(" Address line 3 is Required","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}


var ss=document.getElementById("shop_size");

if(ss.value.toString().length==0){
    alert("Shop size is Required!!","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var re=document.getElementById("rent");

if(re.value.toString().length==0){
    alert("Rent fee is Required!!","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var df=document.getElementById("deposit_fee");

if(df.value.toString().length==0){
    alert("Deposit Fee is Required!!","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var oc=document.getElementById("operation_cost");

if(oc.value.toString().length==0){
    alert("Operation cost is Required!!","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var lt=document.getElementById("lease_term");

if(lt.value.toString().length==0){
    alert("Lease Term is Required!!","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}
var fop=document.getElementById("fit_out_period");

if(fop.value.toString().length==0){
    alert("Fit out Period is Required!!","danger");
    var r=document.getElementById("retry");
    r.setAttribute("style","display:all");

    return
}





    var jsonDataObj = {
        "companyName": $("#companyName").val(),
        "addressLine1": $("#addressLine1").val(),
        "addressLine2": $("#addressLine2").val(),
        "addressLine3": $("#addressLine3").val(),
        "fit_out_period": $("#fit_out_period").val(),
        "lease_term":$("#lease_term").val(),
        "operation_cost":$("#operation_cost").val(),
        "deposit_fee":$("#deposit_fee").val(),
        "rent":$("#rent").val(),
        "shop_size":$("#shop_size").val(),
    };
    data.append("jsondata", JSON.stringify(jsonDataObj));
$("#btnSubmit").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/api/v1/replyDocuments",
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
            alert('Details Save SuccessFully ', 'success')



        },
        error: function (e) {
            if(e.status.toString()=="200"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:none");
                alert("Details  Saved Successfully ", 'success');
                console.log("ERROR : ", e);

            }else if(e.status.toString()=="500"){

                var r=document.getElementById("retry");
                r.setAttribute("style","display:all");
                alert(e.responseJSON.message, 'danger');
                $("#btnSubmit").prop("disabled", false);
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