import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import { FlightDataContext, ADD_PILOTID } from "../../providers/FlightDataContext";
import Loading from "../Pages/Loading";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PilotsList = () => {
    const [pilots, setPilots] = useState([]);
    const [, dispatch] = useContext(FlightDataContext);
    const [loading, setLoading] = useState(false);
    const [desc, setDesc] = useState(false);

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

    function sendRequest(order)
    {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User?sort=${order}${
                desc ? `_desc` : `_asc`
              }`)
            .then((response) => {
                setPilots(response.data)
            })
            .then(() => {
                setLoading(false);
            })
    }

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
                    })} tag={Link} to={`/pilot/flights/${item.id}`}>
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
                                <th onClick={() => {sendRequest("name");setDesc(!desc);}}>Jméno<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("username");setDesc(!desc);}}>Uživatelské jméno<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
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