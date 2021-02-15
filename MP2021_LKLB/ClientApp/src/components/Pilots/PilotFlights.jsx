import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Card, CardBody, CardHeader, Row } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import axios from "axios";

const PilotFlights = () => {
    const history = useHistory();
    const [flights, setFlights] = useState([]);
    const [pilot, setPilot] = useState([]);
    const [flightTime, setFlightTime] = useState([]);
    const [state, dispatch] = useContext(FlightDataContext);
    const [year, setYear] = useState(2021);
    console.log(state.pilotId);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/User/pilotFlights/${state.pilotId}/${year}`)
            .then((response) => {
                setFlights(response.data);
                console.log(response.data);
            });
        axios
            .get(`https://localhost:44346/api/User/pilotStats/${state.pilotId}`)
            .then((response) => {
                setPilot(response.data);
                console.log(response.data)
                setFlightTime(response.data.timeInSec);
            });
    }, [year]);

    function renderYears() {
        const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
        const array = years.map((item) => {
            return (
                <Button className="mr-1" key={item} color="primary" onClick={e => {setYear(item);}}>{item}</Button>
            );
          });
          console.log(year);
        return array;
    }

    function renderFlights() {
        const array = flights.map((item) => {
          return (
            <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.gliderType}</td>
                <td>{item.registration}</td>
                <td><Button color="primary" onClick={() =>
                    dispatch({
                        type: ADD_FLIGHTID,
                        currentFlightId: item.id
                    })} tag={Link} to="/flight/viewer">
                Zobrazit let</Button></td>
            </tr> 
          );
        });
        return array;
    }

    function secondsToHms() {
        var d = Number(flightTime);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
    
        var hDisplay = h > 0 ? h + ":" : "";
        var mDisplay = m > 9 ? m : "0" + m;
        return hDisplay + mDisplay; 
      }

    function renderPilotCard() {
        return(
            <Card className="mr-3">
                <CardHeader>
                    {pilot.fullName}
                </CardHeader>
                <CardBody>
                    <tr>
                        <b>Nálet hodin: </b> {secondsToHms()}
                    </tr>
                    <tr>
                        <b>Nálet kilometrů: </b> {Math.round(pilot.sumKilometers)} KM
                    </tr>
                </CardBody>
            </Card>
        )
    }

    return (
        <>
            <NavMenu />
            <Container>
                <Row>
                {renderPilotCard()}
                <div className="">
                    <Table borderless>
                            <tbody className="">
                                {renderYears()}
                            </tbody>
                    </Table>
                    <Table className="bg-light" striped>
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Typ kluzáku</th>
                                <th>Registrace</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderFlights()}
                        </tbody>
                    </Table>
                </div>
                </Row>
            </Container>
        </>
    )
}

export default PilotFlights;