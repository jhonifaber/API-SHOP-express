const crypto = require('crypto');
const UserModel = require('./../model');

module.exports = {
    createNewUser
}

function createNewUser(req, res, next) {
    const { name, username, password, admin } = req.body
    let user = new UserModel.User({
        name: name,
        username: username,
        password: hashPassword(password),
        id: username + Date.now(),
        admin: admin || false
    })

    UserModel.User.find({ username: user.username }, (error, user) => {
        if (user.length) {
            return res.status(409).send({ error: "Username already exists" });
        }
        user.save(((error, newUser) => {
            if (error) return res.sendStatus(404)
            return res.status(201).json(newUser);
        }))
    })



}

function checkIfUsernameExists(username) {

}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}