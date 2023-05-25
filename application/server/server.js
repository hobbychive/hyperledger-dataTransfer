const express = require("express");
const app = express();

var path = require("path");
var sdk = require("./sdk.js");

var http = require("http");
var bodyParser = require("body-parser");
var fs = require("fs");
var util = require("util");
var os = require("os");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./controller.js")(app);
app.use(express.static(path.join(__dirname, "../app")));

var port = process.env.PORT || 8080;
var HOST = "localhost";

app.listen(port, function () {
  console.log(`Live on port: http://${HOST}:${port}`);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../app/main.html"));
});
