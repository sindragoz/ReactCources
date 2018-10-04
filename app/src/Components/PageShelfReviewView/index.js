import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import PageShelfReviewProductData from './ProductData';
import defineObjectives from './Objectives';
import NeedStates from './NeedStates';
import RecommendedRange from './RecommendedRange';
import ReviewSteper from './ReviewSteper';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  title: {
    padding: '20px',
  },
  paper: {
    margin: '10px',
  },
});

class PageShelfReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subView: (this.props.match.params.subView) ? this.props.match.params.subView : 'product-data',
      reviewId: this.props.match.params.reviewId,
      // reviewId: (this.props.location.state && this.props.location.state.reviewId)
      //     ? this.props.location.state.reviewId
      //     : this.props.match.params.reviewId,
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event, value) {
    this.setState({ subView: value });
    this.props.history.push(`/shelf-reviews/view/${this.state.reviewId}/${value}`);
  }

  handleChangeIndex = (index) => {
    this.setState({ tabValue: index });
  };

  render() {
    /* console.log(this.props); */
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.subView}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Review Product Data" value="product-data" />
            <Tab label="Define Objectives" value="objectives" />
            <Tab label="Identify Need States" value="need-states" />
            <Tab label="View Recommended Range" value="recommended-range" />
          </Tabs>
        </AppBar>
        <Typography variant="title" color="inherit" gutterBottom align="left" className={classes.title}>
          Title of review
          {' '}
          {this.state.reviewId}
        </Typography>
        <Paper className={classes.paper}>
          <Switch>
            <Route
              exact
              path="/shelf-reviews/view/:reviewId/product-data"
              component={PageShelfReviewProductData}
              reviewId={this.state.reviewId}
              subView="product-data"
            />
            <Route
              exact
              path="/shelf-reviews/view/:reviewId/objectives"
              component={defineObjectives}
              reviewId={this.state.reviewId}
              subView="objectives"
            />
            <Route
              exact
              path="/shelf-reviews/view/:reviewId/objectives/:tabs"
              component={defineObjectives}
              reviewId={this.state.reviewId}
              subView="objectives"
            />
            <Route
              exact
              path="/shelf-reviews/view/:reviewId/need-states/:tabs"
              component={NeedStates}
              reviewId={this.state.reviewId}
              subView="need-states"
            />
            <Route
              exact
              path="/shelf-reviews/view/:reviewId/need-states"
              component={NeedStates}
              reviewId={this.state.reviewId}
              subView="need-states"
            />
            <Route
              exact
              path="/shelf-reviews/view/:reviewId/recommended-range"
              component={RecommendedRange}
              reviewId={this.state.reviewId}
              subView="recommended-range"
            />
            <Redirect to={`/shelf-reviews/view/${this.state.reviewId}/product-data`} />
          </Switch>
        </Paper>
        <ReviewSteper />
      </div>
    );
  }
}

PageShelfReview.propTypes = {
  classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  // match: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PageShelfReview);
