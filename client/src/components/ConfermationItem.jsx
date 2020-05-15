import React from "react";
import {connect} from "react-redux";
import charges from "../reducers/ChargesReducer";
import {SetListChargers} from "../Actions/ChargesActions";
import * as API from "../Api";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ItemRow from "./ItemRow";
class ConfermationItem extends React.Component {
constructor(props) {
super(props);
this.approveItem = this.approveItem.bind(this);
}
componentDidMount() {
    console.log("componentdidmount compoitem");
    this.props.dispatchCharger();
}
approveItem(itemID) {
this.props.dispatchApproveItem(itemID);
}
declineItem(itemID) {

}

render() {
        const classes = {
             table: {
            minWidth: 650,
          },
        };
        return (
            <div>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">person name</TableCell>
                  <TableCell align="right">item name</TableCell>
                  <TableCell align="right">item price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.chargers.map((row,index) => (
                   
                  <ItemRow index={row.itemID} itemID={row.itemID} itemName={row.itemName} itemPrice={row.itemPrice} personName={row.personName}
                   approveItem={this.approveItem} declineItem={this.declineItem} /> 
               ))}
              </TableBody>
            </Table>
          </div>
        );
      }


}

function setChargers() {
    return function(dispatch) {

    return API.getChargers().then(chargers => {
        console.log(chargers);
        dispatch(SetListChargers(chargers));
    
    });
}
}

function approveItem(itemID) {
    console.log("approveItemAction conformation")
    return function(dispatch) {
        return API.approveItem(itemID).then(chargers => {
            console.log(chargers);
            dispatch(SetListChargers(chargers));
        
        });
    }
}


// const getAllChargersOffice = (charges,officeId) => {
//     console.log("getAllChargersOffice");
//     console.log(charges);
//     const chargers2 =  charges.filter(charger => (charger.officeID == officeId));
//     console.log(chargers2);
//     return chargers2;
// }

const mapStateToProps = (state) => ({
 chargers: state.chargers
});


const mapDispatchToProps = dispatch => ({
    dispatchCharger: () => dispatch(setChargers()),
    dispatchApproveItem: (itemID) => dispatch(approveItem(itemID))
})


export default connect(mapStateToProps,mapDispatchToProps)(ConfermationItem);