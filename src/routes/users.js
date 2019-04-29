var models = require('../database');
var Song = models.songModel;
var User = models.userModel;

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

	userRoute.put((req, res) => {
		if (req.query.type == "modify") {
			//change name & picture
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
						if(req.query.name !== '' && req.query.name !== undefined && req.query.pictureUrl !== '' && req.query.pictureUrl !== undefined){
							res_user.name = req.query.name;
							res_user.pictureUrl = req.query.pictureUrl;
							res_user.save((errsave, ressave)=> {
								if (errsave == null) {
										res.status(200).send({
											message: "Name and Picture OK",
											data: {}
										});
									} else {
										res.status(500).send({
											message: "Failed to change name and email",
											data: {},
											error: errsave
										});
									}
								});
						}
						else if(req.query.name !== '' && req.query.name !== undefined && req.query.pictureUrl !== ''){
							res_user.name = req.query.name;
							res_user.save((errsave, ressave)=> {
								if (errsave == null) {
										res.status(200).send({
											message: "Name OK",
											data: {}
										});
									} else {
										res.status(500).send({
											message: "Failed to change name",
											data: {},
											error: errsave
										});
									}
								});
						}
						else if(req.query.pictureUrl !== '' && req.query.pictureUrl !== undefined && req.query.name !== ''){
							res_user.pictureUrl = req.query.pictureUrl;
							res_user.save((errsave, ressave)=> {
								if (errsave == null) {
										res.status(200).send({
											message: "Picture OK",
											data: {}
										});
									} else {
										res.status(500).send({
											message: "Failed to change email",
											data: {},
											error: errsave
										});
									}
								});
						}
						else {
										res.status(400).send({
											name: req.query.name,
											isURLUndef: req.query.pictureUrl == undefined,
											isURLEmpty: req.query.pictureUrl == '',
											isNameUndef: req.query.name == undefined,
											isNameEmpty: req.query.name == '',
											message: "Invalid query check for empty parameters",
											data: {},
										});
							}
					}
				});
		}
		 else if (Object.keys(req.query).length == 3) {
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