import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container, Table, Button, Row, Card, CardBody } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import { fixes, fixId, setFixes } from "../../providers/FlightDataContext";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import CanvasJSReact from '../../assets/canvasjs.react';

import './Flight.css'

const FlightView = () => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [fixes, setFixes] = useState([]);
  const [fixId, setFixId] = useState();

  useEffect(() => {
    axios
      .get(`https://localhost:44346/api/View/2`)
      .then((response) => {
        setFixes(response.data)
        console.log(response.data)
      })
  }, [fixId]);

  function renderFixes() {
    const array = ([]);
    fixes.map((item) => {
      array.push([item.latitude, item.longitude]);
    });
    console.log(array);
    return array;
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
		
		const spanStyle = {
			position:'absolute', 
			top: '10px',
			fontSize: '20px', 
			fontWeight: 'bold', 
			backgroundColor: '#d85757',
      padding: '0px 4px',
      width: '500px',
			color: '#ffffff'
		}
		
		const options = {
			zoomEnabled: true,
			animationEnabled: true,
			data: data  // random data
    }
				
		return (
		<div>
			<CanvasJSChart options = {options} />
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			<span id="timeToRender" style={spanStyle}></span>
		</div>
		);
  }

  const polyline = [
    renderFixes()
  ]

  const center = [50.7, 15.0]

  const limeOptions = { color: 'blue' }


return (
  <>
    <NavMenu />
    <Container>
      <MapContainer className="leaflet" center={center} zoom={8} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
      {renderGraph()}
    </Container>
  </>
  )
}

export default FlightView;