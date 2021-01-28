import React, { Component, useState } from 'react';
import axios from "axios";
import {Map, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Button, Row} from "reactstrap";

export class MapContainer extends Component {
  getData() {
    axios.get('https://localhost:44346/api/Flights/1').then(resp => {
      console.log(resp.data);
    this.getPosition(resp.data);
  })};

  getPosition(data) {
    data.map((item, index) => ({lat: item[index].lat, lgn: item[index].lng}))
  }
  

  render = () => {
    
    const triangleCoords = [
      { 
        "lat": 52.5200066,
        "lng": 13.404954,
      },
      { 
        "lat": 50.1109221,
        "lng": 8.6821267,
      },
    ]
  
    return(
      <>
          
          <Button onClick={() => this.getData()}>GetFlight</Button>

      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDhiu-vFefDBsFMfjizWggjiLmf_2n5iMc")
})(MapContainer)