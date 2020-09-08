const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Groceries", "Cook Food", "Eat Food"];
const workList = [];

app.get("/", function(req, res){ 
    const day = date.getDay();
    res.render("list", {
        title: day,
        newListItems: items
    });
})

app.post("/", function(req, res){
    const item = req.body.newItem;
    console.log(req.body.list);
    if(req.body.list === "work"){
        workList.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

    
})

app.get("/work", function(req, res){
    res.render("list", {
        title : "work",
        newListItems : workList
    })
})

app.post("/work", function(req, res){
    const item = req.body.newItem;
    workList.push(item);
    res.redirect("/work");
})

app.get("/about", function(req,res){
    res.render("about");
})



app.listen(3000, function(err){
    if(err) throw err;
    console.log("server started at port 3000");
})