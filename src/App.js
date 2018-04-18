import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect, withRouter } from "react-router-dom";

import Record from './Record/index'

export default class App extends Component {

  render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Record} />
                    <Route path="*" component={Record} />
                </Switch>
            </BrowserRouter>
        )
    }
}
