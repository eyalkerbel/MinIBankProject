const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/officeDB", {useUnifiedTopology: true,useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
var personSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
    officeName: String
  });
  


  const Person = mongoose.model("Person",personSchema);
  module.exports = Person;

module.exports.PersonIsexists = async function PersonIsexists(username,password,isAdmin,officeName) {
  
  return new Promise(resolve => {
    Person.findOne({username:username},function(err,foundPerson){
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
     } );
});
}
  module.exports.createPerson = async function createPerson(username,password,isAdmin,officeName) {
        var checkIsExsits = await this.PersonIsexists(username,password,isAdmin,officeName);
    if(checkIsExsits == true) {
        return null;
    } else {
        const person = new Person({
        username:username,
        password:password,
        isAdmin:isAdmin,
        officeName:officeName
      });
      person.save();
      return person;
    }
}





