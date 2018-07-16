var userHeader = document.getElementById("userHeader");
var nameButton = document.getElementById("nameButton");
var nameInput = document.getElementById("nameInput");
var messages = document.getElementById("messages");
var text = document.getElementById("text");
var textSubmit = document.getElementById("textSubmit");

var nameUser = "User name";
userHeader.innerHTML = nameUser;

var socket = io.connect();

nameButton.addEventListener("click", function() {
    nameUser = nameInput.value || "User name";
    userHeader.innerHTML = nameUser;
});

textSubmit.addEventListener("click", function() {
    var data = {
        name: nameUser,
        text: text.value
    }

    text.value = "";

    socket.emit("chat message", data);
});

socket.on("chat history", function(msg) {
    console.log(msg);
    for(var i in msg) {
        if(msg.hasOwnProperty(i)) {
            var el = document.createElement("li");
            el.innerText = `${msg[i].name}: ${msg[i].text}`;
            messages.appendChild(el); 
        }
    }
});

socket.on("chat message", function(msg) {
    var el = document.createElement("li");
    el.innerText = `${msg.name}: ${msg.text}`;
    messages.appendChild(el); 
});