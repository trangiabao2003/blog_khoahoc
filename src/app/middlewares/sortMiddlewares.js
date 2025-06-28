module.exports = function sortMiddleware(req, res, next) {
	res.locals._sort = {
		enable: false,
		type: "default",
	};
	if ("_sort" in req.query) {
		Object.assign(res.locals._sort, {
			enable: true,
			type: req.query.type,
			column: req.query.column,
		});
	}
	next();
};
