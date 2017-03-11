const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {
	// user has already had email and password authed
	// just need to give them a token
	res.send({ token:  tokenForUser(req.user) }); // had a syntax bug here
}

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You provide an email and password' });
	}

	// see if a user with given email exists
	User.findOne({ email: email }, function(err, existingUser) {
		if (err) { return next(err); }

		// if does exist, return error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is already in use' });
		}

		// if not exists, create user record
		const user = new User({
			email: email,
			password: password
		});

		// save record
		user.save(function(err) {
			if (err) { return next(err); }

			// respond to request
			// send the token too
			res.json({ token: tokenForUser(user) });
		});

	});
}