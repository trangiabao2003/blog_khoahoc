const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

const SortMiddleware = require("./app/middlewares/sortMiddlewares");

db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

app.use(methodOverride("_method"));

app.use(SortMiddleware);

//HTTP logger
// app.use(morgan("combined"));

//Template engine
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		helpers: require("./app/helpers/handlebars"),
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
