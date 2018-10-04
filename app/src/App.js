import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import './App.css';
import Layout from './Components/Layout/MainLayout';

import MainPageIndex from './Components/PageMain';
import PageLogin from './Components/PageLogin';
import PageNotFound from './Components/PageNotFound';
import ReviewList from './Components/PageShelfReviewList';
import PageShelfReview from './Components/PageShelfReviewView';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/login" component={PageLogin} />
              <Route exact path="/" component={MainPageIndex} />
              <Route exact path="/shelf-reviews" component={ReviewList} />
              <Route
                exact
                path="/shelf-reviews/view/:reviewId"
                component={PageShelfReview}
              />
              <Route
                path="/shelf-reviews/view/:reviewId/:subView/:tabs"
                component={PageShelfReview}
              />
              <Route
                path="/shelf-reviews/view/:reviewId/:subView"
                component={PageShelfReview}
              />
              <Route exact path="/404" component={PageNotFound} />
              <Redirect to="/404" /> 
              {/* 
              */}
            </Switch>
          </Layout>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;