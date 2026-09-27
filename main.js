var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddres = document.getElementById("emailAddres");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var contacts = [];

var saveContactBtn = document.getElementById("saveContactBtn");
saveContactBtn.onclick = function(){
        var contact = {
            name : fullName.value,
            phone : phoneNumber.value,
            email : emailAddres.value,
            addres : address.value,
            group : group.value,
            notes : notes.value,
        }
        console.log(contact);
}
