import {types} from "../Actions/types";
import API from "../Api";

const INITIAL_STATE = {};
  

const user = (state = INITIAL_STATE, action) => {
    console.log(types.Login);
    switch (action.type) {
      case types.Login:
       return {
           personID: action.personID,
            username: action.username,
            password: action.password,
            isAdmin: action.isAdmin,
            officeID: action.officeID 
        };
        case types.LogOut:
         return INITIAL_STATE;
      default:
        return state
    }

  }
  
  export default user