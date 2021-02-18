import React, { useState, useEffect } from 'react';
import axios from "axios";
import Layout from "./Layout/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, CardBody, CardText, CardTitle, Row, Table, Button, Col } from "reactstrap";
import { faTemperatureHigh, faTachometerAlt, faWind, faCloud, faPercentage, faStopwatch, faMapMarkedAlt, faSortAmountDown, faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const [top, setTop] = useState([]);
  const [topHours, setTopHours] = useState([]);
  const [topKm, setTopKm] = useState([]);
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
    axios
        .get(`https://localhost:44346/api/User/hours`)
        .then((response) => {
            setTopHours(response.data);
            console.log(response.data);
        })
      axios
        .get(`https://localhost:44346/api/User/kilometers`)
        .then((response) => {
            setTopKm(response.data);
            console.log(response.data);
        })
  }, []);

  function renderTop() {
    const array = top.map((item, index) => {
      return (
        <tr key={item.id}>
            <td>{index + 1}.</td>
            <td>{Math.round(item.topScore)}</td>
            <td>{item.fullName}</td>
        </tr> 
      );
    });
    return array;
  }

  function renderTopHours() {
    const array = topHours.map((item, index) => {
      return (
        <tr key={item.id}>
            <td>{index + 1}.</td>
            <td>{renderTime(item.timeInSec)}</td>
            <td>{item.fullName}</td>
        </tr> 
      );
    });
    return array;
  }

  function renderTopKm() {
    const array = topKm.map((item, index) => {
      return (
        <tr key={item.id}>
            <td>{index + 1}.</td>
            <td>{Math.round(item.sumKilometers)} KM</td>
            <td>{item.fullName}</td>
        </tr> 
      );
    });
    return array;
  }

  function renderTime(dataToCalc) {
    var d = Number(dataToCalc);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 9 ? m : "0" + m;
    return hDisplay + mDisplay; 
  }

  function renderWeather() {
    var options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: 'Liberec,cz',
        lang: 'en',
        units: 'metric'
      },
      headers: {
        'x-rapidapi-key': '1f7fc5207fmshaa1355de5f292f1p1324f6jsn796de1e54877',
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
        <Card style={{backgroundColor: '#172b4d'}} className="my-3" body inverse color="dark">
          <CardTitle tag="h5" className="text-white-70 d-block mb-1 text-uppercase">Počasí na letišti Liberec</CardTitle>
          <CardText>
            <FontAwesomeIcon className="mr-1" icon={faTemperatureHigh} /> <b className="mr-3">{temp}°C</b>
            <FontAwesomeIcon className="mr-1" icon={faTachometerAlt} /> <b className="mr-3">{pressure} hPa</b>
            <FontAwesomeIcon className="mr-1" icon={faPercentage} /> <b className="mr-3">{humidity} %</b>
            <FontAwesomeIcon className="mr-1" icon={faCloud} /> <b className="mr-3">{clouds}</b>
            <FontAwesomeIcon className="mr-1" icon={faWind} /> <b className="mr-3">{windDeg}°/{windSp} m/s</b>
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
          <Row className="mb-3">
            <Col lg="4">
              <Card className="card-box bg-dark border-0 text-light mb-5">
                <CardBody>
                  <div className="d-flex align-items-start">
                      <div className="font-weight-bold">
                          <small className="text-white-70 d-block mb-1 text-uppercase">Top piloti (podle bodů)</small>
                      </div>
                      <div className="ml-auto">
                          <div className="text-center mb-1">
                              <FontAwesomeIcon icon={faSortAmountDown} className="font-size-xl" />
                          </div>
                      </div>
                  </div>
                  <Table className="text-light">
                    <tbody>
                      {renderTop()}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>    
            <Col lg="4">
              <Card className="card-box bg-dark border-0 text-light mb-5">
                <CardBody>
                  <div className="d-flex align-items-start">
                      <div className="font-weight-bold">
                          <small className="text-white-70 d-block mb-1 text-uppercase">Top piloti (podle hodin)</small>
                      </div>
                      <div className="ml-auto">
                          <div className="text-center mb-1">
                              <FontAwesomeIcon icon={faStopwatch} className="font-size-xl" />
                          </div>
                      </div>
                  </div>
                  <Table className="text-light">
                    <tbody>
                      {renderTopHours()}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col> 
            <Col lg="4">
              <Card className="card-box bg-dark border-0 text-light mb-5">
                <CardBody>
                  <div className="d-flex align-items-start">
                      <div className="font-weight-bold">
                          <small className="text-white-70 d-block mb-1 text-uppercase">Top piloti (podle km)</small>
                      </div>
                      <div className="ml-auto">
                          <div className="text-center mb-1">
                              <FontAwesomeIcon icon={faRulerHorizontal} className="font-size-xl" />
                          </div>
                      </div>
                  </div>
                  <Table className="text-light">
                    <tbody>
                      {renderTopKm()}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>         
          </Row>
        </Container>
        <div className="container-fluid">
          <Row className="bg-dark d-flex justify-content-center align-items-center" style={{height: "75px"}}>
            <div className="">
              <h5 className="font-weight-bold text-white d-block mb-1 text-uppercase"><FontAwesomeIcon icon={faMapMarkedAlt} className="font-size-xl mr-3" />Kde se právě létá?</h5>
            </div>
          </Row>
          <Row className="bg-dark">
            <iframe src="https://glideandseek.com/?viewport=50.75235,15.18841,10" allow="geolocation" style={{width: "100%"}} height={400}></iframe>
          </Row>
        </div>
      </Layout>
    </>
  );
}
    
export default Home;