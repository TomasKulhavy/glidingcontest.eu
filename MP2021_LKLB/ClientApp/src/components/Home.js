import React, { useState, useEffect } from 'react';
import axios from "axios";
import Layout from "./Layout/Layout";
import { Container, Card, CardHeader, CardBody, Row, Table } from "reactstrap";

const Home = () => {
  const [top, setTop] = useState([]);

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

  return (
    <>
      <Layout>
        <Container>
          <Row>
            <Card className="col-4 m-2 bg-dark text-light text-center">
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
                <iframe src="https://glideandseek.com/?viewport=50.75235,15.18841,10" allow="geolocation" width={600} height={350}>
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