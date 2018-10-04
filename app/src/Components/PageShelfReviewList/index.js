import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FolderIcon from '@material-ui/icons/Folder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Blue from '@material-ui/core/colors/deepPurple';
import { Link } from 'react-router-dom';

/* import SmallStepperView from '../common/smallStepper'; */

const CustomTableCell = withStyles(theme => ({
  head: {
    /* backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white, */
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    padding: '20px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 700,
  },
  row: {
    display: 'flex',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  avatar: {
    margin: 5,
    backgroundColor: Blue,
  },
});

let id = 0;

function createData(name, rid, calories, fat, carbs, protein, folder, published) {
  id += 1;
  return {
    id, name, rid, calories, fat, carbs, protein, folder, published,
  };
}

const rows = [
  createData('Frozen yoghurt', 12, 159, 6.0, 24, 4.0, 1, 0),
  createData('Ice cream sandwich', 43, 237, 9.0, 37, 4.3, 0, 1),
  createData('Eclair', 34, 262, 16.0, 24, 6.0, 1, 0),
  createData('Cupcake', 87, 305, 3.7, 67, 4.3, 1, 1),
  createData('Gingerbread', 432, 356, 16.0, 49, 3.9, 0, 0),
];

/* const reviewsListData = [
    {
        folder: 1,
        name: 'Review name ',
        id: 1,
        status: false,
        shared: false,
        published: false,
        createdBy: false,
        createdDate: '01.01.2018 10:20',
        modifiedBy: '',
        modifiedDate: '01.01.2018 10:20',
    },
]; */

const steps = [
  {
    num: 1,
    active: false,
    disabled: false,
    completed: false,
  },
  {
    num: 2,
    active: false,
    disabled: false,
    completed: false,
  },
  {
    num: 3,
    active: false,
    disabled: false,
    completed: false,
  },
  {
    num: 4,
    active: false,
    disabled: false,
    completed: false,
  },
];

function ReviewList(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell />
            <CustomTableCell>Reviews</CustomTableCell>
            <CustomTableCell numeric>Id</CustomTableCell>
            <CustomTableCell numeric>Status</CustomTableCell>
            <CustomTableCell numeric>Shared</CustomTableCell>
            <CustomTableCell numeric>Created By</CustomTableCell>
            <CustomTableCell numeric>Date Created</CustomTableCell>
            <CustomTableCell>Modified By</CustomTableCell>
            <CustomTableCell>Date Modified</CustomTableCell>
            <CustomTableCell>Published</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <CustomTableCell>
                {
                  row.folder ? <FolderIcon /> : null
                }
              </CustomTableCell>
              <CustomTableCell component="th" scope="row">
                <Link
                  to={{
                    pathname: '/shelf-reviews/view/' + row.rid,
                    state: { reviewId: row.rid }
                  }}
                >
                  {row.name}
                </Link>
              </CustomTableCell>
              <CustomTableCell numeric>{row.rid}</CustomTableCell>
              <CustomTableCell>
                {/* <SmallStepperView steps={steps} activeStep={2} /> */}
              </CustomTableCell>
              <CustomTableCell ><CheckCircleIcon /></CustomTableCell>
              <CustomTableCell>User Name</CustomTableCell>
              <CustomTableCell>01.01.2018 10:20</CustomTableCell>
              <CustomTableCell>User Name</CustomTableCell>
              <CustomTableCell>01.01.2018 10:20</CustomTableCell>
              <CustomTableCell>{row.published ? <CheckCircleIcon /> : ''}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </Paper>
  );
}

ReviewList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewList);
