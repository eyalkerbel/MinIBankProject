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
            console.log("trues")
            return true;
        } else {
            return false;
        }

    });
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
           console.log("maange");
         return {answer:"found",userDeatils:res.data.userDetails};
       }
       else {
         return {answer:"none"};
       }
      });
      console.log("end-login");
}


