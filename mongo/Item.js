const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/officeDB", {useUnifiedTopology: true,useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
var Person = require("./Person");
var ItemSchema = new mongoose.Schema(
    {
    officeID: String,
    personID: String,
    itemName: String,
    itemPrice: Number,
    aprrove: Boolean
  }
  );

  const Item = mongoose.model("Item",ItemSchema);
  module.exports = Item;


  module.exports.getAllItemByID = async function getAllItemByID(officeID) {
    return new Promise(resolve => {
     var items =[];
     Item.find({officeID:officeID}, async function(err,foundItems) {
          if(err) {
              console.log(err);
          } else {
              if(foundItems) {
                let items = await Promise.all(foundItems.map(async item => {
                   return {
                        itemID: item._id,
                        personName: await Person.getPersonNameByID(item.personID),
                        itemName: item.itemName,
                        itemPrice: item.itemPrice
                        }
                    }));
                     resolve(items);
              }  } }
      );
    });
  }


  module.exports.deleteItemByID = async function deleteItemByID(itemID) {
    Item.deleteOne({_id:itemID},function(err){});
    console.log("finish in item");
      
  }
  module.exports.createItem = async function createItem(officeId,personId,itemName,itemPrice) {
    var item = new Item({
        officeID: officeId,
        personID: personId,
        itemName: itemName,
        itemPrice: itemPrice,
        aprrove:false
        });
console.log(item,"finsih");
    return item;

  }