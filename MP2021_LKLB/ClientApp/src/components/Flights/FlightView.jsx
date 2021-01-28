import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container, Table, Button, Row, Card, CardBody } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { fixes, fixId, setFixes } from "../../providers/FlightDataContext";
import { MapContainer, TileLayer, Polyline } from "react-leaflet"

import './Flight.css'

const FlightView = () => {
  
  const [fixes, setFixes] = useState([]);
  const [fixId, setFixId] = useState();

  useEffect(() => {
    axios
      .get(`https://localhost:44346/api/FlightLog/3`)
      .then((response) => {
        setFixes(response.data)
        console.log(response.data)
      })
  }, [fixId]);

  function renderFlights() {
    const array = ([]);
    fixes.map((item) => {
      array.push([item.latitude, item.longitude]);
    });
    console.log(array);
    return array;
  }

  const polyline = [
      renderFlights()
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
      </Container>
    </>
  )
}

export default FlightView;