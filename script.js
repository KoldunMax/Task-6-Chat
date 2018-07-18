
// -======================================================--==----------========
var inviteButton = document.getElementById("inviteButton");
var inviteName = document.getElementById("inviteName");
var inviteNick = document.getElementById("inviteNick");
var inviteForm = document.getElementById("inviteform");
var ULasideUsers = document.getElementById("users-name-list");
var headerChatTitle = document.getElementById("header-chat-title");
var textMessageFooter = document.getElementById("text-message-footer");
var buttonMessageFooter = document.getElementById("button-message-footer");
var mainWrapperMessages = document.getElementById("main-wrapper-messages");
var mainWrapperChat = document.getElementById("main-wrapper-chat");
var contentMessage = mainWrapperMessages.getElementsByClassName("message-content");
var headerNameUser;
var feedback = document.getElementById("feedback");

var nameUser = "User name";
var socket = io.connect();

inviteButton.addEventListener("click", function() {
    nameUser = {
        name: inviteName.value,
        nickname: inviteNick.value
    }

    headerChatTitle.innerHTML = `You successfully joined in chat  <span id="headerName">${nameUser.nickname}</span`;
    headerNameUser = document.getElementById("headerName");
    socket.emit("chat user", nameUser);
});

buttonMessageFooter.addEventListener("click", function() {
    var data = {
        name: nameUser.name,
        nickname: nameUser.nickname,
        text: textMessageFooter.value,
        time: new Date()
    }
    textMessageFooter.value = "";
    feedback.innerHTML = "";
    socket.emit("chat message", data);
});

textMessageFooter.addEventListener("keyup", function() {
    socket.emit("typing", {nick: nameUser.nickname, lengthMes: textMessageFooter.value.length});
});

socket.on("typing", function(data) {
    feedback.innerHTML = data;
});

socket.on("chat history", function(msg) {
    for(var i in msg) {
        if(msg.hasOwnProperty(i)) {
            var namePlace = document.createElement("p");
            namePlace.className = "nick-name-message";
            namePlace.innerText = `${msg[i].name}(@${msg[i].nickname})`;
            var timePlace = document.createElement("p");
            timePlace.className = "time-sent-message";
            let date = new Date(msg[i].time);
            var mm = date.getMonth(); 
            var dd = date.getDate();
            var hh = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
            timePlace.innerText = `${[  (hh>9 ? '' : '0') + hh + 'h', 
                                        (min>9 ? '' : '0') + min + 'm', 
                                        (sec>9 ? '' : '0') + sec + 's',
                                        (dd>9 ? '' : '0') + dd,
                                        mS[+((mm>9 ? '' : '0') + mm)],
                                        date.getFullYear()
                                    ].join(',')}`;

            var textPlace = document.createElement("p");
            textPlace.className = "message-user-text";
            textPlace.innerText = msg[i].text;

            var wrapperMessage = document.createElement("div");
            wrapperMessage.className = "message-content other-user";
            wrapperMessage.appendChild(namePlace);
            wrapperMessage.appendChild(timePlace);
            wrapperMessage.appendChild(textPlace);
            
            mainWrapperMessages.appendChild(wrapperMessage);
        }
    }
});

socket.on("chat history current user", function(data) {
    while(mainWrapperMessages.children[0].className) {
        mainWrapperMessages.children[0].remove();
        if(!mainWrapperMessages.children[0]) {
            break;
        }
    } 
    for(var i in data.msg) {
        if(data.msg.hasOwnProperty(i)) {
            var namePlace = document.createElement("p");
            namePlace.className = "nick-name-message";
            namePlace.innerText = `${data.msg[i].name}(@${data.msg[i].nickname})`;

            var timePlace = document.createElement("p");
            timePlace.className = "time-sent-message";

            let date = new Date(data.msg[i].time);

            var mm = date.getMonth(); 
            var dd = date.getDate();
            var hh = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 

            timePlace.innerText = `${[  (hh>9 ? '' : '0') + hh + 'h', 
                                        (min>9 ? '' : '0') + min + 'm', 
                                        (sec>9 ? '' : '0') + sec + 's',
                                        (dd>9 ? '' : '0') + dd,
                                        mS[+((mm>9 ? '' : '0') + mm)],
                                        date.getFullYear()
                                    ].join(',')}`;

            var textPlace = document.createElement("p");
                        
            var str = data.msg[i].text;

            if(str.search(`@${data.nick}`) != -1) {
               textPlace.className = "message-user-text message-user-text-regex";
            } else {
                textPlace.className = "message-user-text";
            }

            textPlace.innerText = data.msg[i].text;

            var wrapperMessage = document.createElement("div");

            if(data.msg[i].nickname != data.nick) {
                wrapperMessage.className = "message-content other-user";
            } else {
                wrapperMessage.className = "message-content current-user";
            }
            wrapperMessage.appendChild(namePlace);
            wrapperMessage.appendChild(timePlace);
            wrapperMessage.appendChild(textPlace);
            mainWrapperMessages.appendChild(wrapperMessage);
        }
    }
});

socket.on("chat message", function(msg) {
    feedback.innerHTML = "";
    var namePlace = document.createElement("p");
    namePlace.className = "nick-name-message";
    namePlace.innerText = `${msg.name}(@${msg.nickname})`;

    var timePlace = document.createElement("p");
    timePlace.className = "time-sent-message";

    let date = new Date(msg.time);

    var mm = date.getMonth(); 
    var dd = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 

    timePlace.innerText = `${[  (hh>9 ? '' : '0') + hh + 'h', 
                                (min>9 ? '' : '0') + min + 'm', 
                                (sec>9 ? '' : '0') + sec + 's',
                                (dd>9 ? '' : '0') + dd,
                                mS[+((mm>9 ? '' : '0') + mm)],
                                date.getFullYear()
                             ].join(',')}`;

    var textPlace = document.createElement("p");
    var str =  msg.text;

    if(str.search(`@${headerNameUser.innerText}`) != -1) {
        textPlace.className = "message-user-text message-user-text-regex";
    } else {
         textPlace.className = "message-user-text";
    }
    textPlace.innerText = msg.text;

    var wrapperMessage = document.createElement("div");
    wrapperMessage.className = "message-content other-user";
    wrapperMessage.appendChild(namePlace);
    wrapperMessage.appendChild(timePlace);
    wrapperMessage.appendChild(textPlace);
    mainWrapperMessages.appendChild(wrapperMessage);

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
});

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
    ULasideUsers.appendChild(el); 
});

socket.on("chat user invite", function() {
    inviteForm.style.display = "none";
    mainWrapperChat.style.display = "grid";
})

socket.on("incorrect fields", function(msg) {
    alert(msg);
})
