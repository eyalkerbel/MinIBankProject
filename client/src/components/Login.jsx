import React from "react";
import axios from "axios";
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

class Login extends React.Component {
constructor(props) {
    super(props);

this.state = {
    response: '',
    uName: '',
    password: '',
};
}
componentDidMount() {
   
  }
  
  handleSubmitLogin(e) {
  //  axios.request({
  //    method: "POST",
  //    url: "/Login",
  //    data: {
  //     username: this.state.uName,
  //     password: this.state.password
  //   }
  //  }).then(res => {
  //   if(res.data.answer == "manager") {
  //     this.props.history.push("/Manager");
  //   }
  //   if(res.data.answer == "person") {
  //     this.props.history.push("/Person");
  //   }
  //   else {
  //     console.log("not good");
  //   }
  //  });
   this.props.handleSubmit(this.state.uName,this.state.password);
      console.log("as");
   e.preventDefault();
  };

  handleLoginClick() {
   // this.setState({showLogin:true});
  }


  render() {
    return(
        <div>
        {this.state.showLogin || <div>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:500' rel='stylesheet' type='text/css' />
    
    <div className="login">
      <div className="login-header">
        <h1>Login</h1>
      </div>
      <form className="login-form" onSubmit={this.handleSubmitLogin}>
        <h3>Username:</h3>
        <input type="text" placeholder="Username"  onChange={e => {this.setState({uName:e.target.value})} }/><br />
        <h3>Password:</h3>
        <input type="password" placeholder="Password" onChange={e=> {this.setState({password:e.target.value})}}/>
        <br />
        <input type="submit" value="Login" className="login-button"/>
       
      </form>
    </div>
    <div className="error-page">
    </div>
    
    <div className="try-again" onClick={this.handleLoginClick}></div>
    </div>}
    </div>
    );

  }



}
export default Login;