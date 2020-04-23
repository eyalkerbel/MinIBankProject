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

  import Registration from "./Registration";
  import Login from "./Login";
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
        isRegister: false,
        successfullRegister:false
      };
      this.handleRegistrationClick =this.handleRegistrationClick.bind(this);
    }
      componentDidMount() {
     
         
      }
componentDidUpdate() {
  if(this.state.isRegister) {
  this.handleRegistrationClickMe().then(res => {
    console.log(res.answer);
    if(res.answer == "Succsessfully") { 
      this.setState({successfullRegister:true,isRegister:false});
      this.props.history.push({pathname:"/Manager"});
    }
    else {
      console.log("saas");
    }

  }).catch(err => console.log(err));
}
}
      callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body + "rppp");
        return body;
      };

      handleSubmit = async e => {
        e.preventDefault();
        console.log("sss");
        const response = await fetch('/api/world', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName: this.state.uName,password: this.state.password }),
        });
     //   this.setState({ responseToPost: body });
      };


       handleRegistrationClickMe = async ()  => {
        console.log(this.state.uName,this.state.password,this.state.officeName);
        console.log(this.state.response+"ss");
        console.log("sss");
        const response = await fetch('/api/Registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName: this.state.uName,password:this.state.password,officeName:this.state.officeName}),
        });
         const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body+ "sssff");
        return body;
       
     //   this.setState({ responseToPost: body });
      };

       handleRegistrationClick(userName,password,officeName) {
        this.setState({isRegister:true,uName:userName,password:password,officeName:officeName});
        console.log(this.state.isRegister);
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
                <Login history={this.props.history} />
                </Route>
                <Route path="/Registration">
                <Registration handleSubmit={this.handleRegistrationClick}/>
                </Route>
            </Switch>
            </Router>

    )};
    }

    export default withRouter(Home);




