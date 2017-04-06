var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


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

router.post("/", function(req, res){
   //get data
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image:image, description:desc};
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

router.get("/new", function(req, res){
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

module.exports = router;