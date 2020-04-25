import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    withRouter
  } from "react-router-dom";
  import * as API from "../Api";
  import Registration from "./Registration";
  import Login from "./Login";
import session from "express-session";
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
  if(answerLogin.answer == "manager") {
  this.setState({tryToLogin:false,isManager:true});
  this.props.onLogIn({},this.state.isManager,username);
  //this.props.history.push("/Manager");
} else if(answerLogin.answer == "person") {
  this.setState({tryToLogin:false,isManager:false});
  this.props.onLogIn({},this.state.isManager,username);
  //this.props.history.push("/Person");
} else {
  this.setState({tryToLogin:false});
  console.log("noneofthose");
} }


 async isSuccessedToRegister(uName,password,officeName) {
   let answerIsGood = await API.handleRegistrationClick(uName,password,officeName);
    if(answerIsGood) { 
      this.setState({successfullRegister:true,tryToRegister:false,isManager:true,uName:uName,password:password,officeName:officeName}); // go to app.jsx with the data
      this.props.onLogIn({},this.state.isManager,uName);
      //  this.props.history.push({pathname:"/Manager"});
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
        

    //     return (
    //         <Router>
    //         <div>
    //         <Link to="/"><div> <button type="radio" name="signIn">Sign In </button></div> </Link>
    //         <Link to="/Registration"><button type="radio" name="Register" >Registration</button></Link>
    //         </div>
    //         <Switch>
    //         {/* {this.state.successfullRegister && <Redirect to="/User" />} */}
    //             <Route exact path="/">
    //             <Login handleSubmit={this.handleLoginClick}  />
    //             </Route>
    //             <Route path="/Registration">
    //             <Registration handleSubmit={this.handleRegistrationClick}/>
    //             </Route>
    //         </Switch>
    //         </Router>

    // )
  };
    }

    export default Home;




