import React from "react";


class AddAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            Uname: '',
            password: ''
        };
        console.log(props);
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log("sss");
        const response = await fetch('/addAcountToManager', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.state.uName,password: this.state.password }),
        });
       
     //   this.setState({ responseToPost: body });
      };
//mission not complete: get the Name from manager for inserting the new user detail under manager name
    render() {
        return (
            <div>
                <div className="login">
      <div className="login-header">
        <h4>Add acount to your office {this.props.uName} </h4>
      </div>
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h3>Username:</h3>
        <input type="text" placeholder="Username"  onChange={e => {this.setState({uName:e.target.value})} }/><br />
        <h3>Password:</h3>
        <input type="password" placeholder="Password" onChange={e=> {this.setState({password:e.target.value})}}/>
        <br />
        <input type="submit" value="Login" className="login-button"/>
      </form>
    </div>
            </div>
        );

    }
}
export default AddAccount;