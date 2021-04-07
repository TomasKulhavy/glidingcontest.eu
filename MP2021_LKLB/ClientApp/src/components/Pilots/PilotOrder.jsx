import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import Loading from "../Pages/Loading";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PilotOrder = () => {
    const [pilots, setPilots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [desc, setDesc] = useState(false);


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

    function sendRequest(order)
    {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/User/order?sort=${order}${
                desc ? `_desc` : `_asc`
              }`)
            .then((response) => {
                setPilots(response.data)
            })
            .then(() => {
                setLoading(false);
            })
    }

    function secondsToHms(time) {
        var d = Number(time);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
    
        var hDisplay = h > 0 ? h + ":" : "";
        var mDisplay = m > 9 ? m : "0" + m;
        return hDisplay + mDisplay; 
    }

    function renderUsers() {
        const array = pilots.map((item, index) => {
          return (
            <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{Math.round(item.topScore)}</td>
                <td>{Math.round(item.sumKilometers)}</td>
                <td>{secondsToHms(item.timeInSec)}</td>
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
                                <th onClick={() => {sendRequest("score");setDesc(!desc);}}>Body<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("kilometers");setDesc(!desc);}}>Kilometry<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("hours");setDesc(!desc);}}>Hodiny<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
                                <th onClick={() => {sendRequest("name");setDesc(!desc);}}>Jméno<Button color="transparent" size="sm" ><FontAwesomeIcon icon={faSort} color="white" /></Button></th>
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