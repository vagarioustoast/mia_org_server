const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/all", controllers.annotation.index);
router.get("/article/:id", controllers.annotation.showArticleAnnotations);
router.get("/profile/:userid", controllers.annotation.showUserAnnotations);
router.post("/create", controllers.annotation.create);

module.exports = router;
