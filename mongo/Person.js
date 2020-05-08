const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/officeDB", {useUnifiedTopology: true,useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
var personSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
    officeID: String,
  });
  


  const Person = mongoose.model("Person",personSchema);
  module.exports = Person;

module.exports.PersonIsexists = async function PersonIsexists(username,password,isAdmin,officeId) {
  
  return new Promise(resolve => {
    Person.findOne({username:username},function(err,foundPerson){ //TODO check with password
    console.log(foundPerson);
    if(err) {
        console.log(err);
    } else {
        if(foundPerson) {
           resolve(foundPerson)
        } else {
           resolve(null);
        }
    }
     });
});
}

module.exports.returnOfficeById = async function returnOfficeById(office_id) {
    return new Promise(resolve => {
        Office.findOne({_id: office_id},function(err,foundUser){
         if(err) {
             console.log(err);
         } else {
             console.log("the office is ",nameOffice);
              resolve(foundUser);
         }
     }); 
 });
 }


  module.exports.createPerson = async function createPerson(username,password,isAdmin,officeId) {
      console.log("create-person")
    var checkIsExsits = await this.PersonIsexists(username,password,isAdmin,officeId);
    console.log(checkIsExsits);
    if(checkIsExsits != null) {
        return null;
    } else {
        const person = new Person({
        username:username,
        password:password,
        isAdmin:isAdmin,
        officeID:officeId
      });
      console.log(person);
      person.save();
      return person;
    }
}





