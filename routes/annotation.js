const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/all", controllers.annotation.index);
router.get(
  "/article/:articleid",
  controllers.annotation.showArticleAnnotations
);
router.get("/profile/:userid", controllers.annotation.showUserAnnotations);
router.post("/create", controllers.annotation.create);
router.post("/delete/:id", controllers.annotation.deleteAnnotation);

module.exports = router;
