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

  import Manager from "./components/Manager";
import Login from './components/Login';
//todo state with username isadmin isloggedin
class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
    isLoggedIn:false,
     isAdmin: false,
      userName: "",
       session:{
       }};
  this.onlogIn = this.onlogIn.bind(this);
  this.LogOut = this.LogOut.bind(this);
}
onlogIn(session, isAdmin, userName) {
  console.log("Component App");
  this.setState({isLoggedIn:true, isAdmin: isAdmin, userName: userName, session: session});
  console.log(session,isAdmin,userName);
}
LogOut() {
  this.setState({isLoggedIn:false});
}
render(){
  if(this.state.isLoggedIn){
    if(this.state.isAdmin) {
    return(  <Manager LogOut={this.LogOut} session={this.state.session} />);
    } else {
     return( <Person LogOut={this.LogOut} />);
    }
  }

else{
  return (
   <Home onLogIn={this.onlogIn} />
  );
}
}
}


// function App() {
//   return (
//     <Router>
//     <div className="App">
//       <header className="App-header">
//       <Switch>
//       <Route exact path ="/" component={Home }  />
//       <Route exact path ="/Manager" component={Manager}  />
//       <Route exact path="/Person" component={Person} />
//       </Switch>
//       </header>
//     </div>
//     </Router>
//   );
// }

export default withRouter(App);
