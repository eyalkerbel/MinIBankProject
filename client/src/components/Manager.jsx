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

    render() {
        return (<div>
        <SideBarPerson {...this.state} {...this.props} outerContainerId={"App"}   />
        </div>);
    }
}

export default Manager;