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
module.exports.IsExsitsOffice = async function IsExsitsOffice(officeName) {
    console.log("IsExsitsOffice");
    return new Promise(resolve => {
         Office.findOne({officeName:officeName},function(err,foundOffice){
            if(err) {
                console.log(err);
            } else {
                if(foundOffice) {
                    console.log("we found office");
                    resolve(foundOffice);
                } else {
                    console.log("we dont find office, continue");
                    resolve(null);
                }
            }

    });
});

}


module.exports.returnOfficeNameByID = async function returnOfficeNameByID(office_id) {
return new Promise(resolve => {
       Office.findOne({_id: office_id},function(err,foundUser){
        if(err) {
            console.log(err);
        } else {
            var nameOffice = foundUser.officeName;
            console.log("name of the office",nameOffice);
             resolve(nameOffice);
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
              resolve(foundUser);
         }
     }); 
 });
 }


module.exports.updateOfficeManager = async function updateOfficeManager(office,person_id) {
 
    console.log("updateOfficeManager")
    Office.findOne({officeName: office.officeName})
  .then(user => {
    //user.AdminsID = [person_id];
    user.AdminsID.push(person_id); // TODO: check this if it is work
    user.markModified('AdminsID');
    user.save(err => console.log(err));
});
}
module.exports.addOfficeEmpolyee = async function addOfficeEmpolyee(office,person_id) {
    console.log("addOfficeEmpolyee");
    Office.findOne({officeName: office.officeName})
    .then(user => {
    user.officeEmployeeID.push(person_id);
    user.markModified('officeEmployeeID');
    user.save(err => console.log(err));
});
}

    module.exports.createOffice = async function createOffice(officeName) {
    var office = await this.IsExsitsOffice(officeName);
    console.log("office create wating");
    if(office == null) {
        office = new Office({
        officeName: officeName,
    });
    console.log(office);
    office.save();
    return office;

} else {
    return null;
}
}

module.exports.deleteAll = function deleteAll() {
    Office.deleteMany({},function(err){});
   Person.deleteMany({},function(err){});
}
module.exports.deleteOffice = async function deleteOffice(office) {
    Office.deleteMany({officeName:office.officeName},function(err){});
}
