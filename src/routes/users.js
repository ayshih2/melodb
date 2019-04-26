var models = require('../database');

module.exports = function(router) {
	var userRoute = router.route('/hello');
	var tempWorldRoute = router.route('/world');

	userRoute.get((req, res) => {
		res.status(200).send({ express: 'Hello From Express' });
	});
	tempWorldRoute.post((req, res) => {
		console.log(req.body);
		res.status(201).send(
			`I received your POST request. This is what you sent me: ${req.body.post}`,
		);
	});

	return router
}


