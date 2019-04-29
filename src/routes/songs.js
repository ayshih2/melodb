var models = require('../database');
var Song = models.songModel;

module.exports = function(router) {
	var songRoute = router.route('/song');
	

	songRoute.get((req,res) => {
		console.log('Song');
		if(Object.keys(req.query).length != 1){
			res.status(400).send({
				message: "Invalid request",
				data: {}
			});
		} else {
			Song.findOne({songTitle: req.query.name}, (err, res_song) => {
				if(!res_song){
					res.status(404).send({
						message: "Song not found",
						data: {}
					});
				} else if(err) {
					res.status(500).send({
	                    message: "Server error",
						data: {},
						error: err
	                });
				} else {
					res.status(200).send({
						message: "OK",
						data: res_song
					});
				}
			});
		}
	});


	return router;
}




