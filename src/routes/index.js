import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../components/HOC/PrivateRoute'
import ErrorPage from '../screens/ErrorPage'
import HomePage from '../screens/HomePage'
import SigninPage from '../screens/SigninPage'
import SignupPage from '../screens/SignupPage'

const Router = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path={'/'} exact component={HomePage} />
                <Route path={'/signin'} component={SigninPage} />
                <Route path={'/signup'} component={SignupPage} />
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router