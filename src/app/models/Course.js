// const mongoose = require("mongoose");
// const slug = require("mongoose-slug-generator");
// const mongooseDelete = require("mongoose-delete");
// const Schema = mongoose.Schema;

// const Course = new Schema(
// 	{
// 		name: { type: String, maxLength: 255 },
// 		description: { type: String, maxLength: 600 },
// 		image: { type: String, maxLength: 255 },
// 		videoId: { type: String, maxLength: 255 },
// 		level: { type: String, maxLength: 255 },
// 		slug: { type: String, slug: "name", unique: true },
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// mongoose.plugin(slug);
// Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

// module.exports = mongoose.model("Course", Course);

const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const Course = new Schema(
	{
		name: { type: String, maxLength: 255 },
		description: { type: String, maxLength: 600 },
		image: { type: String, maxLength: 255 },
		videoId: { type: String, maxLength: 255 },
		level: { type: String, maxLength: 255 },
		slug: { type: String, unique: true }, // Bỏ slug: "name"
	},
	{
		timestamps: true,
	}
);

// Tạo slug trước khi lưu
Course.pre("save", function (next) {
	if (this.isModified("name")) {
		this.slug = slugify(this.name, {
			lower: true,
			strict: true,
		});
	}
	next();
});

// Thêm plugin xóa mềm
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", Course);
