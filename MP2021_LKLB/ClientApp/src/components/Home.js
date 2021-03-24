import React, { useState, useEffect } from 'react';
import axios from "axios";
import Layout from "./Layout/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, CardBody, Row, Table, Col } from "reactstrap";
import { faStopwatch, faMapMarkedAlt, faSortAmountDown, faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import Loading from "./Pages/Loading";

const Home = () => {
  const [top, setTop] = useState([]);
  const [topHours, setTopHours] = useState([]);
  const [topKm, setTopKm] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/User`)
      .then((response) => {
        setTop(response.data);
      })
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/hours`)
      .then((response) => {
        setTopHours(response.data);
      })
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/kilometers`)
      .then((response) => {
        setTopKm(response.data);
      })
      .then(() => {
        setLoading(false);
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

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  else if (topKm) {
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
            <Row className="bg-dark d-flex justify-content-center align-items-center" style={{ height: "75px" }}>
              <div className="">
                <h5 className="font-weight-bold text-white d-block mb-1 text-uppercase"><FontAwesomeIcon icon={faMapMarkedAlt} className="font-size-xl mr-3" />Kde se právě létá?</h5>
              </div>
            </Row>
            <Row className="bg-dark">
              <iframe title="glideandseek" src="https://glideandseek.com/?viewport=50.75235,15.18841,10" allow="geolocation" style={{ width: "100%" }} height={400}></iframe>
            </Row>
          </div>
        </Layout>
      </>
    );
  }
}

export default Home;