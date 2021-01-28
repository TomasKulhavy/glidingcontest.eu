import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import { useHistory } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";

const PilotsList = (props) => {
    const history = useHistory();
    const [pilots, setPilots] = useState([]);

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