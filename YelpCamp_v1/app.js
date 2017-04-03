var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//set Database schema
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
      name: "caafss",
      image: "https://www.annarborymca.org/wp-content/uploads/2015/06/Camps-AGQ.jpg",
      description: "wowowowowow"
   },
   function(err, campground){
      if(err){
         console.log(err);
      } else {
         console.log("Newly Created");
         console.log(campground);
      }
   }
);

app.get("/", function(req, res) {
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
   //Get all campgrounds from Database
   Campground.find({}, function(err, allCampgrounds){
      if(err) {
         console.log(err);
      } else {
         res.render("index", {campgrounds: allCampgrounds});
      }
   });
   //res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//has to be appear after "/campgrounds/new" otherwise it treat new as id too
app.get("/campgrounds/:id", function(req, res){
   //find the campground with id and render some other thing about specific id
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
         console.log(err);
      } else {
         res.render("show", {campground: foundCampground});
      }
   });
   
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp server has started");
});