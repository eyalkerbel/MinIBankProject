import {types} from "./types";

export const loginAction = (personID,username,password,isAdmin,officeID) =>  ({
  type: types.Login,
  personID:personID,
  username: username,
  password:password,
  isAdmin:isAdmin,
  officeID:officeID
});

export const logoutAction = () => ({
    type: types.LogOut
  });

