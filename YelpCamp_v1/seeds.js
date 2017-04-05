var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Cloud", 
        image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRU6ql5gH-0uzOtubXzSK0gE-pOf5SJG0ZnTBcRLnH3JSNVHE3W",
        description: "dsfsfssfs"
    },
    {
        name:"Cloud", 
        image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRU6ql5gH-0uzOtubXzSK0gE-pOf5SJG0ZnTBcRLnH3JSNVHE3W",
        description: "dsfsfssfs"
    },
    {
        name:"Cloud", 
        image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRU6ql5gH-0uzOtubXzSK0gE-pOf5SJG0ZnTBcRLnH3JSNVHE3W",
        description: "dsfsfdasfasffssfs"
    }
    ];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds");
        }
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campgrounds");
                    //create a comment
                    Comment.create({
                        text: "this is ",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("create new comment");
                        }
                    });
                }
            });
        });
    });
    
}

module.exports = seedDB;

