const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/officeDB", {useUnifiedTopology: true,useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
var Person = require("./Person");

var OfficeSchema = new mongoose.Schema({
    officeName: String,
    AdminsID: [String],
    officeEmployeeID: [String]
  });

  const Office = mongoose.model("Office",OfficeSchema);
  module.exports = Office;
module.exports.createOffice = async function createOffice(officeName) {
var person = await Person.createPerson(username,password,true,officeName);
if(person == null) {
    return null;
} else {
 office = new Office({
    officeName: officeName,
     AdminsID: [person._id],
});

console.log(office);
office.save();
return office;
}
}

module.exports.deleteAll = function deleteAll() {
    Office.deleteMany({},function(err){});
   Person.deleteMany({},function(err){});
}

