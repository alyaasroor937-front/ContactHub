var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddres = document.getElementById("emailAddres");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var contactsCount = document.getElementById("contactsCount");
var emergencyCount = document.getElementById("emergencyCount");
var favoritCount = document.getElementById("favoritCount");
var totalCount = document.getElementById("totalCount");
var emergencyContainer = document.getElementById("emergencyContainer");
var favoritesContainer = document.getElementById("favoritesContainer");
var contacts = [];
var globalindex;
var contactsContainer = document.getElementById("contactsContainer");
var saveContactBtn = document.getElementById("saveContactBtn");
var searchInput = document.getElementById("searchInput");
searchInput.oninput = function(){
    var searchValue = searchInput.value;
    var filteredContacts = [];
    for(var i = 0 ; i < contacts.length ; i++){
        if (contacts[i].name.toLowerCase().includes(searchValue.toLowerCase())||
             contacts[i].phone.includes(searchValue) || 
        contacts[i].email.toLowerCase().includes(searchValue.toLowerCase())){
            filteredContacts.push(contacts[i]);
        }
    }
    displayContacts(filteredContacts);
}
saveContactBtn.onclick = function(){
    if (fullName.value === ""){
        Swal.fire("Missing Name","please enter the ful name","warning");
        return;
    }
    if (phoneNumber.value === ""){
        alert("please Enter your phone");
        return;
    }
    if(phoneNumber.value.length !==11){
        Swal.fire("Missing Name","please enter the phone Number","warning");
        return;
    }
    if (emailAddres.value === ""){
    Swal.fire("Missing Name","please enter the email Address","warning");
        return;
    }
    if(!emailAddres.value.includes("@")){
        Swal.fire("Missing Name","please enter a @","warning");
        return;
    }
        var contact = {
            id : globalindex !== undefined ? contacts[globalindex].id:Date.now(),
            name : fullName.value,
            phone : phoneNumber.value,
            email : emailAddres.value,
            addres : address.value,
            group : group.value,
            notes : notes.value,
            favorite:false,
            emergency : false,
        }
        if(globalindex !== undefined){
    Swal.fire("Updated!", "Contact updated successfully.", "success");
            } else {
    Swal.fire("Added!", "Contact added successfully.", "success");
}
        // contacts.push(contact);
        if(globalindex !== undefined){
            contacts[globalindex] = contact;
        }else{
            contacts.push(contact);
        }
        globalindex = undefined;

        displayContacts(contacts);
        updateStats();
        saveContacts()
        console.log(contact.length);

        console.log(contacts);
}
function displayContacts(contactsToDisplay){
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
    for (var i = 0; i < contactsToDisplay.length ; i++){
        contactsContainer.innerHTML +=` 
    <div class="contact-card" id="contactcard">
        <div class="contact-top">
            <div class="avatar-wrapper">
                <div class="avatar avatar-red">${contactsToDisplay[i].name.charAt(0)}</div>
                <span class="badge-icon badge-star"><i class="fa-solid fa-star"></i></span>
                <span class="badge-icon badge-heart"><i class="fa-solid fa-heart-pulse"></i></span>
            </div>
            <div class="contact-main-info">
                <h5 class="contact-name">${contactsToDisplay[i].name}</h5>
                <div class="contact-phone">
                    <span class="icon-box icon-blue"><i class="fa-solid fa-phone"></i></span>
                    <span>${contacts[i].phone}</span>
                </div>
            </div>
        </div>

        <div class="contact-row">
            <span class="icon-box icon-purple"><i class="fa-solid fa-envelope"></i></span>
            <span>${contactsToDisplay[i].email}</span>
        </div>

        <div class="contact-row">
            <span class="icon-box icon-green"><i class="fa-solid fa-location-dot"></i></span>
            <span>${contactsToDisplay[i].addres}</span>
        </div>
        <div class="contact-tages">
        <span class ="tag tag-work">
        ${contactsToDisplay[i].group}</span>
        </div>
<br>
        <div class="contact-tags">
            <span class="tag tag-work">Work</span>
            <span class="tag tag-emergency"><i class="fa-solid fa-heart"></i> Emergency</span>
        </div>

        <div class="contact-actions">
            <div class="actions-left">
            <a class="action-btn action-call" href="tel:${contactsToDisplay[i].phone}" style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;text-decoration:none;">
    <i class="fa-solid fa-phone"></i>
</a>
<a class="action-btn action-mail" href="mailto:${contactsToDisplay[i].email}" style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;text-decoration:none;">
    <i class="fa-solid fa-envelope"></i>
</a>
            </div>
            <div class="actions-right">
                <button class="action-btn action-star" onclick="toggleFavorite(${contactsToDisplay[i].id})"><i class=" fa-solid fa-star"></i></button>
                <button class="action-btn action-heart"onclick="toggleEmergency(${contactsToDisplay[i].id})"><i class="fa-solid fa-heart-pulse"></i></button>
                <button class="action-btn action-edit" onclick="editContact(${contactsToDisplay[i].id})"data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen"></i></button>
                <button class="action-btn action-delete" onclick="deleteContact(${contactsToDisplay[i].id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    </div>
`;
    }
}

    function deleteContact(id){
    Swal.fire({
        title: "Delete Contact?",
        text: "Are you sure you want to delete this contact? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#e11d48"
    }).then(function(result){
        if(result.isConfirmed){
            var index = contacts.findIndex(function(c){ return c.id === id; });
            contacts.splice(index,1);
            displayContacts(contacts);
            updateStats();
            displayFavorites();
            displayEmergency();
            saveContacts();
            Swal.fire("Deleted!", "The contact has been deleted.", "success");
        }
    });
}

