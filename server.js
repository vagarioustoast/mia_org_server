const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.json("Working");
});

app.listen(process.env.PORT || 3001, () =>
  console.log("Server is now running.")
);
