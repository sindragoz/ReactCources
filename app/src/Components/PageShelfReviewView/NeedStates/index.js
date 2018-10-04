import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Redirect } from 'react-router-dom';

import StructureView from "./StructureView";
import TreeView from "./TreeView/index";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  content: {
    padding: '20px'
  },
});

class NeedStates extends React.Component {
  state = {
    subView: (this.props.match.params.subView) ? this.props.match.params.subView : 'need-states',
    tabValue: (this.props.match.params.tabs) ? this.props.match.params.tabs : 'tree-view',
    reviewId: this.props.match.params.reviewId,
  };

  handleChange = (event, value) => {
    this.setState({ tabValue: value });
    this.props.history.push('/shelf-reviews/view/' + this.state.reviewId + '/need-states/' + value);
  };

  render() {
    const { classes } = this.props;
    // const {value} = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            // disableRipple
            value="tree-view"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Tree View"
          />
          <Tab
            // disableRipple
            value="structure-view"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Market Structure View"
          />
        </Tabs>
        <div className={classes.content}>
          <Switch>
            <Route exact path='/shelf-reviews/view/:reviewId/need-states/tree-view'
              component={TreeView}
              reviewId={this.state.reviewId}
              subTab='tree-view'
            />
            <Route exact path='/shelf-reviews/view/:reviewId/need-states/structure-view'
              component={StructureView}
              reviewId={this.state.reviewId}
              subTab='structure-view'
            />
            <Redirect to={'/shelf-reviews/view/' + this.state.reviewId + '/need-states/tree-view'} />
          </Switch>
        </div>
      </div>
    );
  }
}

NeedStates.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NeedStates);