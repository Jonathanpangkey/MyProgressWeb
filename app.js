express = require("express");
const articleRouter = require("./routes/article");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Articles = require("./models/articles");
require('dotenv').config();

app = express();

async function connectToDB() {
	try {
	  await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	  });
	  console.log('Connected to MongoDB');
	} catch (err) {
	  console.error(err);
	}
  }
  
connectToDB();
  

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

app.listen(process.env.PORT || 80, () => console.log("app is running "));
