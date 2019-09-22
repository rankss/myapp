const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

var router = express.Router();

router.get('/', (req, res) => {
	res.send('register');
});

router.post('/', (req, res) => {
	const email = req.body.email;
	const username = req.body.username;

	if (req.body.password === req.body.password2) {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt); 

		const newUser = {email: email, username: username, password: hash};

		User.create(newUser, (err, newUser) => {
			if (err) {
				console.log(err);
			} else {
				res.status(201).send();
			}
		});
	} else {
		console.log("passwords don't match");
	}
});

module.exports = router;
