import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Home from './components/Home';
import UploadFlight from "./components/Flights/UploadFlight";
import FlightView from "./components/Flights/FlightView";
import PilotsList from "./components/Pilots/PilotsList";
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import FlightList from "./components/Flights/FlightList";

import './custom.css'

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/flight/list" component={FlightList} />
            <Route exact path="/flight/viewer" component={FlightView} />
            <AuthorizeRoute exact path="/flight/upload" component={UploadFlight} />
            <Route exact path="/pilot/list" component={PilotsList} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;