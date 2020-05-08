import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Person from './components/Person';
import { BrowserRouter } from "react-router-dom";
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
import {connect} from "react-redux";
  import Manager from "./components/Manager";
import Login from './components/Login';

//todo state with username isadmin isloggedin
class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
    isLoggedIn:false,
      userName: "",
      isManager:false,
      // session:{
      // }
      };
  //this.onlogIn = this.onlogIn.bind(this);
  this.LogOut = this.LogOut.bind(this);
}
componentWillReceiveProps(nextProps) {
 console.log("componentWillReceiveProps",nextProps.user);
 if(nextProps.user.username != null) {
this.setState({isLoggedIn:true,isManager:nextProps.user.isAdmin});
 }
 console.log(nextProps.user.isAdmin);
 
}
LogOut() {
  this.setState({isLoggedIn:false});
}
render(){
  console.log(this.state.isLoggedIn);
  if(this.state.isLoggedIn){
    if(this.state.isManager) {
    return(  <Manager LogOut={this.LogOut} session={this.props.user} />); 
    } else {
     return( <Person LogOut={this.LogOut}  session={this.props.user} />); 
    }
  }

else{
  return (
    <div>
   <Home onLogIn={this.onlogIn} />
   
   </div>
  );
}
}
}
 const mapStateToProps = (state) => {
   console.log(state.user,"sas");
   return {
    user: state.user
   };
  
};

export default connect(mapStateToProps,null)(App);
// {this.props.user.username} {this.props.user.password} {this.props.user.isAdmin} {this.props.user.officeID}