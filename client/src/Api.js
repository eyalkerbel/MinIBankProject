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
    console.log("login");
    return axios.request({
        method: "POST",
        url: "/Login",
        data: {
         username: username,
         password: password
       }
      }).then(res => {
          console.log("api :", res.data.answer);
       if(res.data.answer == "manager") {
           console.log("maange");
         return {answer:"manager",userDeatils:res.data.userDetails};
       } else if(res.data.answer == "person") {
         return {answer:"person",userDeatils:res.data.userDetails};
       }
       else {
         return {answer:"none"};
       }
      });
      console.log("end-login");
}


