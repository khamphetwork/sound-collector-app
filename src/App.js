import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect, withRouter } from "react-router-dom";

import Record from './Record/index'
import AgreementPage from './AgreementPage/AgreementPage'

export default class App extends Component {

  render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Record} />
                    <Route exact path="/agreement" component={AgreementPage} />
                    <Route path="*" component={Record} />
                </Switch>
            </BrowserRouter>
        )
    }
}
