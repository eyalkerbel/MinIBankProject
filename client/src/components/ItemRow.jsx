import React from "react";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';

class ItemRow extends React.Component {
    constructor(props) {
        super(props);
        this.decline = this.decline.bind(this);
        this.approve = this.approve.bind(this);
    }
decline(itemID) {
    this.props.declineItem(itemID);
}
approve(itemID) {
    console.log("approve");
    this.props.approveItem(itemID);
}

    render() {
        return(
        <TableRow key={this.props.index}>
        <TableCell align="right">{this.props.personName}</TableCell>
        <TableCell align="right">{this.props.itemName}</TableCell>
        <TableCell align="right">{this.props.itemPrice}</TableCell>
        <TableCell>
        <IconButton onClick={this.decline.bind(this,this.props.itemID)}><ThumbDownIcon color="secondary"  /></IconButton>
  <IconButton onClick={this.approve.bind(this,this.props.itemID)}>   <ThumbUpIcon color="primary" /> </IconButton>
      </TableCell>

      </TableRow> );
    }
}
export default ItemRow;