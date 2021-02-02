import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext, ADD_FLIGHTID } from "../../providers/FlightDataContext";
import axios from "axios";

const PilotFlights = () => {
    const history = useHistory();
    const [flights, setFlights] = useState([]);
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
    }, [year]);

    function renderYears() {
        const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
        const array = years.map((item) => {
            return (
              <td key={item}>
                  <Button color="primary" onClick={e => {setYear(item);}}>{item}</Button>
              </td> 
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

    return (
        <>
            <NavMenu />
            <Container>
                <Table borderless>
                        <tbody>
                            {renderYears()}
                        </tbody>
                </Table>
                <Table striped>
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
            </Container>
        </>
    )
}

export default PilotFlights;