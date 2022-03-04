
document.getElementById("addNewContact").addEventListener("click", function() {
    var form = document.getElementById("updateForm");
    if (form.style.display == "none"){
        form.style.display = "block"
        document.getElementById("addNewContact").innerHTML = "Hide"
    }else{
        form.style.display = "none"
        document.getElementById("addNewContact").innerHTML = "Add a new contact"
    }
})