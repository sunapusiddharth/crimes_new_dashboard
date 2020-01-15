import React, { Component, Fragment } from 'react';
import "./App.css";
import './styles/w3.css'
import Main from './Main';
import SideBar from './components/SideBarTry';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from './helpers';
import { authenticationService } from './services';
import PrivateRoute  from './components/PrivateRoute';
import { HomePage } from './components/HomePage';
import { AdminPage } from './components/AdminPage';
import { LoginPage } from './components/LoginPage';
import {withRouter} from 'react-router-dom';
import MegaMenu from './common/MegaMenu';



// import Header from './Header';
class App extends Component {
  constructor(props) {
    super(props);
    console.log("from app constructor")

    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }
  componentDidMount() {
    // debugger;
    authenticationService.currentUser.subscribe(x =>{
      // debugger;
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      })
    })
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
          
            <Fragment>
              <MegaMenu logoutFn={this.logout} currentUser={currentUser} isAdmin={isAdmin}/>
              {currentUser &&
              <Main />
          }
          </Fragment>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
          <Route path="/login" component={LoginPage} />
      </Router>
    );
  }
}



export default withRouter(App)