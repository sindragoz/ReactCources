import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';

import { sections } from "../../Settings/settings";

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  title: {
    textAlign: 'center',
    padding: '10px'
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
    width: 60,
    height: 60,
  },
  avatarRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: "20px",
    backgroundImage: " url(/assets/images/18.jpg)",
    /* backgroundImage: " url(/assets/images/sidebar_bg.jpg)", */
    height: "140px",
    padding: "20px 0",
    color: "#fff",
    backgroundSize: "cover"
  },
};

class SidebarMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }


  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <div className={classes.avatarRow}>
          <Avatar
            className={classes.purpleAvatar}
            src="https://material-ui.com/static/images/uxceo-128.jpg"
          >OP</Avatar>
          <Typography variant="title" color="inherit" align="center" className={classes.title}>
            Alexander Alexandrovich
                    </Typography>
        </div>
        {sections.map((data, idx) => (
          <ListItem button component={Link} to={data.href} disabled={data.href !== 'none' ? false : true} key={idx}>
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            <ListItemText primary={data.name} />
          </ListItem>
        ))}
        <Divider />
      </div>
    );

    return (
      <React.Fragment>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={this.toggleDrawer('left', true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    );
  }
}

SidebarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarMenu);