var userHeader = document.getElementById("userHeader");
var nameButton = document.getElementById("nameButton");
var nameInput = document.getElementById("nameInput");
var messages = document.getElementById("messages");
var text = document.getElementById("text");
var textSubmit = document.getElementById("textSubmit");
// -======================================================--==----------========
var inviteButton = document.getElementById("inviteButton");
var inviteName = document.getElementById("inviteName");
var inviteNick = document.getElementById("inviteNick");
var ULasideUsers = document.getElementById("users-name-list");

console.log(ULasideUsers);

var nameUser = "User name";
userHeader.innerHTML = nameUser;

var socket = io.connect();

nameButton.addEventListener("click", function() {
    nameUser = nameInput.value || "User name";
    userHeader.innerHTML = nameUser;
});

inviteButton.addEventListener("click", function() {
    var newUser = {
        name: inviteName.value,
        nickname: inviteNick.value
    }

    socket.emit("chat user", newUser);
})

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

socket.on("adding user", function(users) {

    for(var i in users) {
        if (users.hasOwnProperty(i)) {

            var el = document.createElement("li");
            var onlineC = document.createElement("span");
            var onlinelabel = document.createElement("span");
            var nameOfUser = document.createElement("span");
            onlinelabel.className = "state-time-coming";
            nameOfUser.innerText = `${users[i].nickname}`;

            if(users[i].status == "online") {
                onlineC.className = "online";
                onlinelabel.innerText = "online";
            }
        
            if(users[i].status == "just appeared") {
                onlineC.className = "online";
                onlinelabel.innerText = "just appeared";
            }
        
            if(users[i].status == "offline") {
                onlineC.className = "offline";
                onlinelabel.innerText = "offline";
            }
        
            if(users[i].status == "just left") {
                onlineC.className = "offline";
                onlinelabel.innerText = "just left";
            }

            el.appendChild(onlinelabel);
            el.insertBefore(nameOfUser, onlinelabel);
            el.insertBefore(onlineC, nameOfUser);

            ULasideUsers.appendChild(el); 
        }
    }
});

socket.on("change status", function(user) {
    for(let obj of ULasideUsers.getElementsByTagName("li")) {
        if(obj.children[1].innerText == user.nickname) {
            obj.children[2].innerText = user.status;
            if(user.status == "offline" || user.status == "just left"){
                obj.children[0].className = "offline";
            } else {
                obj.children[0].className = "online";
            }
        }
    }
})

/* 
for(let obj of ULasideUsers.getElementsByTagName("li")) {
	obj.children[0].className = "offline";
	obj.children[1].innerText = "just left"
}
*/

socket.on("chat user", function(user) {
    var el = document.createElement("li");
    var onlineC = document.createElement("span");
    var onlinelabel = document.createElement("span");
    var nameOfUser = document.createElement("span");
    nameOfUser.innerText = `${user.nickname}`;
    onlinelabel.className = "state-time-coming";

    onlineC.className = "online";
    onlinelabel.innerText = "just appeared";

    el.appendChild(onlinelabel);
    el.insertBefore(nameOfUser, onlinelabel);
    el.insertBefore(onlineC, nameOfUser);
    console.log(el);
    ULasideUsers.appendChild(el); 
});