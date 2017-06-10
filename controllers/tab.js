const Tab = require('../models/tab');
const UsersController = require('./users');

exports.createTab = function(req, res, next) {

	const noteRows = req.body.noteRows;
	const bpm = req.body.bpm;
	const email = req.body.email;
	const noteRowsObj = [
		noteRows[0],
		noteRows[1],
		noteRows[2],
	];

	UsersController.getUserIdByEmail(email, function(creatorId, error) {

		if (error) {
			res.status(422).send({ error: 'Cannot find your email address' });
		}

		const tab = new Tab({
			noteRows: noteRowsObj,
			bpm: bpm,
			creator: creatorId
		});

		tab.save(function(err) {
			if (err) { 
				res.status(422).send({ error: 'Error saving this tab' });
				return next(err);
			}
			res.sendStatus(200);
		});
	});

}

exports.getTabsByEmail = function(req, res, next) {

	const email = req.query.email;
	
	UsersController.getUserIdByEmail(email, function(creatorId, error) {

		if (error) {
			res.status(422).send({ error: "Sorry, we couldn't verify your email address" });
		}

		// This callback function takes error as the first argument
		Tab.find({creator: creatorId}, function(error, tabs) {

			if (error) {
				res.status(422).send({ error: 'Sorry, could not find your music' });
			}
			res.json({tabs: tabs});
		}).sort({ _id: -1 });


	});
}

exports.deleteAll = function(req, res, next) {
	Tab.remove({}, res.sendStatus(200));
}

