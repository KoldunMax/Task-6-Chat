var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var messages = [];

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", function(req, res) {
    res.sendFile(__dirname + "/script.js");
});

io.on("connection", function(socket) {
    console.log("client connected");
    socket.on("chat message", function(msg) {
        messages.push(msg);
        io.emit("chat message", msg);
    });

    socket.emit("chat history", messages);
});

http.listen(1428, function() {
    console.log("litening on *:1428");
});