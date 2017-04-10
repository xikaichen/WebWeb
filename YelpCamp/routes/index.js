var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res) {
   res.render("landing");
});

//=========================
//AUTH ROUTES
//=========================

//SHOW REGISTER FORM
router.get("/register", function(req, res){
   res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
          req.flash("error", err.message);
          return res.redirect("/register");
       } else {
          passport.authenticate("local")(req, res, function(){
              req.flash("succes", "Welcome to YelpCamp" + user.username);
             res.redirect("/campgrounds");
          });
       }
    });
});

//login routes
//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local", 
   {
      successRedirect: "/campgrounds", 
      failureRedirect: "/login"
   }), function(req, res) {
   //no need to do anything
});

//logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});



module.exports = router;