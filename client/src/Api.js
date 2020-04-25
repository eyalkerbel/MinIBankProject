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
        if(res.data.answer == "Succsessfully") { 
            console.log("true")
            return true;
        } else {
            return false;
        }

    });
}


export async function handleLoginClick(username,password) {
    axios.request({
        method: "POST",
        url: "/Login",
        data: {
         username: username,
         password: password
       }
      }).then(res => {
          console.log("api :" .res.data.answer);
       if(res.data.answer == "manager") {
         return "manager";
       }
       if(res.data.answer == "person") {
         return "person";
       }
       else {
         return "none";
       }
      });
}


