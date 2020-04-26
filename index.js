const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
// const uuid = require('uuid')
// const LocalStrategy = require('passport-local').Strategy;
 const Office = require("./mongo/Office");
 const Person = require("./mongo/Person");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
 

app.use(express.static(path.join(__dirname, 'client/public')));

app.set('view engine', 'ejs');
app.use(express.static("public"));





app.post("/Registration",function(req,res) {
    createUser();
    async function createUser(){
        console.log("api/registraion");
    var username = req.body.userName;
    var password = req.body.password;
    var officeName = req.body.officeName;
   //  Office.deleteAll();
  var office = await Office.createOffice(username,password,officeName);

    if(office != null) {
       console.log("Succsessfully");
       res.send({answer: "Succsessfully"});
    } else {
       console.log("ooo");
       res.send({answer: "ooo"});
    }
}
});




app.post("/addAcountToManager",function(req,res){
    // const {officeEmployee} = req.session.currentUser;
    // const person = new Person({
    //     username: req.body.username
    // });
    // Person.register(person, req.body.password ,function(err,found) {
    //  if(err) {
    //      console.log(err, "erorr");
    //  } else {
    //      req.session.currentUser.officeEmployee.push(found);
    //      console.log(req.session.currentUser.officeEmployee);
    //     req.session.save();
    //  }
    // });
});






app.post("/Login", function(req,res){
    console.log("expreess login");
    const username = req.body.username;
    const password = req.body.password; // TODO:meanwhile autontication only with username
    ReturnAnswer(username,password);


    async function ReturnAnswer(username,password) {
    var person = await CheckIfUserExists(username,password);
    console.log("returning asnwer",person);
    if(person == null) {
        console.log("nulsaas");
        res.send({answer:"none"});
    } else {
        var Details = {
            isAdmin: person.isAdmin,
            officeName: person.officeName
        };
        res.send({answer:"found",userDetails:Details});

    }}
    

    async function CheckIfUserExists(username,password) {
    console.log(username,password);
    var person = await Person.PersonIsexists(username,password,true,"");
    console.log("waiting checkifuser",person);
    return person;
    }
});


app.get("/GetPerson", function(req,res) {
    console.log("req.session");
console.log(req.session);


});

app.get("/logout", function(req,res) {
    req.logout();
    console.log("logoutserver");
    res.send({succsessful:"true"});
})
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
  }
app.post("/GetManagarData",function(req,res){
//     console.log(req.session);
//    const {currentUser} = req.session;
//     res.send({username:currentUser.username,OfficeName:currentUser.officeName,officeEmployee:currentUser.officeEmployee});
});




app.listen(5000, function() {
    console.log("Server started on port 3000");
  });

  app.get("/hi",function (req,res) {
    res.send({answer:"f"});
    console.log("hi");
  });
  app.post("/hi",function (req,res) {
    res.send({answer:"f"});
    console.log("hi");
  })