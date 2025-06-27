class NewsController {
	index(req, res) {
		res.render("news");
	}

	show(req, res) {
		res.send("News detail page");
	}
}

module.exports = new NewsController();
