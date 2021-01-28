import React, { Component } from 'react';
import Layout from "./Layout/Layout";
import { Container, Card, CardHeader, CardBody, Row, Table } from "reactstrap";

const Home = () => {
  return (
    <>
      <Layout>
        <Container>
          <Row>
            <Card className="col-4 m-2 bg-dark text-light text-center">
              <CardHeader>
                Top piloti
              </CardHeader>
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