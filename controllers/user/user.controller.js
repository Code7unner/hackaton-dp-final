const jwt = require('jsonwebtoken');
const db = require('../../_helpers/db');
const keys = require('../../_helpers/dbConfig');
const bcrypt = require('bcryptjs');
const User = db.User;

// creating user schema
function create(req, res) {
    User.findOne({ phone: req.body.phone })
        .then(user => {
            if (user) {
                return res.status(400).json('User already exists');
            } else {
                const newUser = new User({
                    phone: req.body.phone,
                    password: req.body.password,
                    name: req.body.name,
                    address: req.body.address
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => res.status(404).json(err))
                    })
                });
            }
        })
        .catch(err => res.status(404).json(err))
}

// login user by phone number and password
function login(req, res) {
    const password = req.body.password;
    const phone = req.body.phone;

    User.findOne({ phone })
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found');
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            //User matched
                            const payload = { id: user.id, phone: user.phone };
                            //Sign token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 36000 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token,
                                        user
                                    })
                                }
                            );
                        } else {
                            return res.status(400).json('Input info is incorrect');
                        }
                    })
            }
        })
}

module.exports = {
    create,
    login
};