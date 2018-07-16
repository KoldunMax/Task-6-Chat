var app = require("express")(),
    http = require("http").Server(app),
    io = require("socket.io")(http);

var messages = [];

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", function(req, res) {
    res.sendFile(__dirname + "/script.js");
});

io.get("connection", function() {
    console.log("client connected");
})

http.listen(1428, function() {
    console.log("litening on *:1428");
});