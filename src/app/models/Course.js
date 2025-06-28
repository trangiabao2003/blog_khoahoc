const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
	{
		_id: { type: Number },
		name: { type: String, maxLength: 255 },
		description: { type: String, maxLength: 600 },
		image: { type: String, maxLength: 255 },
		videoId: { type: String, maxLength: 255 },
		level: { type: String, maxLength: 255 },
		slug: { type: String, unique: true }, // Bỏ slug: "name"
	},
	{
		_id: false,
		timestamps: true,
	}
);

// Tạo slug trước khi lưu
CourseSchema.pre("save", function (next) {
	if (this.isModified("name")) {
		this.slug = slugify(this.name, {
			lower: true,
			strict: true,
		});
	}
	next();
});

CourseSchema.query.sortable = function (req) {
	if ("_sort" in req.query) {
		const isValidType = ["asc", "desc"].includes(req.query.type);
		return this.sort({
			[req.query.column]: isValidType ? req.query.type : "desc",
		});
	}
	return this;
};

// Thêm plugin xóa mềm
CourseSchema.plugin(mongooseDelete, {
	overrideMethods: "all",
	deletedAt: true,
});

CourseSchema.plugin(AutoIncrement);

module.exports = mongoose.model("Course", CourseSchema);
