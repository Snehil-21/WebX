import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from './components/Customer/SignUp';
import Login from './components/Customer/Login';
import Home from './components/Customer/Home';
import AdminHome from './components/Admin/Home';
import AdminSignup from './components/Admin/Signup';
import AdminLogin from './components/Admin/Login';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={SignUp} />
                <Route path='/login' exact component={Login} />
                <Route path='/home' exact component={Home} />
                <Route path='/admin/signup' exact component={AdminSignup} />
                <Route path='/admin/login' exact component={AdminLogin} />
                <Route path='/admin/home' exact component={AdminHome} />
            </Switch>
        </Router>
    )
}

export default Routes;