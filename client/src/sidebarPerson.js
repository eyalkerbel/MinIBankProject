import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import AddAcount from "./components/AddAcount";
import SignOut from "./components/SignOut";
import axios from "axios";
import {logoutAction} from "./Actions/UserActions";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    withRouter
  } from "react-router-dom";
 import {connect} from "react-redux";
 import AddItem from "./components/AddItem";

  class sidebarPerson extends React.Component {
    constructor(props) {
      super(props);
      
        console.log(props.uName,"created");
        console.log(props);
        this.logOutMy = this.logOutMy.bind(this);
    }

    
    logOutMy() {

this.props.LogOut();
this.props.LogOutDispatch();
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
      <Link to="/AddItem" className="menu-item" >
        AddItem
      </Link>
      <Link to="/" className="menu-item" onClick={this.logOutMy}>
        LogOut
      </Link>

      </Menu>

    <Switch>
    <Route exact path= "/AddItem" component={() => <AddItem {...this.props}  />} />
      <Route exact path= "/Manager/NewUser" component={() => <AddAcount {...this.props}  />} />
      </Switch>
    </Router>

  );


    }


}
const mapDispatchToProps = (dispatch) => ({
  LogOutDispatch:() => dispatch(logoutAction())
  }); 
    

export default connect(null,mapDispatchToProps)(sidebarPerson);


