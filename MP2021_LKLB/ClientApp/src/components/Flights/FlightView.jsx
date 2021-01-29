import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container, Table, Button, Row, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import { fixes, fixId, setFixes } from "../../providers/FlightDataContext";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from "react-leaflet";
import CanvasJSReact from '../../assets/canvasjs.react';

import './Flight.css'

const FlightView = () => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [fixes, setFixes] = useState([]);
  const [flightLog, setFlightLog] = useState([]);
  const [task, setTask] = useState([]);
  const [analyse, setAnalyse] = useState([]);
  const [fixId, setFixId] = useState();
  const [score, setScore] = useState();
  const [flightTime, setFlightTime] = useState();

  useEffect(() => {
    axios
      .get(`https://localhost:44346/api/View/4`)
      .then((response) => {
        setFixes(response.data)
      });
    axios
      .get(`https://localhost:44346/api/FlightLog/getDetails/4`)
      .then((response) => {
        setFlightLog(response.data)
        console.log(response.data)
      });
    axios
      .get(`https://localhost:44346/api/View/getTask/4`)
      .then((response) => {
        setTask(response.data)
        console.log(response.data)
      });
    axios
      .get(`https://localhost:44346/api/Analyse/4`, {params: {analyse: analyse}})
      .then((response) => {
        setAnalyse(response.data[0]);
        console.log(response.data[0]);
        setScore(response.data[0].score);
        setFlightTime(response.data[0].flightTime.totalSeconds);
      });
  }, [fixId]);

  function renderFixes() {
    const array = ([]);
    fixes.map((item) => {
      array.push([item.latitude, item.longitude]);
    });
    console.log(array);
    return array;
  }

  function renderTask() {
    const array = ([]);
    task.map((item) => {
      array.push([item.latitude, item.longitude]);
    });
    const res = [...array.slice(1, array.length - 1)];
    console.log(res);
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
    return (
      <>
        <td>
          <tr>
            <b>Datum: </b>{flightLog.date}
          </tr> 
          <tr>
            <b>Pilot: </b>{flightLog.pilot}
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
              </td>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }

  function renderGraph() { 
		var data = [];
		var dataSeries = { type: "line" };
		var dataPoints = [];
		
		fixes.map((item) => {
      dataPoints.push({
				x: item.timestamp,
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
			<span id="timeToRender" className="graph"></span>
		</div>
		);
  }

  const flightLine = [
    renderFixes()
  ]

  const taskLine = [
    renderTask()
  ]

  const center = [50.7, 15.0]

  const blueOptions = { color: 'blue' }
  const limeOptions = { color: 'lime' }
  const redOptions = { color: 'red' }

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

export default FlightView;