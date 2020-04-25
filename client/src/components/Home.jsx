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
        response: '',
        uName: '',
        password: '',
        officeName: '',
        post: '',
        showLogin: false,
        IsLogin: false,
        tryToRegister: false,
        tryToLogin: false,
        successfullRegister:false,
        isManager: false,
      };
      this.handleRegistrationClick =this.handleRegistrationClick.bind(this);
    }


async isSuccessedToLogin(username,password) {
  let answerLogin= await API.handleRegistrationClick(username,password);
  console.log("anser", answerLogin);
if(answerLogin == "manager") {
  this.setState({tryToLogin:false,isManager:true});
  this.props.history.push("/Manager");
} else if(answerLogin == "person") {
  this.setState({tryToLogin:false,isManager:false});
  this.props.history.push("/Person");
} else {
  this.setState({tryToLogin:false});
  console.log("none");
}
}

 async isSuccessedToRegister(uName,password,officeName) {
 //  let answerIsGood = await API.handleRegistrationClick(this.state.uName,this.state.password,this.state.officeName);
   let answerIsGood = await API.handleRegistrationClick(uName,password,officeName);

    console.log(answerIsGood);
    if(answerIsGood) { 
      console.log(uName,"saas");
      this.setState({successfullRegister:true,tryToRegister:false,isManager:true,uName:uName,password:password,officeName:officeName}); // go to app.jsx with the data
      this.props.history.push({pathname:"/Manager"});
    }
    else {
      this.setState({tryToRegister:false})
      console.log("answer is not good");
    }
  }
       handleRegistrationClick(userName,password,officeName) {
  //    this.setState({tryToRegister:true,});
      // this.props.onlogIn(session,)
       this.isSuccessedToRegister(userName,password,officeName);      
      }
  handleLoginClick(username,password) {
  //this.setState({tryToLogin:true,uName:userName,password:password})
  console.log(username,password);
  this.isSuccessedToLogin(username,password);
    }


      render () {
        return (
            <Router>
            <div>
            <Link to="/"><div> <button type="radio" name="signIn">Sign In </button></div> </Link>
            <Link to="/Registration"><button type="radio" name="Register" >Registration</button></Link>
            </div>
            <Switch>
            {/* {this.state.successfullRegister && <Redirect to="/User" />} */}
                <Route exact path="/">
                <Login handleSubmit={this.handleLoginClick} history={this.props.history} />
                </Route>
                <Route path="/Registration">
                <Registration handleSubmit={this.handleRegistrationClick}/>
                </Route>
            </Switch>
            </Router>

    )};
    }

    export default withRouter(Home);




