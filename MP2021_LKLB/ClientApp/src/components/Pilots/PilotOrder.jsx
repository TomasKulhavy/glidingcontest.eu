import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";

const PilotOrder = () => {
    const [pilots, setPilots] = useState([]);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/User/order`)
            .then((response) => {
                setPilots(response.data);
                console.log(response.data);
            });
    }, []);

    function renderUsers() {
        const array = pilots.map((item, index) => {
          return (
            <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{Math.round(item.topScore)}</td>
                <td>{item.fullName}</td>
            </tr> 
          );
        });
        array.sort(array.topScore);
        return array;
    }

    return (
        <>
            <NavMenu />
            <Container>
                <Table className="bg-dark text-white" striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Body</th>
                            <th>Jméno</th>
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

export default PilotOrder;