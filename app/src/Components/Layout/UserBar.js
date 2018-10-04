import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

const styles = {};

function UserBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Button color="inherit" href="/login">Login</Button>
    </React.Fragment>
  );
}

export default withStyles(styles)(UserBar);
