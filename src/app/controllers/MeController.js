const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
	storedCourses(req, res, next) {
		let courseQuery = Course.find({});

		if ("_sort" in req.query) {
			courseQuery = courseQuery.sort({
				[req.query.column]: req.query.type,
			});
		}

		Promise.all([
			courseQuery,
			Course.countDocumentsWithDeleted({ deleted: true }),
		])
			.then(([courses, deletedCount]) =>
				res.render("me/stored-courses", {
					deletedCount,
					courses: mutipleMongooseToObject(courses),
				})
			)
			.catch(next);
	}

	trashCourses(req, res, next) {
		Course.findWithDeleted({ deleted: true })
			.then((courses) =>
				res.render("me/trash-courses", {
					courses: mutipleMongooseToObject(courses),
				})
			)
			.catch(next);
	}
}

module.exports = new MeController();
