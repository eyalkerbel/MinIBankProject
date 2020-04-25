import React, { Component } from "react";
class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Uname: '',
            password: '',
            repeatPassword: '',
            OfficeName: '',
            errorMassage: 's'
        }
        this.checkData = this.checkData.bind(this);
    }

    checkData(e) {

        console.log("pppp");
        var username = document.forms["my-form"]["userName"].value;
        var password = document.forms["my-form"]["password"].value;
        var Rpassword = document.forms["my-form"]["Rpassword"].value;
        var officeName = document.forms["my-form"]["officeName"].value;

       if(username == "" || password == "" || officeName== "" ) {
        this.setState({errorMassage: "need to fill all the field" });
        }
        else if(password != Rpassword) {
            this.setState({errorMassage: "passwords need to be fit"});
        }
        else {
            console.log("passvalidion");
            this.props.handleSubmit(username,password,officeName);
        }
        e.preventDefault();


    }


    render() {
        return(
            <div>
            {this.state.showLogin || <div>
        <link href='https://fonts.googleapis.com/css?family=Ubuntu:500' rel='stylesheet' type='text/css' />
        
        <div className="login">
          <div className="login-header">
            <h1>Registration</h1>
          </div>
          <form name="my-form" className="login-form" onSubmit={this.checkData}>
           <p>{this.state.errorMassage}</p>
            <h3>Username:</h3>
            <input type="text" placeholder="Username" name="userName"  onChange={e => {this.setState({uName:e.target.value})} }/><br />
            <h3>Password:</h3>
            <input type="password" placeholder="Password" name="password" onChange={e=> {this.setState({password:e.target.value})}}/>
            <br />
            <h3>Reapet Password:</h3>
            <input type="password"  placeholder="Repeat Password" name="Rpassword" onChange={e=> {this.setState({repeatPassword:e.target.value})}} />
            <br />
            <h3>Name of the office</h3>
            <input type="text" placeholder="officeName" name="officeName"  onChange={e => {this.setState({officeName:e.target.value})} }/><br />
            <input type="submit" value="Login" className="login-button"/>
           
          </form>
        </div>
        <div className="error-page">
        </div>
        
        <div className="try-again" onClick={this.handleRegistrationClick}></div>
        </div>}
        </div>
        );
    
      }


}
export default Registration;