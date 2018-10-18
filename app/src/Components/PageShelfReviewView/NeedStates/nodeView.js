import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  table: {
    boxSizing:"border-box",
    width:180,
    height:100,
    border:'3px solid lightBlue'
},
row: {
  height:32
},
cell:{
  width:90,
  padding:0,
  textAlign:'center',
  border:'none',
  borderRight:'3px solid lightBlue'
}
});
class NodeLabel extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render() {
        const { classes } = this.props;
    const {className, nodeData} = this.props;
    const color=className===''?'red':'lightBlue';
    return (
      <div key={this.props.nodeData.id} className={className+" node node"+this.props.nodeData.id} style={{width:186,
      height:106}}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
              </TableCell>
              <TableCell className={classes.cell}>
              value1
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
              name
              </TableCell>
              <TableCell className={classes.cell}>
              value2
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
              </TableCell>
              <TableCell className={classes.cell}>
              value3
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(NodeLabel);
