import {types} from "./types";
import Person from "../components/Person";



export const SetListChargers = (chargers) => (
{
    type: types.SetChargers,
    chargers: chargers
}
)



export const ManagerForApproveAction = (officeID,personID,itemName,itemPrice) => (
    {
    type: types.ManagarApprove,
    officeID: officeID,
    personID: personID,
    itemName: itemName,
    itemPrice: itemPrice
});