const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const controllers = require("../controllers");

router.get("/all", controllers.user.index);
router.get("/profile/:id", controllers.user.showOne);
router.post("/signup", controllers.user.signup);
router.post("/login", controllers.user.login);
router.put("/update", controllers.user.update);

router.use((req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    let verified = jwt.verify(req.token, "dHVybnRoYXRuaWdnYWludG9iaW5hcnk=");
    console.log("Verified ", verifed);
    req.userId = verified._id;
    next();
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
