import React from 'react';

import { Cards } from './cards';
import { SolarSystemModel } from './solarSystemModel';
import { NavBar } from './navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AddCards } from './addCards';
import { AccountDetails } from './accountDetails';
import { Signup } from './signUp';
import { LoginForm } from './loginForm';

export const Routes = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/cards" component={Cards} />
                <Route exact path="/"><Redirect to="cards" />
                </Route>
                <Route exact path="/solarSystemModel" component={SolarSystemModel} />
                <Route exact path="/accountDetails" component={AccountDetails} />
                <Route exact path="/addCards" component={AddCards} />
                <Route exact path="/signUp" component={Signup} />
                <Route exact path="/loginForm" component={LoginForm} />


            </Switch>
        </div>
    );


}


export default Routes;