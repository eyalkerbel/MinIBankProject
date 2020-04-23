import React from "react";
import axios from "axios";
import Home from "./Home";
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
class SignOut extends React.Component {
constructor(props) {
    super(props);
}
componentDidMount() {
    axios.request({
        method: 'GET',
        url: "/logout",
      }).then(res => { 
        console.log(res);
        this.props.history.push({pathname:"/"});

       // addResponseMessage(res.data.serverMessage);
      }).catch((err)=>    console.log("unsucessfull",err));
}

render() {
    return (
    <div>
    <Router>
        <Switch>    
        <Route exact path="/" component={Home} />
        </Switch>
    </Router>
    </div>);
}


}
export default SignOut;