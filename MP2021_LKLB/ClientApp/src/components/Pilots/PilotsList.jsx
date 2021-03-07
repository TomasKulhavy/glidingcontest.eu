import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import { FlightDataContext, ADD_PILOTID } from "../../providers/FlightDataContext";
import Loading from "../Pages/Loading";

const PilotsList = () => {
    const [pilots, setPilots] = useState([]);
    const [state, dispatch] = useContext(FlightDataContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User`)
            .then((response) => {
                setPilots(response.data);
            })
            .then(() => {
                setLoading(false);
            });
    }, []);

    function renderUsers() {
        const array = pilots.map((item) => {
          return (
            <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.userName}</td>
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

    if (loading) {
        return (
          <>
            <Loading />
          </>
        );
    }
    else if(pilots)
    {
        return (
            <>
                <NavMenu />
                <Container>
                    <Table className="bg-dark text-white" striped>
                        <thead>
                            <tr>
                                <th>Jméno</th>
                                <th>Uživatelské jméno</th>
                                <th></th>
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

export default PilotsList;