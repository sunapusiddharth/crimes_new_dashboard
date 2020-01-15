import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services';
import {withRouter} from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        // debugger
        const currentUser = authenticationService.currentUserValue;
        // debugger
        if (!currentUser) {
            // debugger;
            // not logged in so redirect to login page with the return url
            // debugger
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // debugger
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

export default withRouter(PrivateRoute)