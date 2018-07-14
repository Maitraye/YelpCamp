var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true }); //27017 is MongoDB's default port on which mongod is running.
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground",campgroundSchema);
    
// var campgrounds = [
//     {name:"Salmon Creek" , image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Campground.jpg"},
//     {name:"Granite Hill" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGqaQIuOnLN4ezWn4OaEYZOJxIFSg2vV7WGjFGAzRjMbOFsIdJw"},
//     {name:"Mountain Goat's Rest" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2z1lsEUAANdmeT_yi3euMpgH-dwTS8VNr5veav7j_AeC6Byd"},
//     {name:"Salmon Creek" , image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Campground.jpg"},
//     {name:"Granite Hill" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGqaQIuOnLN4ezWn4OaEYZOJxIFSg2vV7WGjFGAzRjMbOFsIdJw"},
//     {name:"Mountain Goat's Rest" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2z1lsEUAANdmeT_yi3euMpgH-dwTS8VNr5veav7j_AeC6Byd"},
//     {name:"Salmon Creek" , image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Campground.jpg"},
//     {name:"Granite Hill" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGqaQIuOnLN4ezWn4OaEYZOJxIFSg2vV7WGjFGAzRjMbOFsIdJw"},
//     {name:"Mountain Goat's Rest" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2z1lsEUAANdmeT_yi3euMpgH-dwTS8VNr5veav7j_AeC6Byd"}
// ];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, function(err, campground){
        if (err) {
            console.log(err);
        } 
        else {
            //redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started");
});