const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/public')));

app.set('view engine', 'ejs');
app.use(express.static("public"));
console.log("ssss");

app.post("/",function(req,res){
console.log("sss");
alert("ss");
});

app.post("/api/Registration",function(req,res) {
    console.log("ee");
    // res.redirect("/ppp");
});

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/public/index.html'));
// });

app.get('/',function(req,res) {
    res.send({express2:"hello from the express"});
});

app.listen(5000, function() {
    console.log("Server started on port 3000");
  });