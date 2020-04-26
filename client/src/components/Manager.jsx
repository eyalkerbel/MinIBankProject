import React from "react";
import SideBarPerson from '../sidebarManager.js';
import { json } from "body-parser";


class Manager extends React.Component {
    constructor(props) {
        super(props);
      this.state ={
          uName: '',
          password:'',
          officeName: '',
          employeList: []
      }
    }
    componentDidMount() {
this.getManagerData().then(res => 
    {
        this.setState({uName:res.username,officeName:res.officeName,employeList:res.officeEmployee});
}).catch(err => console.log(err,"error"));


    }
    getManagerData = async () => {
        const response = await fetch("/GetManagarData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify()
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        return (<div>
        <div>slsl</div>
        <SideBarPerson {...this.state} {...this.props} outerContainerId={"App"}   />
        </div>);
    }
}

export default Manager;