import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import axios from "axios";
import moment from 'moment-with-locales-es6';
import Loading from "../Pages/Loading";

const FlightList = () => {
    const yearNow = new Date().getFullYear();
    const [flights, setFlights] = useState([]);
    const [year, setYear] = useState(yearNow);
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useContext(FlightDataContext);

    useEffect(() => {
        setLoading(true);
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
                <td>{item.userId}</td>
                <td>{item.gliderType}</td>
                <td><Button color="primary" onClick={() =>
                    dispatch({
                        type: ADD_FLIGHTID,
                        currentFlightId: item.id
                    })} tag={Link} to="/flight/viewer">
                    Zobrazit let</Button>
                </td>
            </tr> 
          );
        });
        return array;
    }

    function renderYears() {
        const array = [];
        for (let index = 2010; index <= yearNow; index++) {
            array.push(index);
        }
        const rendered = array.map((item) => {
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
                            <tbody>
                                {renderYears()}
                            </tbody>
                    </Table>
                    <Table className="bg-dark text-white" striped>
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Jméno pilota</th>
                                <th>Typ kluzáku</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderFlights()}
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}

export default FlightList;