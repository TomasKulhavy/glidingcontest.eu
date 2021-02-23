import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { Container, Table, Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import { Link, useHistory } from "react-router-dom";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import CanvasJSReact from '../../assets/canvasjs.react';
import { FlightDataContext, ADD_PILOTID } from "../../providers/FlightDataContext";
import Chart from 'react-apexcharts';
import moment from 'moment-with-locales-es6';
import Loading from "../Pages/Loading";

import './Flight.css'

const FlightView = () => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const history = useHistory();
  const [fixes, setFixes] = useState([]);
  const [flightLog, setFlightLog] = useState([]);
  const [task, setTask] = useState([]);
  const [analyse, setAnalyse] = useState([]);
  const [score, setScore] = useState();
  const [flightTime, setFlightTime] = useState();
  const [speed, setSpeed] = useState();
  const [kilometers, setKilometers] = useState();
  const [fixesToGraph, setFixesToGraph] = useState([]);
  const [state, dispatch] = useContext(FlightDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let center;
  

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://localhost:44346/api/View/${state.currentFlightId}`)
      .then((response) => {
        setFixes(response.data)
        console.log(fixes);
      }).
      then(() => {
        setLoading(false);
      });
    axios
      .get(`https://localhost:44346/api/View/graph/${state.currentFlightId}`, {params: {fixesToGraph: fixesToGraph}})
      .then((response) => {
        setFixesToGraph(response.data)
      })
      .catch(() => {
        setError(true)
        history.push("/pilot/flights")
      });
    axios
      .get(`https://localhost:44346/api/FlightLog/getDetails/${state.currentFlightId}`)
      .then((response) => {
        setFlightLog(response.data)
      });
    axios
      .get(`https://localhost:44346/api/View/getTask/${state.currentFlightId}`)
      .then((response) => {
        setTask(response.data)
      });
    axios
      .get(`https://localhost:44346/api/Analyse/${state.currentFlightId}`, {params: {analyse: analyse}})
      .then((response) => {
        setAnalyse(response.data[0]);
        console.log(response.data[0]);
        setScore(Number((response.data[0].score).toFixed(1)));
        setFlightTime(response.data[0].flightTime.totalSeconds);
        setKilometers(response.data[0].kilometers);
        setSpeed(Number((response.data[0].avgSpeed).toFixed(2)));
      });
  }, []);

  function renderFixes() {
    const array = ([]);
    fixes.map((item) => {
      array.push([item.latitude, item.longitude]);
    });
    return array;
  }

  function renderTask() {
    const center2 = ([]);
    const array = ([]);
    task.map((item) => {
      center2.push([Number((item.latitude).toFixed(1)), Number((item.longitude).toFixed(1))])
      array.push([item.latitude, item.longitude]);
    });
    const res = [...array.slice(1, array.length - 1)];
    center = center2[1];
    return res;
  }

  function secondsToHms() {
    var d = Number(flightTime);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 9 ? m + ":" : "0" + m + ":";
    var sDisplay = s;
    return hDisplay + mDisplay + sDisplay; 
  }

  function renderFlights() {
    moment.locale('cs'); 
    return (
      <>
        <td>
          <tr>
            <b>Datum: </b>{moment(`${flightLog.date}`).format('L')}
          </tr> 
          <tr>
            <b>Pilot: </b> <Button color="primary" outline onClick={() =>
              dispatch({
                type: ADD_PILOTID,
                pilotId: flightLog.userId
              })} tag={Link} to="/pilot/flights">
              {flightLog.userId}</Button>
          </tr> 
          <tr>
            <b>Kluzák: </b>{flightLog.gliderType}
          </tr> 
          <tr>
            <b>Registrace: </b>{flightLog.registration}
          </tr> 
        </td>
      </>
    );
  }

  function renderAnalyse() {   
    return (
      <Card>
        <CardHeader className="bg-dark text-light text-center"><h5>Informace o letu</h5></CardHeader>
        <CardBody>
          <Table>
            <tbody>
              {renderFlights()}
              <td>
                <tr>
                  <b>Čas letu: </b>{secondsToHms()}
                </tr>
                <tr>
                  <b>Body za let: </b>{score}
                </tr>
                <tr>
                  <b>Kilometry: </b>{kilometers} KM
                </tr>
                <tr>
                  <b>Prům. rychlost: </b>{speed} KM/H
                </tr>
              </td>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }

  function renderGraph() { 
  /* 
  
    // APEX CHART, načítá se dlouho

    const data = fixes.map((item) => {
      return (item.timestamp);
    });

    const fixAlt = fixes.map((item) => {
      return (item.gpsAltitude);
    });

    const options = {
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: data
      }
    }
    const series = [{
      data: fixAlt
    }]
    return (
        <Chart options={options} series={series} type="line" />
    );
    */
  
		var data = [];
		var dataSeries = { type: "line" };
		var dataPoints = [];
		
		fixesToGraph.map((item) => {
      dataPoints.push({
				x: item.time,
				y: item.gpsAltitude
			});
    });

		dataSeries.dataPoints = dataPoints;
		data.push(dataSeries);
		const options = {
			animationEnabled: true,
			data: data
    }

		return (
		<div>
			<CanvasJSChart options = {options} />
			<span className="graph"></span>
		</div>
		);
  }

  const flightLine = [
    renderFixes()
  ]

  const taskLine = [
    renderTask()
  ]

  const blueOptions = { color: 'blue' }
  const limeOptions = { color: 'lime' }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  else if (task)
  {
    return (
      <>
        <NavMenu />
        <Container>
          {renderAnalyse()}
          <Card className="m-2">
            <CardHeader className="bg-dark text-light text-center"><h5>Trasa letu</h5></CardHeader>
            <CardBody style={{padding: '0%'}}>
              <MapContainer className="leaflet" center={center} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline pathOptions={blueOptions} positions={flightLine} />
                <Polyline pathOptions={limeOptions} positions={taskLine} />
              </MapContainer>
            </CardBody>
            <CardFooter>{renderGraph()}</CardFooter>
          </Card>
        </Container>
      </>
    )
  }
}

export default FlightView;