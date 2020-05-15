import React from "react";
import * as API from "../Api";
import {connect} from "react-redux";
import types from "../Actions/types";
import {ManagerForApproveAction} from "../Actions/ChargesActions";
import { STATES } from "mongoose";
import chargers from "../reducers/ChargesReducer";
class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemPrice: '',
            errorMassage: ''
        };
        this.AddItemToOffice = this.AddItemToOffice.bind(this);
        this.addAction = this.addAction.bind(this);
    }
    

   async addAction() {
      const succ =  await API.AddItemToffice(this.state.itemName,this.state.itemPrice);
         console.log("finish", succ);
       if(succ.answer == "succsessfull") {
        this.setState({succsessfull:"succsessfull"});
       }
      this.props.itemCharge(this.props.officeID,this.props.personID,this.state.itemName,this.state.itemPrice); 
       }
        

    AddItemToOffice(e) {
    this.addAction();
   e.preventDefault();

    }


    render() {
        return(
        <div className="login">
          <div className="login-header">
            <h1>Add Item you bought</h1>
          </div>
          <form name="my-form" className="login-form" onSubmit={this.AddItemToOffice}>
           <p>{this.state.errorMassage}</p>
            <h3>Item name</h3>
            <input type="text" placeholder="enter Item name" name="ItemName"  onChange={e => {this.setState({itemName:e.target.value})} }/><br />
            <h3>Item price</h3>
            <input type="number" placeholder="enter the price of the item" name="ItemPrice" onChange={e=> {this.setState({itemPrice:e.target.value})}}/>
           <br />
            <input type="submit" value="add item" className="login-button"/>
          </form>
        </div>
    
        );
}
}




const mapStateToProps = state => ({
    officeID: state.user.officeID,
    personID: state.user.personID
});

const mapDispatchToProps = dispatch => ({
    itemCharge:(OfficeID,PersonID,itemName,itemPrice) => dispatch(ManagerForApproveAction(OfficeID,PersonID,itemName,itemPrice)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AddItem);