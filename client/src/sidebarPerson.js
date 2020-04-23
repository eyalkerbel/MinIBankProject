import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import AddAcount from "./components/AddAcount";
import SignOut from "./components/SignOut";
import axios from "axios";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    withRouter
  } from "react-router-dom";
 

  class sidebarPerson extends React.Component {
    constructor(props) {
      super(props);
      
        console.log(props.uName,"created");
        console.log(props);
        this.logOut = this.logOut.bind(this);
    }

    
    logOut() {

 axios.request({
        method: 'GET',
        url: "/logout",
      }).then(res => { 
       this.props.history.push({pathname:"/"});
      }).catch((err)=>    console.log("unsucessfull",err));    }
    showSettings (event) {
      event.preventDefault();
    }
    render() {
          return (  
    <Router>
     {console.log(this.props.uName)} 
    <Menu>
      <Link to="/Manager/ConfirmAction" className="menu-item" >
        ConfirmAction
      </Link>
      <Link to="/Logout" className="menu-item">
        LogOut
      </Link>

      </Menu>

    <Switch>
      <Route exact path= "/logout" render={() => this.logOut()} />
      </Switch>
    </Router>

  );


    }


}


export default sidebarPerson;


