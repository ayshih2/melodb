var models = require('../database');
var Song = models.songModel;
var User = models.userModel;
var utils = require('../utils.js');

function songIn(arr, song) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].songId == song) {
			return true;
		}
	}
	return false;
}

module.exports = function(router) {
	var userRoute = router.route('/user');

	userRoute.get((req, res) => {
		// if (!utils.hasValidCredentials(req)) {
		// 	res.status(401).send({
		// 		message: "Missing bearer token. Only logged in users can make API requests."
		// 	});
		// 	return;
		// }

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
							data: res_user.recommended
						});
					}
				});
			} else if (req.query.type == "history") {
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
							data: res_user.history
						});
					}
				});
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

	userRoute.put((req, res) => {
		if (Object.keys(req.query).length == 1) {
			//change name & picture
		} else if (Object.keys(req.query).length == 3) {
			if (req.query.type == "history" &&
				(req.query.add == "song" || req.query.add == "comparison")) {
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
						if (req.query.add == "song") {
							songHistory = res_user.history.songs;
							let songObj = {
								songId: req.body.songName
							};

							User.findById(res_user._id, (erru, resu) => {
								resu.history[0].songs.push(songObj);
								resu.save((errsave, ressave) => {
									if (errsave == null) {
										res.status(200).send({
											message: "OK",
											data: {}
										});
									} else {
										res.status(500).send({
											message: "Failed to add song to history",
											data: {},
											error: errsave
										});
									}
								});
							});
						} else {
							compHistory = res_user.history.compHistory;
							let compObj = {
								songId1: req.body.songName1,
								songId2: req.body.songName2
							};

							
							User.findById(res_user._id, (erru, resu) => {
								resu.history[0].comparisons.push(compObj);
								resu.save((errsave, ressave) => {
									if (errsave == null) {
										res.status(200).send({
											message: "OK",
											data: {}
										});
									} else {
										res.status(500).send({
											message: "Failed to comparison to history",
											data: {},
											error: errsave
										});
									}
								});
							});
						}
					}
				});
			} else {
				res.status(400).send({
					message: "This is not a valid request (query contents wrong).",
					data: {}
				});
			}
		} else {
			res.status(400).send({
				message: "This is not a valid request (query length wrong).",
				data: {}
			});
		}
	});

	userRoute.post((req, res) => {
		if (Object.keys(req.query).length == 2 && req.query.type == "liked") {
			let songName = req.body.songName;
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
					liked = res_user.likedSongs;
					let songObj = {
						songId: songName
					};
					if (songIn(liked, songName)) {
						User.findByIdAndUpdate(res_user._id, 
							{$pull: {likedSongs: songObj}}, (erru, resu) => {
								if (erru == null) {
									res.status(200).send({
										message: "OK",
										data: {}
									});
								} else {
									res.status(500).send({
										message: "Failed to remove song from likes",
										data: {},
										error: erru
									});
								}
							});
					} else {
						User.findByIdAndUpdate(res_user._id,
							{$push: {likedSongs: songObj}}, (erru, resu) => {
								if (erru == null) {
									res.status(200).send({
										message: "OK",
										data: {}
									});
								} else {
									res.status(500).send({
										message: "Failed to add song to likes",
										data: {},
										error: erru
									});
								}
						});
					}
				}
			});
		} else {
			res.status(400).send({
					message: "This is not a valid request.",
					data: {}
			});
		}
	});

	return router;
}