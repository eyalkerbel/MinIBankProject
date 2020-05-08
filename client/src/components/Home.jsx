import React, { useEffect } from "react";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useHistory,
//     useLocation,
//     withRouter
//   } from "react-router-dom";
  import * as API from "../Api";
  import Registration from "./Registration";
  import Login from "./Login";
import session from "express-session";
import { connect } from "react-redux";
import types from "../Actions/types";
import { loginAction } from "../Actions/UserActions";
class Home extends React.Component {
    constructor(props) {
      super(props);
    this.state = {
        uName: '',
        password: '',
        officeName: '',
        successfullRegister:false,
        isManager: false,
        LoginDisplay: true
      };
      this.handleRegistrationClick =this.handleRegistrationClick.bind(this);
      this.handleLoginClick =this.handleLoginClick.bind(this);
      this.Register = this.Register.bind(this);
      this.Login = this.Login.bind(this);
    }


async isSuccessedToLogin(username,password) {
  let answerLogin = await API.handleLoginClick(username,password);
  console.log("anser", answerLogin);
  if(answerLogin.answer == "found") {
    this.setState({tryToLogin:false,isManager:answerLogin.userDeatils.isAdmin,session:answerLogin.userDeatils});
    this.props.loginDispatch(username,password,this.state.isManager,answerLogin.userDeatils.officeID);

    //this.props.onLogIn({officeName:answerLogin.userDeatils.officeName,OfficeID:answerLogin.userDeatils.officeID},this.state.isManager,username);
  } else {
  this.setState({tryToLogin:false});
  console.log("noneofthose");
} }


 async isSuccessedToRegister(username,password,officeName) {
   let answerIsGood = await API.handleRegistrationClick(username,password,officeName);
    if(answerIsGood.answer == true) { 
      this.setState({successfullRegister:true,tryToRegister:false,isManager:true,username:username,password:password,officeName:officeName}); // go to app.jsx with the data
    //  this.props.onLogIn({username:uName,officeName:officeName},this.state.isManager,uName);
    this.props.loginDispatch(username,password,this.state.isManager,answerIsGood.officeID);
    }
    else {
      this.setState({tryToRegister:false})
    }
  }
       handleRegistrationClick(userName,password,officeName) {
  //    this.setState({tryToRegister:true,});
      // this.props.onlogIn(session,)
       this.isSuccessedToRegister(userName,password,officeName);      
      }
  handleLoginClick(username,password) {
    // Dispatch 
    this.isSuccessedToLogin(username,password);
    }
    Login() {
      this.setState({LoginDisplay:true});
    }
    Register() {
      this.setState({LoginDisplay:false});
    }
      render () {
        return(
        <div>
         <button type="radio" name="signIn" onClick={this.Login}>Sign In </button>
         <button type="radio" name="Register" onClick={this.Register} >Registration</button>
         {this.state.LoginDisplay? <Login handleSubmit={this.handleLoginClick}  /> :   <Registration handleSubmit={this.handleRegistrationClick}/>}
        </div>);
  };


  


    }
    const mapDispatchToProps = (dispatch) => ({  
      loginDispatch: (username, password,isAdmin,officeID) => dispatch(loginAction(username,password,isAdmin,officeID))
    });
    

    //export default Home;
    export default connect(null, mapDispatchToProps)(Home);




