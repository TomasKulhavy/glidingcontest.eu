import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Card, Col, Alert, CardFooter, CardHeader } from "reactstrap";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faStopwatch, faTimes, faMinusCircle, faUserAlt, faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment-with-locales-es6';
import Loading from "../Pages/Loading";

const PilotFlights = (props) => {
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
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/pilotFlights/${props.match.params.id}/${year}`)
            .then((response) => {
                setFlights(response.data);
            })
            .then(() => {
                setLoading(false);
            });
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/pilotStats/${props.match.params.id}`)
            .then((response) => {
                setPilot(response.data);
                setFlightTime(response.data.timeInSec);
                if(!response.data)
                {
                    history.push("/pilot/list");
                    window.location.reload();
                }
            })
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/View/getYears/pilots/${props.match.params.id}`)
            .then((response) => {
                setYearsList(response.data)
            })
    }, [year, props.match.params.id]);

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    let user;
    let userName;
    if(accessToken !== null)
    {
        var tokenData = parseJwt(accessToken);
        user = tokenData.sub;
        userName = tokenData.given_name;
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

        if(state.pilotId === user || userName === "TomasLKLB")
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
                            })} tag={Link} to={`/flight/viewer/${item.id}`}>
                            Zobrazit let</Button></td>
                        <td>
                            <Button color="danger" refresh="true" onClick={() =>
                                deleteFlight(item.id, index)} tag={Link} to={`/pilot/flights/${props.match.params.id}`}>
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
                            })} tag={Link} to={`/flight/viewer/${item.id}`}>
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
                window.location.reload();
                history.push("/pilot/list");
            })   
        }
        
        if(userName === "TomasLKLB")
        {
            return(
                <CardFooter>
                    <tr>
                        <small className="font-size-xl mt-1" onClick={() => deleteUser()}><FontAwesomeIcon icon={faMinusCircle} className="font-size-l mr-3"/>Odstranit tento profil</small>
                    </tr>
                </CardFooter>
            )
        }
    }

    function renderPilotCard() {
        return(
            <>
                <Col lg="12" className="p-0">
                    <Card className="card-box bg-dark border-0 text-light mb-5">
                        <CardHeader className="text-center bg-dark text-white">
                                <h1><FontAwesomeIcon icon={faUserAlt} className="font-size-xxl mr-2" />{pilot.fullName}</h1>
                                <h5><FontAwesomeIcon icon={faStopwatch} className="mr-2" />{secondsToHms()}</h5>
                                <h5><FontAwesomeIcon icon={faRulerHorizontal} className="mr-2" />{Math.round(pilot.sumKilometers)} KM</h5>
                        </CardHeader>
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
                    {renderPilotCard()}
                    <Table borderless>
                            <tbody className="text-center">
                                {renderYears()}
                            </tbody>
                    </Table>
                    <Table className="bg-dark text-white table-responsive-sm" striped>
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
                        <tbody >
                            {renderFlights()}
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}

export default PilotFlights;