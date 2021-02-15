import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Home from './components/Home';
import UploadFlight from "./components/Flights/UploadFlight";
import FlightView from "./components/Flights/FlightView";
import PilotsList from "./components/Pilots/PilotsList";
import PilotOrder from "./components/Pilots/PilotOrder";
import PilotFlights from "./components/Pilots/PilotFlights";
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Stats from "./components/Stats/StatsOverall";
import Feedback from "./components/Feedback/Feedback";
import FeedbackReview from "./components/Feedback/FeedbackReview";
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import FlightList from "./components/Flights/FlightList";
import { FlightDataProvider } from "./providers/FlightDataContext";

import './custom.css'

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <FlightDataProvider>
        <Router history={history}>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/flight/list" component={FlightList} />
              <Route exact path="/flight/viewer" component={FlightView} />
              <AuthorizeRoute exact path="/flight/upload" component={UploadFlight} />
              <Route exact path="/pilot/list" component={PilotsList} />
              <Route exact path="/pilot/order" component={PilotOrder} />
              <Route exact path="/pilot/flights" component={PilotFlights} />
              <Route exact path="/statistics" component={Stats} />
              <Route exact path="/feedback" component={Feedback} />
              <AuthorizeRoute exact path="/feedback/review" component={FeedbackReview} />
              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
          </Switch>
        </Router>
      </FlightDataProvider>
    </div>
  );
}

export default App;