import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={SignUp} />
                <Route path='/login' exact component={Login} />
                <Route path='/home' exact component={Home} />
            </Switch>
        </Router>
    )
}

export default Routes;