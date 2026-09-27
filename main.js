var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddres = document.getElementById("emailAddres");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var contacts = [];
var contactsContainer = document.getElementById("contactsContainer");
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
        contacts.push(contact);
        displayContacts();

        console.log(contacts);
}
function displayContacts(){
    contactsContainer.innerHTML = "";

    if (contacts.length === 0) {
    contactsContainer.innerHTML = `
        <div class="text-center w-100">
            <i class="fa-solid fa-address-book bg-dark p-3 rounded-3 text-light fs-5 bg-opacity-50"></i>
            <h3 class="h3-found">No contacts found</h3>
            <p class="p-add">Click "Add Contact" to get started</p>
        </div>
    `;

    return;
}
    for (var i = 0; i < contacts.length ; i++){
        contactsContainer.innerHTML +=` 
    <div class="contact-card" id="contactcard">
        <div class="contact-top">
            <div class="avatar-wrapper">
                <div class="avatar avatar-red">${contacts[i].name.charAt(0)}</div>
                <span class="badge-icon badge-star"><i class="fa-solid fa-star"></i></span>
                <span class="badge-icon badge-heart"><i class="fa-solid fa-heart-pulse"></i></span>
            </div>
            <div class="contact-main-info">
                <h5 class="contact-name">${contacts[i].name}</h5>
                <div class="contact-phone">
                    <span class="icon-box icon-blue"><i class="fa-solid fa-phone"></i></span>
                    <span>${contacts[i].phone}</span>
                </div>
            </div>
        </div>

        <div class="contact-row">
            <span class="icon-box icon-purple"><i class="fa-solid fa-envelope"></i></span>
            <span>${contacts[i].email}</span>
        </div>

        <div class="contact-row">
            <span class="icon-box icon-green"><i class="fa-solid fa-location-dot"></i></span>
            <span>${contacts[i].addres}</span>
        </div>
        <div class="contact-tages">
        <span class ="tag tag-work">
        ${contacts[i].group}</span>
        </div>
<br>
        <div class="contact-tags">
            <span class="tag tag-work">Work</span>
            <span class="tag tag-emergency"><i class="fa-solid fa-heart"></i> Emergency</span>
        </div>

        <div class="contact-actions">
            <div class="actions-left">
                <button class="action-btn action-call"><i class="fa-solid fa-phone"></i></button>
                <button class="action-btn action-mail"><i class="fa-solid fa-envelope"></i></button>
            </div>
            <div class="actions-right">
                <button class="action-btn action-star"><i class="fa-solid fa-star"></i></button>
                <button class="action-btn action-heart"><i class="fa-solid fa-heart-pulse"></i></button>
                <button class="action-btn action-edit"><i class="fa-solid fa-pen"></i></button>
                <button class="action-btn action-delete" onclick="deleteContact(${i})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    </div>
`;
    }
}

function deleteContact(index){
    contacts.splice(index,1);
    displayContacts();
}