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
      })
      .catch(err => {
      console.error(err);
      res.status(500).json({err})
    })
  },
  // Login User
  login: (req, res)=>{
      console.log(req.body);
      User.find({ email: req.body.email })
      .select("+password")
      .exec()
      .then(users => {
          if (users.length < 1) {
              return res.status(401).json({
                  message: "E-mail or password is incorrect."
              })
          }
          console.log(users[0]);
          bcrypt.compare(req.body.password, users[0].password, (err, match)=>{
              console.log("Checking password.");
              if (err) {
                  console.error(err)
                  return status(500).json( {err} );
              }

              if (match) {
                  console.log("Matched");
                  let user = {
                      email: users[0].email,
                      _id: users[0]._id
                  };
                  jwt.sign(
                      user,
                      "dHVybnRoYXRuaWdnYWludG9iaW5hcnk=",
                      {
                          expiresIn: "3h"
                      },
                      (err, signedJWT) => {
                          res.status(200).json({
                              message: "Auth Successful",
                              user, 
                              signedJWT
                          })
                      }
                  )
              } else {
                  console.log("No match");
                  res.status(401).json({ message: "E-mail or password is incorrect"});
              }
          })
      })
      .catch(err=> {
          res.status(500).json({err});
      })
  },
  // Updates User
  update: (req, res)=>{
      let userId = req.body._id;
      User.findOneAndUpdate({
          { _id: userId },
          req.body,
          {new: true},
          (err, updatedUser)=>{
              if (err) return console.error(err);
              console.info(updatedUser);
              res.json(updatedUser);
          }
      })
  }
};

