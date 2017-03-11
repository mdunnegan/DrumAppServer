const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ hi: 'there' });
	});

	// before a user will ever see the signin route, they'll run through the local strategy middleware
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
}