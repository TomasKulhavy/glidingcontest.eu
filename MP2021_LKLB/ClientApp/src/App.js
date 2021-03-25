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
import Stats from "./components/Stats/StatsOverall";
import Feedback from "./components/Feedback/Feedback";
import FeedbackReview from "./components/Feedback/FeedbackReview";
import FlightList from "./components/Flights/FlightList";
import NotFound from "./components/Pages/NotFound";
import { FlightDataProvider } from "./providers/FlightDataContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AccessDenied from './components/Pages/AccessDenied';
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

import './custom.css'

function App() {
  const history = createBrowserHistory();

  return (
    <div className="App">
      <FlightDataProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/flight/list" component={FlightList} />
            <Route exact path="/flight/viewer/:id" component={FlightView} />
            <Route exact path="/flight/upload" component={UploadFlight} />
            <Route exact path="/pilot/list" component={PilotsList} />
            <Route exact path="/pilot/order" component={PilotOrder} />
            <Route exact path="/pilot/flights/:id" component={PilotFlights} />
            <Route exact path="/statistics" component={Stats} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/feedback/review" component={FeedbackReview} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/access/denied" component={AccessDenied} />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route path="/password/reset" component={ResetPassword} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </FlightDataProvider>
    </div>
  );
}

export default App;