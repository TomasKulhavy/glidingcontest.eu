import React, { useEffect, useContext, useState } from 'react';
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
import { FlightDataProvider, FlightDataContext, SET_ACCESS_TOKEN_AFTER_RELOAD } from "./providers/FlightDataContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AccessDenied from './components/Pages/AccessDenied';
import axios from "axios";

import './custom.css'

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

function App() {
  const history = createBrowserHistory();
  /*
  const { dispatch } = useContext(FlightDataContext);
  const { accessToken } = useContext(FlightDataContext);
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/getToken`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken
        }
    })
    .then((response) => {
      console.log(response.data.accessToken);
      dispatch({ type: SET_ACCESS_TOKEN_AFTER_RELOAD, accessToken: response.data.accessToken});
    })
    .catch((response) => {

    })
    //console.log(accesToken);
    
    if (accessToken !== null) {
      console.log(accessToken)
      let tokenData;
      tokenData = parseJwt(accessToken)
      let dateNow = Date.now();
      let exp = tokenData.exp * 1000 - 30000;
      if (dateNow >= exp) {
        dispatch({ type: SET_ACCESS_TOKEN, payload: null });
      }
    }
    
  }, [dispatch])
  */

  return (
    <div className="App">
      <FlightDataProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/flight/list" component={FlightList} />
            <Route exact path="/flight/viewer" component={FlightView} />
            <Route exact path="/flight/upload" component={UploadFlight} />
            <Route exact path="/pilot/list" component={PilotsList} />
            <Route exact path="/pilot/order" component={PilotOrder} />
            <Route exact path="/pilot/flights" component={PilotFlights} />
            <Route exact path="/statistics" component={Stats} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/feedback/review" component={FeedbackReview} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/access/denied" component={AccessDenied} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </FlightDataProvider>
    </div>
  );
}

export default App;