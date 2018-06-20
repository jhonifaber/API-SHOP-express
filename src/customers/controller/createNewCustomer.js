const fs = require("fs")
let rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)
 

module.exports = {
    createNewCustomer : createNewCustomer 
}

function createNewCustomer (req, res){
    var newCustomer = createUser(req)
    data.push(newCustomer)
    let newCustomerJSON = JSON.stringify(data, null, 2);  
    fs.writeFileSync('./src/customers.json', newCustomerJSON);
    newCustomer = {}
    return res.sendStatus(201)
}

function createUser(req){
    const {surname, name, photo} = req.body;

    var newCustomer = {
        name : name,
        surname : surname,
        id : name + surname + Date.now(),
        photo : photo,
        createdBy : req.decoded.username,
        lastChangeBy : req.decoded.username
    }
    return newCustomer
}