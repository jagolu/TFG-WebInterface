document.addEventListener("DOMContentLoaded", function() { 
    $("#alertMessage").on("show.bs.modal", function(){
        (document).getElementById("navbarId").style.filter = "blur(6px)";
        (document).getElementById("mainOutlet").style.filter = "blur(6px)";
    });
    $("#alertMessage").on("hide.bs.modal", function(){
        (document).getElementById("navbarId").style.filter = "none";
        (document).getElementById("mainOutlet").style.filter = "none";
    });
});