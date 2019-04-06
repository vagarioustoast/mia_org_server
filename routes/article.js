const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/all", controllers.article.index);
router.get("/category/:category", controllers.article.showCategory);
router.get("/article/:id", controllers.article.showOneArticle);
router.post("/create", controllers.article.createArticle);
router.put("/update", controllers.article.updateArticle);

module.exports = router;
