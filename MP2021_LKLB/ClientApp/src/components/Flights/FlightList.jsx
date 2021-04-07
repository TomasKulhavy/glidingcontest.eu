import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import moment from 'moment-with-locales-es6';
import Loading from "../Pages/Loading";

import './Flight.css';

const FlightList = () => {
    const [yearsList, setYearsList] = useState([]);
    const yearNow = new Date().getFullYear();
    const [flights, setFlights] = useState([]);
    const [year, setYear] = useState(yearNow);
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useContext(FlightDataContext);
    const [desc, setDesc] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/View/getYears/list`)
            .then((response) => {
                setYearsList(response.data)
            })
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/FlightLog/${year}`)
            .then((response) => {
                setFlights(response.data)
            })
            .then(() => {
                setLoading(false);
            })  
    }, [year]);

    function sendRequest(order)
    {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/FlightLog/${year}?sort=${order}${
                desc ? `_desc` : `_asc`
              }`)
            .then((response) => {
                setFlights(response.data)
            })
            .then(() => {
                setLoading(false);
            })
    }

    function renderFlights() {
        moment.locale('cs'); 
        const array = flights.map((item) => {
          return (
            <tr key={item.id}>
                <td>{moment(`${item.date}`).format('L')}</td>
                <td>{Math.round(item.score)}</td>
                <td>{item.userName}</td>
                <td>{Number((item.kilometers).toFixed(1))} km</td>
                <td>{Number((item.avgSpeed).toFixed(1))} km/h</td>
                <td>{item.gliderType}</td>
                <td><Button color="primary" onClick={() =>
                    dispatch({
                        type: ADD_FLIGHTID,
                        currentFlightId: item.id
                    })} tag={Link} to={`/flight/viewer/${item.id}`}>
                    Zobrazit let</Button>
                </td>
            </tr> 
          );
        });
        return array;
    }

    function renderYears() {
        const rendered = yearsList.map((item) => {
            return (
                <Button className="mr-2 mt-1" key={item} color="primary" onClick={e => {setYear(item);}}>{item}</Button>
            );
        });
        return rendered;
    }

    if (loading) {
        return (
          <>
            <Loading />
          </>
        );
    }
    else if (flights)
    {
        return (
            <>
                <NavMenu />
                <Container>
                    <Table borderless>
                            <tbody className="text-center">
                                {renderYears()}
                            </tbody>
                    </Table>
                    <Table className="bg-dark text-white table-responsive-sm" striped>
                        <thead>
                            <tr>
                                <th onClick={() => {sendRequest("date");setDesc(!desc);}}>Datum<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("score");setDesc(!desc);}}>Body<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("name");setDesc(!desc);}}>Jméno pilota<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("lenght");setDesc(!desc);}}>Vzdálenost<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("speed");setDesc(!desc);}}>Rychlost<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("type");setDesc(!desc);}}>Typ kluzáku<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
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

export default FlightList;