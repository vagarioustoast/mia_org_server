const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");
const articleRoutes = require("./routes/article");
const annotationRoutes = require("./routes/annotation");

// App
const app = express();

// Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use("/users", userRoutes);
app.use("/authors", authorRoutes);
app.use("/articles", articleRoutes);
app.use("/annotations", annotationRoutes);

app.get("/", (req, res) => {
  res.json("Working");
});

app.listen(process.env.PORT || 3001, () =>
  console.log("Server is now running.")
);
