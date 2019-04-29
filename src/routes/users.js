var models = require('../database');
var Song = models.songModel;
var User = models.userModel;

module.exports = function(router) {
	var userRoute = router.route('/user');
	// var tempWorldRoute = router.route('/world');
	// var songRoute = router.route('/song');
	console.log('test')
	userRoute.get((req, res) => {
		if (Object.keys(req.query).length == 1) {
			User.findOne({ email: req.query.email }, (err, res_user) => {
				if (!res_user) {
					res.status(404).send({
	                    message: "User not found",
	                    data: {}
	                });
				} else if (err) {
					res.status(500).send({
	                    message: "Server error",
						data: {},
						error: err
	                });
				} else {
					res.status(200).send({
						message: "OK",
						data: res_user
					});
				}
			});
		} else if (Object.keys(req.query).length == 2) {
			if (req.query.type == "recommended") {
				//stuff goes here
			} else if (req.query.type == "history") {
				//stuff goes here
			} else if (req.query.type == "liked") {
				User.findOne({ email: req.query.email }, (err, res_user) => {
					if (!res_user) {
						res.status(404).send({
		                    message: "User not found",
		                    data: {}
		                });
					} else if (err) {
						res.status(500).send({
		                    message: "Server error",
							data: {},
							error: err
		                });
					} else {
						res.status(200).send({
							message: "OK",
							data: res_user.likedSongs
						});
					}
				});
			} else {
				res.status(400).send({
					message: "This is not a valid GET type for a user.",
					data: {}
				});
			}

		} else {
			res.status(400).send({
				message: "This is not a valid request.",
				data: {}
			});
		}
		// res.status(200).send({ express: 'Hello From Express' });
	});

	// userRoute.post((req, res) => {
	// 	let newUser = new User({
	// 		email: "testEmail"
	// 	});
	// 	newUser.save();
	// 	res.status(201).send({
	// 		message: "OK",
	// 		data: newUser
	// 	})
	// });
	// tempWorldRoute.post((req, res) => {
	// 	console.log(req.body);
	// 	res.status(201).send(
	// 		`I received your POST request. This is what you sent me: ${req.body.post}`,
	// 	);
	// });
	// songRoute.post((req, res) => {
	// 	let newSong = new Song({
	// 		songTitle: "testSong",
	// 		artist: "testArtist"
	// 	});
	// 	newSong.save();
	// 	res.status(201).send({
	// 		message: "OK",
	// 		data: newSong
	// 	})
	// });

	return router;
}


