import React, { useState, useEffect, useContext } from "react";
import { Container, Table } from "reactstrap";
import { useHistory } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import { FlightDataContext } from "../../providers/FlightDataContext";
import axios from "axios";

const PilotFlights = () => {
    const history = useHistory();
    const [flights, setFlights] = useState([]);
    const [state, dispatch] = useContext(FlightDataContext);
    console.log(state.pilotId);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/User/pilotFlights/${state.pilotId})`)
            .then((response) => {
                setFlights(response.data);
                console.log(response.data);
            });
    }, []);

    function renderFlights() {
        const array = flights.map((item) => {
          return (
            <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.gliderType}</td>
                <td>{item.registration}</td>
            </tr> 
          );
        });
        return array;
    }

    return (
        <>
            <NavMenu />
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Typ kluzáku</th>
                            <th>Registrace</th>
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