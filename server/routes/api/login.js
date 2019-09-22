const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

var router = express.Router();

router.get('/', (req, res) => {
    res.send('login');
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, (err, query) => {
        if (err) {
            console.log(err);
        } else {
            if (bcrypt.compareSync(password, query.password)) {
                console.log('login successful');

            } else {
                console.log('login failed');
            }
            res.status(201).send();
        }
    });
});

module.exports = router;
