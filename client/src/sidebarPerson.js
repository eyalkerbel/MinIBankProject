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
        this.logOutMy = this.logOutMy.bind(this);
    }

    
    logOutMy() {
//  axios.request({
//         method: 'GET',
//         url: "/logout",
//       }).then(res => { 
//        this.props.history.push({pathname:"/"});
//       }).catch((err)=>    console.log("unsucessfull",err)); 
this.props.LogOut();
}
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
      <Link to="/" className="menu-item" onClick={this.logOutMy}>
        LogOut
      </Link>

      </Menu>

    <Switch>
      <Route exact path= "/Manager/NewUser" component={() => <AddAcount {...this.props}  />} />
      </Switch>
    </Router>

  );


    }


}


export default sidebarPerson;


