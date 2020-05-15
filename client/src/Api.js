import axios from "axios";


 export async function handleRegistrationClick(userName,password,officeName) {
    console.log("sss");
  return axios.request({
        method: 'POST',
        url: "/Registration",
        data: {
            userName: userName,
            password: password,
            officeName: officeName
        }
    }).then(res => {
        if(res.data.answer == "Succsessfully") { // TODO: expand the option for validtion,office seperate aand person seperate
            console.log("trues");
            return {answer:true,officeID:res.data.officeID};
        } else {
            return  {answer:false};
        }

    });
}



export async function AddItemToffice(itemName,itemPrice) {
    console.log("AddItemToffice",itemPrice);
    return axios.request({
        method: "POST",
        url: "/AddingItemToOffice",
        data: {
            itemName: itemName,
            itemPrice: itemPrice
        }
    }).then(res => res.data.answer);
}
export async function getChargers() {  
    return axios.request({
        method: "GET",
        url: "/GetChargers",
       
    }).then(res => res.data.chargers);  
}

export async function approveItem(itemId) {
    return axios.request({
        method: "POST",
        url: "/ApproveItem",
        data: {
            itemID: itemId,
        }
    }).then(res => res.data.chargers);
}


export async function handleLoginClick(username,password) {
    console.log("Login");
    return axios.request({
        method: "POST",
        url: "/Login",
        data: {
         username: username,
         password: password
       }
      }).then(res => {
          console.log("api :", res.data.answer);
       if(res.data.answer == "found") {
           console.log("maange",res.data.userDetails);
         return {answer:"found",userDeatils:res.data.userDetails};
       }
       else {
         return {answer:"none"};
       }
      });
      console.log("end-login");
}


