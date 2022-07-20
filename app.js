express = require("express");
const articleRouter = require("./routes/article");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Articles = require("./models/articles");

app = express();

mongoose.connect(
	"mongodb://<username>:<password>@cluster0-shard-00-00.6hfpn.mongodb.net:27017,cluster0-shard-00-01.6hfpn.mongodb.net:27017,cluster0-shard-00-02.6hfpn.mongodb.net:27017/?ssl=true&replicaSet=atlas-qqmuiu-shard-0&authSource=admin&retryWrites=true&w=majority",
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);

let db = mongoose.connection;

db.once('open',function(){
  console.log('Connected');
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
	const articles = await Articles.find().sort({ createAt: "desc" });
	res.render("articles/index", {
		articles: articles,
	});
});


app.use("/articles", articleRouter);

app.listen( process.env.PORT || 80, () => console.log('app is running '));
