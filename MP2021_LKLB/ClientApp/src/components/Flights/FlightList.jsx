import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FlightList = () => {
    const history = useHistory();
    const [flights, setFlights] = useState([]);
    const [year, setYear] = useState(2021);
    const [state, dispatch] = useContext(FlightDataContext);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/FlightLog/${year}`)
            .then((response) => {
                setFlights(response.data)
                console.log(response.data);
            })
    }, [year]);

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
        const array = flights.map((item) => {
          return (
            <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.userId}</td>
                <td>{item.gliderType}</td>
                <td><Button color="primary" onClick={() =>
                    dispatch({
                        type: ADD_FLIGHTID,
                        currentFlightId: item.id
                    })} tag={Link} to="/flight/viewer">
                    Zobrazit let</Button>
                </td>
                <td>
                    <Button color="danger" refresh="true" onClick={() =>
                        deleteFlight(item.id)}>
                    <FontAwesomeIcon icon={faTimes} className="font-size-xl" /></Button>
                </td>
            </tr> 
          );
        });
        return array;
    }

    function renderYears() {
        const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
        const array = years.map((item) => {
            return (
              <td key={item}>
                  <Button color="primary" onClick={e => {setYear(item);}}>{item}</Button>
              </td> 
            );
          });
        return array;
    }

    return (
        <>
            <NavMenu />
            <Container>
                <Table borderless>
                        <tbody>
                            {renderYears()}
                        </tbody>
                </Table>
                <Table className="bg-light" striped>
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

export default FlightList;