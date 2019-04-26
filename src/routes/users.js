var models = require('../database');
var Song = models.songModel;
var User = models.userModel;

module.exports = function(router) {
	var userRoute = router.route('/hello');
	var tempWorldRoute = router.route('/world');
	var songRoute = router.route('/song');

	userRoute.get((req, res) => {
		res.status(200).send({ express: 'Hello From Express' });
	});
	userRoute.post((req, res) => {
		let newUser = new User({
			email: "testEmail"
		});
		newUser.save();
		res.status(201).send({
			message: "OK",
			data: newUser
		})
	});
	tempWorldRoute.post((req, res) => {
		console.log(req.body);
		res.status(201).send(
			`I received your POST request. This is what you sent me: ${req.body.post}`,
		);
	});
	songRoute.post((req, res) => {
		let newSong = new Song({
			songTitle: "testSong",
			artist: "testArtist"
		});
		newSong.save();
		res.status(201).send({
			message: "OK",
			data: newSong
		})
	});

	return router;
}


