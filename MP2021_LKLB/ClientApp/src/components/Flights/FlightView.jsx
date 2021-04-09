import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { Container, Table, Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MapContainer, TileLayer, Polyline, Circle, LayerGroup, Marker, Tooltip } from "react-leaflet";
import CanvasJSReact from '../../assets/canvasjs.react';
import { FlightDataContext, ADD_PILOTID } from "../../providers/FlightDataContext";
//import Chart from 'react-apexcharts';
import moment from 'moment-with-locales-es6';
import Loading from "../Pages/Loading";
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import './Flight.css'

const FlightView = (props) => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const history = createBrowserHistory();
  const [fixes, setFixes] = useState([]);
  const [flightLog, setFlightLog] = useState([]);
  const [rad, setRad] = useState([]);
  const [task, setTask] = useState([]);
  const [fixesToGraph, setFixesToGraph] = useState([]);
  const [, dispatch] = useContext(FlightDataContext);
  const [loading, setLoading] = useState(false);
  const [lastFix, setLastFix] = useState();
  const [, setError] = useState(false);
  var radian = ([]);
  let center;
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/View/${props.match.params.id}`)
      .then((response) => {
        setFixes(response.data)
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setError(true)
        history.push(`/flight/list`)
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/View/getRadius/${props.match.params.id}`)
      .then((response) => {
        setRad(response.data)
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/View/graph/${props.match.params.id}`)
      .then((response) => {
        setFixesToGraph(response.data)
        setLastFix(response.data[0].timestamp)
      })
      .catch(() => {
        setError(true)
        history.push(`/flight/list`)
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/View/getTask/${props.match.params.id}`)
      .then((response) => {
        setTask(response.data)
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/FlightLog/getDetails/${props.match.params.id}`)
      .then((response) => {
        setFlightLog(response.data)
      })
  }, []);

  rad.map((item) => {
    radian.push(item.radius)
  })

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
    center = center2[1];
    return array;
  }

  function secondsToHms(time) {
    var d = Number(time);
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
            <b>Pilot: </b> <Button color="primary" size="sm" outline onClick={() =>
              dispatch({
                type: ADD_PILOTID,
                pilotId: flightLog.userId
              })} tag={Link} to={`/pilot/flights/${flightLog.userId}`}>
              {flightLog.pilotName}</Button>
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
        <CardHeader className="bg-dark font-weight-bold text-white d-block mb-1 text-uppercase text-center"><h5>Informace o letu</h5></CardHeader>
        <CardBody>
          <Table>
            <tbody>
              {renderFlights()}
              <td>
                <tr>
                  <b>Čas letu: </b>{secondsToHms(flightLog.flightTime)}
                </tr>
                <tr>
                  <b>Čas na trati: </b>{secondsToHms(flightLog.taskTime)}
                </tr>
                <tr>
                  <b>Body za let: </b>{Math.round(flightLog.score)}
                </tr>
                <tr>
                  <b>Kilometry: </b>{Math.round(flightLog.kilometers)} KM
                </tr>
                <tr>
                  <b>Prům. rychlost: </b>{Number(flightLog.avgSpeed).toFixed(1)} KM/H
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
				x: (item.timestamp - lastFix) / 1000,
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

  const redOptions = { color: 'red' }

  function renderCircle()
  {
    var array = renderTask();
    const circle = array.map((item, index) => {
      var rad = radian[index];
      var centerR = item;

      if(rad === undefined)
      {
        rad = 500;
      }

      return (
        <Circle center={centerR} pathOptions={redOptions} radius={rad} />
      )     
    })
    return circle;
  }
  
  function renderLL()
  {
    var takeOffM = [];
    var landingM = [];
    var takeoff = (fixes[0])
    var landing = (fixes[fixes.length - 1])
    if(takeoff != null)
    {
      takeOffM.push(takeoff.latitude, takeoff.longitude)
    }
    if(landing != null)
    {
      landingM.push(landing.latitude, landing.longitude)
    }
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    return(
      <>
        <Marker position={takeOffM}>
          <Tooltip>Vzlet</Tooltip>
        </Marker>
        <Marker position={landingM}>
          <Tooltip>Přistání</Tooltip>
        </Marker>
      </>
    )
  }

  const flightLine = [
    renderFixes()
  ]

  const taskLine = [
    renderTask()
  ]

  const blueOptions = { color: 'blue' }
  const limeOptions = { color: 'lime' }

  /*
    <TileLayer
      attribution='&copy; <a href="https://www.openaip.net/">openAIP Data</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
      url='http://{s}.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_basemap@EPSG%3A900913@png/{z}/{x}/{y}.{ext}'
      ext="png"
      minZoom={4}
      maxZoom={14}
      tms={true}
      detectRetina={true}
      subdomains={12}
    />
  */const position = [51.505, -0.09]

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
          <Card className="mt-2">
            <CardHeader className="bg-dark font-weight-bold text-white d-block mb-1 text-center text-uppercase"><h5>Trasa letu a výškový profil</h5></CardHeader>
            <CardBody style={{padding: '0%'}}>
              <MapContainer className="leaflet" center={center} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                  url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                />
                {renderLL()}
                <LayerGroup>
                  {renderCircle()}
                </LayerGroup>
                <Polyline pathOptions={limeOptions} positions={taskLine} />
                <Polyline pathOptions={blueOptions} positions={flightLine} />
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