const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
 const uuid = require('uuid')
// const LocalStrategy = require('passport-local').Strategy;
 const Office = require("./mongo/Office");
 const Person = require("./mongo/Person");
 const Item = require("./mongo/Item");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
 

app.use(express.static(path.join(__dirname, 'client/public')));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(session({
    name: "SESS_NAME",
    genid: (req) => {
        console.log('Inside the session middleware');
        console.log(req.session);
        return uuid.v4(); // use UUIDs for session IDs
      },
      cookie:  {maxAge: 1000* 60 * 60 * 2,
                sameSite:true,
                    },
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
  }));




app.post("/Registration",function(req,res) {
    createUser();
    async function createUser(){
        console.log("api/registraion");
    var username = req.body.userName;
    var password = req.body.password;
    var officeName = req.body.officeName;
   //  Office.deleteAll();
   var office = await Office.createOffice(officeName); // create Office and check that there is not data like the office's data 
    if(office != null) {
     var person = await Person.createPerson(username,password,true,office._id); // create person and check that there is not data like the person's data 
        if(person != null) {
     await Office.updateOfficeManager(office,person._id);
    req.session.currentPerson = person;
    console.log(req.session);
     res.send({answer: "Succsessfully",officeID:office._id});
            }
        else {
         await Office.deleteOffice(office);
         res.send({answer: "ooo"}); // TODO: expand the option for validtion,office seperate aand person seperate
        }
    }
    if(office == null) {
        res.send({answer: "ooo"});  // TODO: expand the option for validtion,office seperate aand person seperate
    }
}
});




app.post("/addAcountToManager",function(req,res){
    console.log(req.session.currentPerson);
    AddAccount();
    async function AddAccount() {    
     const {currentPerson} = req.session;
     console.log(currentPerson);
     var username = req.body.username;
     var password = req.body.password;
     console.log(currentPerson.officeID);
     var office = await Office.returnOfficeById(currentPerson.officeID);
     var newPerson = await Person.createPerson(username,password,false,office._id);
    if(newPerson != null) {
      await Office.addOfficeEmpolyee(office,newPerson._id);
        console.log("succseed");
    } else {
        console.log("faild");
    }
}
});


app.post("/Login", async function(req,res){
    console.log("expreess login");
    const username = req.body.username;
    const password = req.body.password; // TODO:meanwhile autontication only with username
    // const details = await ReturnAnswer(username,password);
    // if (details === null){
    //     res.send({answer:"none"});
    // }
    // else{
    //     res.send({answer:"found",userDetails:details});
    // }



 //   async function ReturnAnswer(username,password) {
    var person = await CheckIfUserExists(username,password);
    console.log("returning asnwer",person);
    if(person == null) {
        // return null;
        // console.log("nulsaas");
         res.send({answer:"none"});
    } else {
        req.session.currentPerson = person;
        if(person.isAdmin == true) {
            console.log("here");
            var list = await Item.getAllItemByID(person.officeID);
            console.log("list:",list);
            req.session.chargers = list;
            console.log(req.session);
        }
        var nameOffice = await Office.returnOfficeNameByID(person.officeID);
        var Details = {
            personID: person._id,
            isAdmin: person.isAdmin,
            officeID: person.officeID,
            officeName: nameOffice
        };
     //   return Details;
        // console.log(Details);
         res.send({answer:"found",userDetails:Details});
    }
 // }

    async function CheckIfUserExists(username,password) {
    console.log(username,password);
    var person = await Person.PersonIsexists(username,password,true,"");
    console.log("waiting checkifuser",person);
    return person;
    }
});

app.get("/GetChargers",function(req,res) {
res.send({chargers:req.session.chargers});
});

app.post("/approveItem",async function(req,res) {
    itemID = req.body.itemID;
    await Item.deleteItemByID(itemID);
    console.log("finish in index delete item");
    console.log(req.session.currentPerson);
    var list = await Item.getAllItemByID(req.session.currentPerson.officeID);
    req.session.chargers = list;
    res.send({chargers:list});
});


app.post("/AddingItemToOffice",function (req,res) {
   itemName = req.body.itemName;
   itemPrice = req.body.itemPrice;
   console.log("AddingItemToOffice",itemName,itemPrice);
    createItem(itemName,itemPrice);
   console.log("finssh creating item")
   async function createItem(itemName,itemPrice) {
       var item = await Item.createItem(req.session.currentPerson.officeID,req.session.currentPerson._id,itemName,itemPrice);
       item.save();
 //var person = await Person.PersonIsexists(username,password,true,"");
    console.log("finsihcreatingItemfunction",item);
    res.send({answer:"succsessfull"});

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

app.listen(5000, function() {
    console.log("Server started on port 3000");
  });

//   app.get("/hi",function (req,res) {
//     res.send({answer:"f"});
//     console.log("hi");
//   });
//   app.post("/hi",function (req,res) {
//     res.send({answer:"f"});
//     console.log("hi");
//   })