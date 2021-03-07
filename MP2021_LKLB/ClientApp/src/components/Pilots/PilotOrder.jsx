import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import Loading from "../Pages/Loading";

const PilotOrder = () => {
    const [pilots, setPilots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/order`)
            .then((response) => {
                setPilots(response.data);
            })
            .then(() => {
                setLoading(false);
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

    if (loading) {
        return (
          <>
            <Loading />
          </>
        );
    }
    else if (pilots)
    {
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
}

export default PilotOrder;