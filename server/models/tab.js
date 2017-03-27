const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabSchema = new Schema({
	noteRows: Schema.Types.Mixed,
	bpm: Number,
	loop: Boolean,
	creator: Schema.Types.ObjectId
});

const ModelClass = mongoose.model('tab', tabSchema);

module.exports = ModelClass;