import React from "react";
import SidebarPerson from '../sidebarPerson';
import axios from "axios";
class Person extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
    }
    console.log("Enter person");
}

componentDidMount() {
    
    axios.request({
        method: "GET",
        url:"/GetPerson",
    }).then(res => {
        this.setState({username:res.data.username});
    });
}
render() {
    return(
    <SidebarPerson {...this.state} {...this.props} outerContainerId={"App"}  />);
}

}
export default Person;