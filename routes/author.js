const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/all", controllers.author.index);
router.post("/create", controllers.author.createAuthor);

module.exports = router;
