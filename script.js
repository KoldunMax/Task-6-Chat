var userHeader = document.getElementById("userHeader");
var nameButton = document.getElementById("nameButton");
var nameInput = document.getElementById("nameInput");
var messages = document.getElementById("messages");
var text = document.getElementById("text");
var textSubmit = document.getElementById("textSubmit");

var nameUser = "User name";
userHeader.innerHTML = nameUser;

var socket = io.connect();