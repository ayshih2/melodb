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

async function getLikedSearchedSongs(userObj) {
	let likedSongNames = [];
	let searchedSongNames = [];
	let userJson = JSON.parse(JSON.stringify(userObj));
	userJson.likedSongs.forEach(s => {
		let songName = s.songId.replace(/\"/g, '');
		likedSongNames.push(songName);
	});
	userJson.history[0].songs.forEach(s => {
		let songName = s.songId.replace(/\"/g, '');
		if (!searchedSongNames.includes(songName) && !likedSongNames.includes(songName)) {
			searchedSongNames.push(songName);
		}
	});

	let likedSongs = await Song.find({'songTitle': {'$in': likedSongNames}}, (err, res) => {
		let songObjs = res;
		return songObjs.map(s => {
			JSON.parse(JSON.stringify(s));
		});
	});
	let searchedSongs = await Song.find({'songTitle': {'$in': searchedSongNames}}, (err, res) => {
		let songObjs = res;
		return songObjs.map(s => {
			JSON.parse(JSON.stringify(s));
		});
	});

	return {
		likedSongNames: likedSongs,
		searchedSongNames: searchedSongs
	};
}

async function getTop5RecommendedSongs(userObj) {
	// Collect the sentiments and genres that the user prefers from their likes and history
	let songsJsonArray = await getLikedSearchedSongs(userObj);
	if ((songsJsonArray.likedSongNames.length + songsJsonArray.searchedSongNames.length) == 0) {
		return [];
	}

	let genreCountMap = []; // Get the number of genres that the user liked/searched
	let sentiments = [];
	let excludedSongIds = [];

	// Liked songs (weight of 5, more than searched)
	songsJsonArray.likedSongNames.forEach(s => {
		if (genreCountMap.hasOwnProperty(s.genre)) {
			genreCountMap[s.genre] += 5;
		} else {
			genreCountMap[s.genre] = 5;
		}
		sentiments.push(s.sentiment);
		excludedSongIds.push(s._id);
	});
	//Searched songs
	songsJsonArray.searchedSongNames.forEach(s => {
		if (genreCountMap.hasOwnProperty(s.genre)) {
			genreCountMap[s.genre] += 1;
		} else {
			genreCountMap[s.genre] = 1;
		}
		sentiments.push(s.sentiment);
		excludedSongIds.push(s._id);
	});

	// Don't recommend songs that the user liked or searched up before
	let res = await Song.find({'_id': {'$nin': excludedSongIds}}).select('songTitle artist genre albumName albumImgUrl sentiment');
	let recommendedSongs = [];
	//Filter further by sentiment
	res.forEach(s => {
		let closestSentiment = sentiments.reduce(function(prev, curr) {
			return (Math.abs(curr - s.sentiment) < Math.abs(prev - s.sentiment) ? curr : prev);
		});
		let sentimentDiff = Math.abs(closestSentiment - s.sentiment);
		let genreRatio = genreCountMap.hasOwnProperty(s.genre) ? genreCountMap[s.genre]/(excludedSongIds.length) : 0;
		let recommendedScore = genreRatio + (100-sentimentDiff); //100 because sentiment ranges from 0 to 100
		if (!recommendedScore) {
			console.log(genreRatio, sentimentDiff);
		}
		recommendedSongs.push({
			recommendedScore: recommendedScore,
			song: s
		});
	})
	recommendedSongs.sort((a, b) => (a.recommendedScore > b.recommendedScore) ? -1 : 1);
	let minLen = Math.min(recommendedSongs.length, 5);
	return recommendedSongs.slice(0, minLen);
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
						getTop5RecommendedSongs(res_user).then(res_recommendedSongs => {
							res.status(200).send({
								message: "OK",
								data: {
									top5RecommendedSongs: res_recommendedSongs
								}
							});
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
						let history = res_user.history[0];
						let lenSongs = res_user.history[0].songs.length;
						let lenComps = res_user.history[0].comparisons.length;
						let songTitles = [];
						let compTitles = [];

						for (var i = 0; i < lenSongs; i++) {
							if (!songIn(songTitles, history.songs[i].songId)) {
								songTitles.push(history.songs[i].songId);
							}
						}

						for (var i = 0; i < lenComps; i++) {
							if (!songIn(compTitles, history.comparisons[i].songId1)) {
								compTitles.push(history.comparisons[i].songId1);
							}

							if (!songIn(compTitles, history.comparisons[i].songId2)) {
								compTitles.push(history.comparisons[i].songId2);
							}
						}

						Song.find({'songTitle': {$in : songTitles}}, (errs, res_songs) => {
							if (errs == null) {
								let retSongs = [];
								for (var hist = history.songs.length - 1; hist >= 0; hist--) {
									for (var song in res_songs) {
										if (history.songs[hist].songId === res_songs[song].songTitle) {
											let fullDate = history.songs[hist].searchDate.toDateString();

											let songObj = {
												songName : res_songs[song].songTitle,
												songArt : res_songs[song].albumImgUrl,
												artist : res_songs[song].artist,
												likedDate : fullDate
											};

											retSongs.push(songObj);
											break;
										}
									}

								}

								Song.find({'songTitle': {$in : compTitles}}, (errc, res_comps) => {
									if (errc == null) {
										let compSongs = [];
										for (var i = history.comparisons.length - 1; i >= 0; i--) {
											let numMatched = 0;
											let song1 = {};
											let song2 = {};
											let compObj = {
												song1: song1,
												song2: song2,
												compareDate: new Date()
											};

											for (var song in res_comps) {
												if (history.comparisons[i].songId1 === res_comps[song].songTitle) {
													song1 = {
														songName : history.comparisons[i].songId1,
														songArt : res_comps[song].albumImgUrl,
														artist : res_comps[song].artist,
													};
													numMatched += 1;
												} else if (history.comparisons[i].songId2 === res_comps[song].songTitle) {
													song2 = {
														songName : history.comparisons[i].songId2,
														songArt : res_comps[song].albumImgUrl,
														artist : res_comps[song].artist,
													};
													numMatched += 1;
												}

												if (numMatched == 2) {
													compObj = {
														song1: song1,
														song2: song2,
														compareDate: history.comparisons[i].compareDate.toDateString()
													}
													compSongs.push(compObj);
													break;
												}
											}
										}

										res.status(200).send({
											message: "OK",
											data: [retSongs, compSongs]
										});
									} else {
										res.status(500).send({
											message: "There was an error finding comparisons in history.",
											data: {},
											error: errc
										})
									}
								});	
							} else {
								res.status(500).send({
									message: "There was an error finding songs in history.",
									data: {},
									error: errs
								});
							}
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
						let orderedLikedSongs = [];
						let lenSongs = res_user.likedSongs.length;

						let songTitles = [];
						for (var i = 0; i < lenSongs; i++) {
							songTitles.push(res_user.likedSongs[i].songId);
						}

						Song.find({'songTitle': {$in : songTitles}}, (errs, res_songs) => {
							if (errs == null) {
								let retSongs = [];
								for (var liked in res_user.likedSongs) {
									for (var song in res_songs) {
										if (res_user.likedSongs[liked].songId === res_songs[song].songTitle) {
											let fullDate = res_user.likedSongs[liked].likedDate.toDateString();

											let songObj = {
												songName : res_songs[song].songTitle,
												songArt : res_songs[song].albumImgUrl,
												artist : res_songs[song].artist,
												likedDate : fullDate
											};

											retSongs.push(songObj);
											break;
										}
									}
								}	

								res.status(200).send({
									message: "OK",
									data: retSongs
								});
							} else {
								res.status(500).send({
									message: "There was an error finding songs.",
									data: {},
									error: errs
								})
							}
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
											message: "Failed to change picture",
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
							let songHistory = res_user.history.songs;
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
							let compHistory = res_user.history.compHistory;
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
					let liked = res_user.likedSongs;
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
			if (req.body.email) {
				User.find({"email": req.body.email}, (err, docs) => {
					if (docs.length != 0) {
						res.status(500).send({
							message: "User with this email already exists",
							data: {}
						});
					} else {
						let user = new User({
							name: req.body.name,
							email: req.body.email,
							pictureUrl: "",
							likedSongs: [],
							history: [{songs: [], comparisons: []}],
							recommended: []
						});
						user.save();
						res.status(201).send({
							message: "User created",
							data: user
						});
					}
				});
			} else {
				res.status(500).send({
					message: "Missing user email",
					data: {}
				});
			}
		}
	});

	return router;
}