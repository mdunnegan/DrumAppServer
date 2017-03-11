const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
// Looks for email and password instead of new signup
const localOptions = { usernameField: 'email' }; // where passport can find the name it needs
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	// Verify this username and password, call done with the user

	console.log("in local login")

	User.findOne({ email: email }, function(err, user) {

		console.log("1")
		if (err) { return done(err); }
		console.log("2")
		if (!user) { return done(null, false); }

		console.log("3")

		// compare passwords
		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }
			console.log("passwords match")
			return done(null, user);
		});
	});

	// If the username and password are correct

	// Else call done with false
});

// set up options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// create JWT Strategy
// strategies attempt to authenticate users in a paticular fashion

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// see if user ID in payload exists in our database
	// if it does, call done with that user
	// otherwise call done without a user obj

	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false); }

		if (user) { 
			done(null, user); // had a bug here. called done(user), which returned the user in postman, lol
		} else {
			done(null, false);
		}
	});
});

// tell passport to use JWT Strategy
passport.use(jwtLogin);
passport.use(localLogin);