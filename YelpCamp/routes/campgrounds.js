var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

//INDEX show all campgrounds
router.get("/", function(req, res){
   //Get all campgrounds from Database
   Campground.find({}, function(err, allCampgrounds){
      if(err) {
         console.log(err);
      } else {
         res.render("campgrounds/index", {campgrounds: allCampgrounds});
      }
   });
});

router.post("/", middleware.isLoggedIn, function(req, res){
   //get data
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
   };
   var newCampground = {name: name, image:image, description:desc, author: author};
   //campgrounds.push(newCampground);
   //insert to Database
   Campground.create(newCampground, function(err, newlyCreated){
      if(err) {
         console.log(err);
      } else {
         //redirect
         res.redirect("/campgrounds");
      }
   });
   
});

router.get("/new", middleware.isLoggedIn,function(req, res){
    res.render("campgrounds/new");
});

//has to be appear after "/campgrounds/new" otherwise it treat new as id too
router.get("/:id", function(req, res){
   //find the campground with id and render some other thing about specific id
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
         console.log(err);
      } else {
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });
   
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
   });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update 
   //redirect
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
         res.redirect("/campgrounds");
      } else {
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

//DELETE CAMPGROUND ROUTES
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
         res.redirect("/campgrounds");
      } else {
         res.redirect("/campgrounds");
      }
   });
});







module.exports = router;