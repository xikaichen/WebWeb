var express = require("express"),
   app = express(),
   bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
   Campground = require("./models/campground"),
   Comment = require("./models/comment"),
   seedDB = require("./seeds");
   


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));//connect css file
seedDB();

//set Database schema


// Campground.create({
//       name: "caafss",
//       image: "https://www.annarborymca.org/wp-content/uploads/2015/06/Camps-AGQ.jpg",
//       description: "wowowowowow"
//    },
//    function(err, campground){
//       if(err){
//          console.log(err);
//       } else {
//          console.log("Newly Created");
//          console.log(campground);
//       }
//    }
// );

app.get("/", function(req, res) {
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
   //Get all campgrounds from Database
   Campground.find({}, function(err, allCampgrounds){
      if(err) {
         console.log(err);
      } else {
         res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new.ejs");
});

//has to be appear after "/campgrounds/new" otherwise it treat new as id too
app.get("/campgrounds/:id", function(req, res){
   //find the campground with id and render some other thing about specific id
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
         console.log(err);
      } else {
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });
   
});

//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res){
   //find campground by id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
      } else {
         res.render("comments/new", {campground: campground});
      }
   });
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground) {
       if(err){
          console.log(err);
          res.redirect("/campgrounds");
       } else {
          Comment.create(req.body.comment, function(err, comment){
             if(err){
                console.log(err);
             } else {
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/" + campground._id);
             }
          });
       }
   });
   // create new comment
   //connect new comment to campground
   //redirect campground showpage
   
   
})


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp server has started");
});