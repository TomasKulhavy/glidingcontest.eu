import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Card, CardBody, Col, Row, Alert, CardFooter } from "reactstrap";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faRulerVertical, faStopwatch, faUser, faTimes, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment-with-locales-es6';
import Loading from "../Pages/Loading";

const PilotFlights = () => {
    const yearNow = new Date().getFullYear();
    const [flights, setFlights] = useState([]);
    const [pilot, setPilot] = useState([]);
    const [flightTime, setFlightTime] = useState([]);
    const [state, dispatch] = useContext(FlightDataContext);
    const [{accessToken}] = useContext(FlightDataContext);
    const [yearsList, setYearsList] = useState([]);
    const [year, setYear] = useState(yearNow);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const history = createBrowserHistory();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/pilotFlights/${state.pilotId}/${year}`)
            .then((response) => {
                setFlights(response.data);
                console.log(response.data)
            }).
            then(() => {
                setLoading(false);
            });
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/pilotStats/${state.pilotId}`)
            .then((response) => {
                setPilot(response.data);
                setFlightTime(response.data.timeInSec);
                console.log(response.data)
            });
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/View/getYears/pilots/${state.pilotId}`)
            .then((response) => {
                setYearsList(response.data)
            })
    }, [year]);

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    let user;
    if(accessToken !== null)
    {
        var tokenData = parseJwt(accessToken);
        user = tokenData.sub;
    }

    function renderYears() {
        const rendered = yearsList.map((item) => {
            return (
                <Button className="mr-2 mt-1" key={item} color="primary" onClick={e => {setYear(item);}}>{item}</Button>
            );
        });
        return rendered;
    }

    const removeItem = (index) => {
        flights.splice(index, 1)
        setFlights([...flights])
    }

    function deleteFlight(deleteFlightNo, index)
    {
        setLoading(true)
        axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/api/FlightLog/${deleteFlightNo}`)
        .then(() => {
            removeItem(index);
            setLoading(false);
            setDone(true);
        })    
        return flights; 
    }

    function renderFlights() {
        moment.locale('cs'); 

        if(state.pilotId === user || user === "TomasLKLB")
        {
            const array = flights.map((item, index) => {
                return (
                  <tr key={item.id}>
                        <td>{moment(`${item.date}`).format('L')}</td>
                        <td>{Math.round(item.score)}</td>
                        <td>{Number((item.kilometers).toFixed(1))} km</td>
                        <td>{Number((item.avgSpeed).toFixed(1))} km/h</td>
                        <td>{item.gliderType}</td>
                        <td><Button color="primary" onClick={() =>
                            dispatch({
                                type: ADD_FLIGHTID,
                                currentFlightId: item.id
                            })} tag={Link} to="/flight/viewer">
                            Zobrazit let</Button></td>
                        <td>
                            <Button color="danger" refresh="true" onClick={() =>
                                deleteFlight(item.id, index)}>
                                <FontAwesomeIcon icon={faTimes} className="font-size-xl" />
                            </Button>
                        </td>
                  </tr> 
                );
            });
            return array;
        }
        else if(state.pilotId !== user)
        {
            const array = flights.map((item) => {
                return (
                  <tr key={item.id}>
                        <td>{moment(`${item.date}`).format('L')}</td>
                        <td>{Math.round(item.score)}</td>
                        <td>{Number((item.kilometers).toFixed(1))} km</td>
                        <td>{Number((item.avgSpeed).toFixed(1))} km/h</td>
                        <td>{item.gliderType}</td>
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

    function renderDeleteUser()
    {
        function deleteUser()
        {
            setLoading(true)
            axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/api/Account/delete/${state.pilotId}`)
            .then(() => {
                setLoading(false);
                history.push("/pilot/list")
            })    
            
        }
        if(user === "TomasLKLB")
        {
            return(
                <CardFooter>
                    <tr>
                        <small className="font-size-xl mt-1" onClick={() => deleteUser()}><FontAwesomeIcon icon={faMinusCircle} className="font-size-l mr-3" />Odstranit tento profil</small>
                    </tr>
                </CardFooter>
            )
        }
    }

    function renderPilotCard() {
        return(
            <>
                <Col lg="3">
                    <Card className="card-box bg-dark border-0 text-light mb-5">
                        <CardBody>
                            <div className="d-flex align-items-start">
                                <div className="font-weight-bold text-start">
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
                        {renderDeleteUser()}
                    </Card>
                </Col>    
            </>
        )
    }

    function renderAlert()
    {
        if(done)
        {
            return (
                <Alert color="success" isOpen={visible} toggle={onDismiss}>Let jsme úspěšně smazali</Alert>
            );
        }
    }

    if (loading) {
        return (
          <>
            <Loading />
          </>
        );
    }
    else if(flights)
    {
        return (
            <>
                <NavMenu />
                <Container>
                    {renderAlert()}
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
                                        <th>Body</th>
                                        <th>Vzdálenost</th>
                                        <th>Rychlost</th>
                                        <th>Typ kluzáku</th>
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
}

export default PilotFlights;