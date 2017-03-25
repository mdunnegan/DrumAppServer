const User = require('../models/user');

exports.getUsers = function(req, res, next) {

	User.find({}, 'email', function(err, users){
		if (err) {
			return res.status(422).send({ error: 'Error getting the users' });
		}

		res.json({ users: users })
	})

}