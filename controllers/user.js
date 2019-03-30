const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
// Grabs "User" from Models
const User = db.User;

module.exports = {
  // Show All Users
  index: (req, res) => {
    User.find({}, (err, foundUsers) => {
      if (err) return console.error(err);

      res.json(foundUsers);
    });
  },
  // Show A Single User
  showOneUser: (req, res) => {
    User.find({ _id: req.params.id }, (err, foundUser) => {
      res.json(foundUser);
    });
  },
  //Sign Up
  signup: (req, res) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "This e-mail already exists."
          });
        } else {
          bcrypt.hash(req.body.password, 12, (err, hash) => {
            if (err) {
              console.log(`Hashing error: ${err}`);
              res.status(200).json({ Error: err });
            } else {
              User.create(
                {
                  displayName: req.body.displayName,
                  email: req.body.email,
                  password: hash,
                  description: req.body.description,
                  avatarUrl: req.body.avatarUrl,
                  isAdmin: false
                },
                (err, newUser) => {
                  let user = {
                    displayName: newUser.displayName,
                    email: newUser.email,
                    description: newUser.description,
                    avatarUrl: newUser.avatarUrl,
                    isAdmin: false,
                    _id: newUser._id
                  };
                  // JWT
                  jwt.sign(
                    user,
                    "dHVybnRoYXRuaWdnYWludG9iaW5hcnk=",
                    {
                      expiresIn: "1h"
                    },
                    (err, signedJWT) => {
                      res.status(200).json({
                        message: "User created",
                        user,
                        signedJWT
                      });
                    }
                  );
                }
              );
            }
          });
        }
      });
  }.catch(err => {
      console.error(err);
      res.status(500).json({err})
  })
};
