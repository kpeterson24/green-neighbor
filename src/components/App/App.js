import React, {Component, Fragment} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import DetailsPage from '../DetailsPage/DetailsPage';
import AboutPage from '../AboutPage/AboutPage';
import IntroductionPage from '../IntroductionPage/IntroductionPage';
import UtilityPage from '../UtilityPage/UtilityPage';
import Nav from '../Nav/Nav';
import AdminLandingPage from '../Admin/AdminLandingPage/AdminLandingPage.js';
import ManageAdminsPage from '../Admin/ManageAdminsPage/ManageAdminsPage.js';
import RecordsPage from '../Admin/RecordsPage/RecordsPage';
import TicketsPage from '../Admin/TicketsPage/TicketsPage';

import './App.css';
import ReportErrorPage from '../ReportErrorPage/ReportErrorPage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/intro" />
          <Redirect exact from='/admin' to='/admin/home' />
          {/* Visiting localhost:3000/about will show the about page.
          This is a route anyone can see, no login necessary */}
          <Route
            exact
            path="/about"
            component={AboutPage}
          />
          <Route
            exact
            path="/intro"
            component={IntroductionPage}
          />
          <Route
            path="/details/:id/:zip"
            component={DetailsPage}
          />
          <Route
            path="/utility/:zip"
            component={UtilityPage}
          />
          <Route
            path="/report/:zip/:eia_state?/:program_id?"
            component={ReportErrorPage}
          />
          <Fragment>
            <Nav />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting /home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on /admin/home */}
            <ProtectedRoute
              exact
              path="/admin/home"
              component={AdminLandingPage}
            />
            <ProtectedRoute
              exact
              path="/admin/manageAdmins"
              component={ManageAdminsPage}
            />
            <ProtectedRoute
              exact
              path="/admin/records"
              component={RecordsPage}
            />
            <ProtectedRoute
              exact
              path="/admin/tickets"
              component={TicketsPage}
            />
          </Fragment>
          {/* This 404 route needs to be last. */}
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Router>
  )}
}

export default connect()(App);
