import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Card, CardBody, Col, Row } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faRulerVertical, faStopwatch, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";

const PilotFlights = () => {
    const history = useHistory();
    const [flights, setFlights] = useState([]);
    const [pilot, setPilot] = useState([]);
    const [loggedPilot, setLoggedPilot] = useState("");
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
        axios
            .get(`https://localhost:44346/api/User/pilot`)
            .then((response) => {
                setLoggedPilot(response.data);
                console.log(response.data);
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

    function deleteFlight(deleteFlightNo)
    {
        axios
        .delete(`https://localhost:44346/api/FlightLog/${deleteFlightNo}`)
        .then((response) => {
            setFlights(response.data)
            console.log(response.data);
        })    
        return flights; 
    }

    function renderFlights() {
        if(state.pilotId === loggedPilot)
        {
            const array = flights.map((item) => {
                return (
                  <tr key={item.id}>
                        <td>{item.date}
                        </td>
                        <td>{item.gliderType}</td>
                        <td>{item.registration}</td>
                        <td><Button color="primary" onClick={() =>
                            dispatch({
                                type: ADD_FLIGHTID,
                                currentFlightId: item.id
                            })} tag={Link} to="/flight/viewer">
                            Zobrazit let</Button></td>
                        <td>
                            <Button color="danger" refresh="true" onClick={() =>
                                deleteFlight(item.id)}>
                                <FontAwesomeIcon icon={faTimes} className="font-size-xl" />
                            </Button>
                        </td>
                  </tr> 
                );
            });
            return array;
        }
        else if(state.pilotId !== loggedPilot)
        {
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
                        <td></td>
                  </tr> 
                );
            });
            return array;
        }
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
            <>
                <Col lg="3">
                    <Card className="card-box bg-dark border-0 text-light mb-5">
                        <CardBody>
                            <div className="d-flex align-items-start">
                                <div className="font-weight-bold">
                                    <small className="text-white-70 d-block mb-1 text-uppercase">{pilot.fullName}</small>
                                    <tr>
                                        <span className="font-size-xl mt-1"><FontAwesomeIcon icon={faStopwatch} className="font-size-l mr-3" />{secondsToHms()}</span>
                                    </tr>
                                    <tr>
                                        <span className="font-size-xl mt-1"><FontAwesomeIcon icon={faRulerVertical} className="font-size-l mr-3" />{Math.round(pilot.sumKilometers)} KM</span>
                                    </tr>
                                </div>
                                <div className="ml-auto">
                                    <div className="text-center mb-1">
                                        <FontAwesomeIcon icon={faUser} className="font-size-xl" />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>    
            </>
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
                    <Table className="bg-dark text-white" striped>
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Typ kluzáku</th>
                                <th>Registrace</th>
                                <th></th>
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