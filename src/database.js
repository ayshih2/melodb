var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	email: { type: String, required: true },
	pictureUrl: String,
	likedSongs: [{ songId: String, likedDate: { type: Date, default: Date.now }}],
	history: [{
		songs: [{ songId: String, searchDate: { type: Date, default: Date.now }}],
		comparisons: [{ songId1: String, songId2: String, compareDate: { type: Date, default: Date.now }}]
	}],
	recommended: [String]
});

var SongSchema = new mongoose.Schema({
	songTitle: { type: String, required: true },
	artist: { type: String, required: true },
	genre: String,
	albumName: String,
	albumImgUrl: String,
	lyrics: String,
	relatedSongs: [String],
	sentiment: Number,
	BPM: Number
});

var userModel = mongoose.model('User', UserSchema);
var songModel = mongoose.model('Song', SongSchema);

module.exports = {
	userModel: userModel,
	songModel: songModel
}	
