module.exports = function (app, router) {
	app.use('/api', require('./users.js')(router));
	app.use('/api', require('./compare.js')(router));
	app.use('/api', require('./songs.js')(router));
};
