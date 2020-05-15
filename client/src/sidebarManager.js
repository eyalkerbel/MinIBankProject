import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import AddAcount from "./components/AddAcount";
import axios from "axios";
import { connect } from "react-redux";
import {logoutAction} from "./Actions/UserActions";
import AddItem from "./components/AddItem";
import ConformationItem from "./components/ConfermationItem";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    withRouter
  } from "react-router-dom";
import { stat } from 'fs';
 

  class sidebar extends React.Component {
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
      <Link to="/Manager/NewUser" className="menu-item" >
        AddAcount
      </Link>
      <Link to="/AddItem" className="menu-item" >
        Add item
      </Link>
      <Link to="/ConformationItem" className="menu-item" >
        Conformation item
      </Link>
      <Link to="/" className="menu-item" onClick={this.logOutMy}>
        LogOut
      </Link>

      </Menu>

    <Switch>
      <Route exact path= "/ConformationItem" >
      <div></div>
      <ConformationItem />
         </Route>
      <Route exact path= "/AddItem" component={() => <AddItem {...this.props}  />} />
      <Route exact path= "/Manager/NewUser" component={() => <AddAcount {...this.props}  />} />
      </Switch>
    </Router>

  );


    }


}
const mapDispatchToProps = (dispatch) => {
  console.log("dispatch")
  return {
LogOutDispatch:() => dispatch(logoutAction())
  }
}; 

export default connect(null,mapDispatchToProps)(sidebar);
