import {types} from "./types";

export const loginAction = (username,password,isAdmin,officeID) =>  ({
  type: types.Login,
  username: username,
  password:password,
  isAdmin:isAdmin,
  officeID:officeID

});

export const logoutAction = () => ({
    type: types.LogOut
  });

