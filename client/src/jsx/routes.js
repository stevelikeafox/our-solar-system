import React from 'react';

import { Cards } from './cards';
import { SolarSystemModel } from './solarSystemModel';
import { NavBar } from './navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AddCards } from './addCards';
import { AccountDetails } from './accountDetails';
import { Signup } from './signUp';
import { Login } from './login';
import { NASA } from './nasa';


export const Routes = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/cards" component={Cards} />
                <Route exact path="/"><Redirect to="login" />
                </Route>
                <Route exact path="/solarSystemModel" component={SolarSystemModel} />
                <Route exact path="/accountDetails" component={AccountDetails} />
                <Route exact path="/addCards" component={AddCards} />
                <Route exact path="/signUp" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/nasa" component={NASA} />

            </Switch>
        </div>
    );


}


export default Routes;