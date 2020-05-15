import {types} from "../Actions/types";



const chargers = (state = [{}], action) => {
    switch(action.type) {
        case types.ManagarApprove:
            return [...state,
              {
                officeID:action.officeID,
                personID:action.personID,
                itemName:action.itemName,
                itemPrice:action.itemPrice
              } ];
        case types.SetChargers:
            return action.chargers
        default:
            return state;
            
    }
}
export default chargers;