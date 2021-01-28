import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";

const FlightList = (props) => {
    const history = useHistory();
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/FlightLog`)
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
                <td>{item.pilot}</td>
                <td>{item.gliderType}</td>
                <td><Button color="primary">Zobrazit let</Button></td>
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
                  <Button color="primary">{item}</Button>
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
                <Table striped>
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