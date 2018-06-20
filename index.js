var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var helmet = require('helmet')

var customerController = require("./src/customers/index.js");
var authorization = require("./src/auth/authorization.js"); 
var headers = require("./src/auth/secure-headers.js"); 
var output = require("./src/auth/secure-output.js"); 
var userController = require("./src/login/index.js");

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(helmet())

app.use("/login", userController);

app.use(authorization);
app.use(headers);
app.use(output);

app.use("/customers", customerController);

app.listen(PORT, () => { 
    console.log(`Running at http://localhost:${PORT}`);
})