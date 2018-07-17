var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var messages = [];
var users = [];

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", function(req, res) {
    res.sendFile(__dirname + "/script.js");
});

app.get("/style.css", function(req, res) {
    res.sendFile(__dirname + "/style.css");
});

io.on("connection", function(socket) {

    console.log("client connected");

    socket.on("chat message", function(msg) {
        messages.push(msg);
        io.emit("chat message", msg);
    });

    socket.on("chat user", function(newUser) {
        newUser.dataInv = new Date();
        newUser.status = "just appeared";
        newUser.id = socket.id;
        users.push(newUser);
        io.emit("chat user", newUser);
    })

    socket.emit("adding user",  users);
    socket.emit("chat history", messages);

    socket.on('disconnect', function(){
        for(let i = 0; i < users.length; i++) {
            if(users[i].id == socket.id) {
                console.log(`${users[i].nickname} is disconnected`);
                users[i].status = "just left"; 
                io.emit("change status",  users[i]);
            }
        }
    });
});

http.listen(1428, function() {
    console.log("litening on *:1428");
});