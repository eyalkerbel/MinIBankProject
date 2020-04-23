const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const uuid = require('uuid')
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
 
const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid'
} = process.env

const IN_PROD = NODE_ENV === 'production';
app.use(express.static(path.join(__dirname, 'client/public')));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(session({
    name: SESS_NAME,
    genid: (req) => {
        console.log('Inside the session middleware');
        console.log(req.session);
        return uuid.v4(); // use UUIDs for session IDs
      },
      cookie:  {maxAge: 1000* 60 * 60 * 2,
                sameSite:true,
                secure: IN_PROD,
                    },
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/officeDB", {useUnifiedTopology: true,useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
var personSchema = new mongoose.Schema({
    username: String,
    password: String
  });
var OfficeSchema = new mongoose.Schema({
    username:String,
    mangerPassword:String,
    officeName: String,
    officeEmployee: [personSchema]
  });
  
  OfficeSchema.plugin(passportLocalMongoose);
  personSchema.plugin(passportLocalMongoose);

  const Office = mongoose.model("Office",OfficeSchema);
const Person = mongoose.model("Person",personSchema);


passport.use('officeLocal', new LocalStrategy(Office.authenticate()));
passport.use('PersonLocal', new LocalStrategy(Person.authenticate()));


passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
  });

//   passport.use(new LocalStrategy(Person.authenticate()));

//   passport.serializeUser(Person.serializeUser());
//   passport.deserializeUser(Person.deserializeUser());
app.post("/addAcountToManager",function(req,res){
    const {officeEmployee} = req.session.currentUser;
    const person = new Person({
        username: req.body.username
    });
    Person.register(person, req.body.password ,function(err,found) {
     if(err) {
         console.log(err, "erorr");
     } else {
         req.session.currentUser.officeEmployee.push(found);
         console.log(req.session.currentUser.officeEmployee);
        req.session.save();
     }
    });
    
});

app.post("/Login", function(req,res){
const username = req.body.username;
const password = req.body.password; // TODO:meanwhile autontication only with username

Office.findOne({username:username},function(err,foundEmploy){
    if(err) {
        console.log(err);
    } else {
        if(foundEmploy) {
            const officeSession = new Office({
                username:username,
                password:password,
                officeName: foundEmploy.officeEmployee,
                officeEmployee: foundEmploy.officeEmployee
            });
            req.session.currentUser = officeSession;
        
            console.log("foundUser");
            res.send({answer:"manager"});
        } else {
            Person.findOne({username:username}, function(err,foundPerson) {
            if(err) {
                console.log(err);
            } else {
                if(foundPerson) {
                    const personSession = new Person({
                        username:username,
                        password:password
                    });
                    req.session.currentUser = personSession;
                    req.session.save();
                    console.log("person");
                    res.send({answer:"person"});
                } else {
                    console.log("none");
                    res.send({answer:"none"});
                }
            }
            });
        }
    }
});


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
    console.log(req.session);
   const {currentUser} = req.session;
    res.send({username:currentUser.username,OfficeName:currentUser.officeName,officeEmployee:currentUser.officeEmployee});
});

app.post("/api/Registration",function(req,res) {
 Office.deleteMany({},function(err){});
 Person.deleteMany({},function(err){});
 console.log(req.session);
    const officeF = new Office({
        username:req.body.userName,
        officeName: req.body.officeName,
        officeEmployee: [{}]
    });

    const officeSession = new Office({
        username:req.body.userName,
        password:req.body.password,
        officeName: req.body.officeName,
        officeEmployee: [{}]
    });


Office.register(officeF,req.body.password,function(err,found) {
    if(err) {
         console.log("not good");
        console.log(err);
        res.send({answer: "ooo"});
    } else {
    console.log("good");
        req.session.currentUser = officeSession;
        req.session.save();
        res.send({answer: "Succsessfully"});
        passport.authenticate('officeLocal',req,res,function() {
});
    }
        });
});
app.listen(5000, function() {
    console.log("Server started on port 3000");
  });