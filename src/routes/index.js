module.exports = function (app, router) {
	app.use('/api/hello', require('./users.js')(router));
};
