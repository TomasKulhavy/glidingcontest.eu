import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Card, CardTitle, CardText, Row } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";

const StatsOverall = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/Statistics`)
            .then((response) => {
                setStats(response.data);
                console.log(response.data);
            });
    }, []);

    return(
        <>
            <NavMenu />
            <Container>
                <Row>
                    <Card className="my-3 col-4" body inverse color="dark">
                        <CardTitle tag="h5">Počet letů</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button color="secondary">Button</Button>
                    </Card>
                    <Card className="my-3 col-4" body inverse color="dark">
                        <CardTitle tag="h5">Počet hodin</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button color="secondary">Button</Button>
                    </Card>
                    <Card className="my-3 col-4" body inverse color="dark">
                        <CardTitle tag="h5">Počet kilometrů</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button color="secondary">Button</Button>
                    </Card>
                </Row>
            </Container>

        </>
    )
}

export default StatsOverall;