const Tab = require('../models/tab');
const UsersController = require('./users');

exports.createTab = function(req, res, next) {

	const noteRows = req.body.noteRows;
	const bpm = req.body.bpm;
	const email = req.body.email;
	const creator = UsersController.getUserIdByEmail(email)

	const noteRowsObj = {
		hiHat: noteRows[0],
		snare: noteRows[1],
		bass: noteRows[2],
	};

	const tab = new Tab({
		noteRows: noteRowsObj,
		bpm: bpm,
		creator: creator
	});

	tab.save(function(err) {
		if (err) { return next(err); }
		res.json(tab)
	});

}