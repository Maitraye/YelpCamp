var express = require("express");
var app = express();

app.set("view engine", "ejs");

var campgrounds = [
    {name:"Salmon Creek" , image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Campground.jpg"},
    {name:"Granite Hill" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGqaQIuOnLN4ezWn4OaEYZOJxIFSg2vV7WGjFGAzRjMbOFsIdJw"},
    {name:"Mountain Goat's Rest" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2z1lsEUAANdmeT_yi3euMpgH-dwTS8VNr5veav7j_AeC6Byd"}
];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started");
});