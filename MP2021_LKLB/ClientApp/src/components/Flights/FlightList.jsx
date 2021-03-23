import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
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
                                <th>Datum</th>
                                <th>Body</th>
                                <th>Jméno pilota</th>
                                <th>Vzdálenost</th>
                                <th>Rychlost</th>
                                <th>Typ kluzáku</th>
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