function editContact(id){
    var index = contacts.findIndex(function(c){return c.id === id;});
    var contact = contacts[index];
    globalindex = index;
    fullName.value = contact.name;
    phoneNumber.value = contact.phone;
    emailAddres.value = contact.email;
    address.value = contact.addres;
    group.value = contact.group;
    notes.value = contact.notes;

}
function toggleFavorite(id){
    var index = contacts.findIndex(function(c){return c.id === id;});
    contacts[index].favorite = ! 
    contacts[index].favorite;
    displayContacts(contacts);
    updateStats();
    displayFavorites();
    saveContacts()
}
function toggleEmergency(id){
    var index = contacts.findIndex(function(c){return c.id === id;});
    contacts[index].emergency =!
    contacts[index].emergency;
    displayContacts(contacts);
    updateStats();
    displayEmergency();
    saveContacts()
}
function updateStats(){
    totalCount.innerHTML = contacts.length;
    contactsCount.innerHTML = contacts.length;
    var favorites = 0;
    var emergency = 0;
    for(var i = 0; i < contacts.length ; i++){
        if (contacts[i].favorite === true){
            favorites++;
        }
        if (contacts[i].emergency === true){
            emergency ++;
        }
    }
    favoritCount.innerHTML = favorites;
    emergencyCount.innerHTML = emergency;
}

function displayFavorites() {
    console.log("displayFavorites is working");

    var favoriteContacts = [];

    for (var i = 0; i < contacts.length; i++) {

        if (contacts[i].favorite === true) {
            favoriteContacts.push(contacts[i]);
        }
    }

    if (favoriteContacts.length === 0) {
        favoritesContainer.innerHTML =` 
            <p class="p-nofav">No favorites yet</p>
        `;
        return;
    }

    favoritesContainer.innerHTML = "";

    for (var i = 0; i < favoriteContacts.length; i++) {

        favoritesContainer.innerHTML +=`
            <div class="text-start p-3">
                <div class="d-flex align-items-center gap-3 mmm">
                    <div class="avatar avatar-red avattter fs-6">
                        ${favoriteContacts[i].name.charAt(0)}
                    </div>

                    <div>
                        <h5 class="mb-1">${favoriteContacts[i].name}</h5>
                        <p class="mb-0 text-secondary">
                            ${favoriteContacts[i].phone}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}


function displayEmergency() {

    var emergencyContacts = [];

    for (var i = 0; i < contacts.length; i++) {

        if (contacts[i].emergency === true) {
            emergencyContacts.push(contacts[i]);
        }
    }

    if (emergencyContacts.length === 0) {
        emergencyContainer.innerHTML =`
            <p class="p-nofav">No emergency contacts</p>
        `;
        return;
    }

    emergencyContainer.innerHTML = "";

    for (var i = 0; i < emergencyContacts.length; i++) {

        emergencyContainer.innerHTML +=` 
            <div class="text-start p-3">
                <div class="d-flex align-items-center gap-3 mmm">

                    <div class="avatar avattter avatar-red">
                        ${emergencyContacts[i].name.charAt(0)}
                    </div>

                    <div>
                        <h5 class="mb-1">${emergencyContacts[i].name}</h5>

                        <p class="mb-0 text-secondary">
                            ${emergencyContacts[i].phone}
                        </p>
                    </div>

                </div>
            </div>
        `;
    }
}
function saveContacts(){
    localStorage.setItem("contacts",JSON.stringify(contacts));
}
function loadContacts(){
    var saved = localStorage.getItem("contacts");
    if(saved){
        contacts = JSON.parse(saved);
    }
}
loadContacts();
displayContacts(contacts);
updateStats();
displayFavorites();
displayEmergency();