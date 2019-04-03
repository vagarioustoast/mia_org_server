const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/all", controllers.article.index);
router.get("/articles/:id", controllers.article.showOneArticle);
router.post("/create", controllers.article.createArticle);
router.put("/update", controllers.article.updateArticle);

module.exports = router;
