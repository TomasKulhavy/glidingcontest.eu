import React, { useState, useEffect } from 'react';
import axios from "axios";
import Layout from "./Layout/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, CardHeader, CardBody, CardText, CardTitle, Row, Table, Button } from "reactstrap";
import { faTemperatureHigh, faTachometerAlt, faWind, faCloud, faPercentage } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const [top, setTop] = useState([]);
  const [temp, setTemp] = useState();
  const [pressure, setPressure] = useState();
  const [humidity, setHumidity] = useState();
  const [clouds, setClouds] = useState();
  const [windDeg, setWindDeg] = useState();
  const [windSp, setWindSp] = useState();

  useEffect(() => {
    axios
        .post(`https://localhost:44346/api/User`)
        .then((response) => {
            setTop(response.data);
            console.log(response.data);
        })
  }, []);

  function renderTop() {
    const array = top.map((item, index) => {
      return (
        <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.topScore}</td>
            <td>{item.fullName}</td>
        </tr> 
      );
    });
    return array;
  }

  function renderWeather() {
    var options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {q: 'Liberec', lat: '504606', lon: '150130', units: 'metric', mode: 'json'},
      headers: {
        'x-rapidapi-key': 'b8864890b5msh1068a5a50ca5735p1cdac3jsnec0b6e055f2a',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setTemp(response.data.main.temp);
      setPressure(response.data.main.pressure);
      setHumidity(response.data.main.humidity);
      setClouds(response.data.weather[0].description);
      setWindDeg(response.data.wind.deg);
      setWindSp(response.data.wind.speed);
    }).catch(function (error) {
      console.error(error);
    });
    return(
      <>
        <Card className="my-3" body inverse color="dark">
          <CardTitle tag="h5">Počasí na letišti Liberec</CardTitle>
          <CardText>
            <FontAwesomeIcon className="mr-3" icon={faTemperatureHigh} /> <b className="mr-3">{temp}°C</b>
            <FontAwesomeIcon className="mr-3" icon={faTachometerAlt} /> <b className="mr-3">{pressure} hPa</b>
            <FontAwesomeIcon className="mr-3" icon={faPercentage} /> <b className="mr-3">{humidity} %</b>
            <FontAwesomeIcon className="mr-3" icon={faCloud} /> <b className="mr-3">{clouds}</b>
            <FontAwesomeIcon className="mr-3" icon={faWind} /> <b className="mr-3">{windDeg}°/{windSp} m/s</b>
          </CardText>
          <Button color="secondary" href="http://www.aeroklubliberec.cz/" target="blank">Aeroklub Liberec</Button>
        </Card>
      </>
    )
  }

  return (
    <>
      <Layout>
        <Container>
          {renderWeather()}
          <Row>
            <Card className="col-4 col-sm m-2 bg-dark text-light text-center">
              <CardHeader>
                Top piloti
              </CardHeader>
              <CardBody>
                <Table className="text-light">
                  <tbody>
                    {renderTop()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Card className="text-center m-2">
              <CardHeader className="bg-dark text-light">Kde se právě lítá?</CardHeader>
              <CardBody style={{padding: '0%'}}>
                <iframe src="https://glideandseek.com/?viewport=50.75235,15.18841,10" allow="geolocation" width={700} height={350}>
                </iframe>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
    
export default Home;