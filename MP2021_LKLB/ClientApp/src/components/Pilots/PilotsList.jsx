import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import { FlightDataContext, ADD_PILOTID } from "../../providers/FlightDataContext";

const PilotsList = () => {
    const history = useHistory();
    const [pilots, setPilots] = useState([]);
    const [state, dispatch] = useContext(FlightDataContext);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/User`)
            .then((response) => {
                setPilots(response.data);
                console.log(response.data);
            });
    }, []);

    function renderUsers() {
        const array = pilots.map((item) => {
          return (
            <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td><Button color="primary" onClick={() =>
                    dispatch({
                        type: ADD_PILOTID,
                        pilotId: item.id
                    })} tag={Link} to="/pilot/flights">
                Lety pilota</Button></td>
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
                            <th>Jméno</th>
                            <th>Uživatelské jméno</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUsers()}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default PilotsList;