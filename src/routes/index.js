import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import PrivateRoute from '../components/HOC/PrivateRoute'
import HomePage from '../screens/HomePage'
import SigninPage from '../screens/SigninPage'
import SignupPage from '../screens/SignupPage'

const Router = (props) => {
    return (
        <BrowserRouter>
            <PrivateRoute path={'/'} exact component={HomePage} />
            <Route path={'/signin'} component={SigninPage} />
            <Route path={'/signup'} component={SignupPage} />
        </BrowserRouter>
    )
}

export default Router