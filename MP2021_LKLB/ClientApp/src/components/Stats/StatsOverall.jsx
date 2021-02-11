import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Card, CardTitle, CardText, Row } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";

const StatsOverall = () => {


    return(
        <>
            <NavMenu />
            <Container>
                <Row>
                    <Card className="my-3 col-4" body inverse color="primary">
                        <CardTitle tag="h5">Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button color="secondary">Button</Button>
                    </Card>
                    <Card className="my-3 col-4" body inverse color="primary">
                        <CardTitle tag="h5">Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button color="secondary">Button</Button>
                    </Card>
                    <Card className="my-3 col-4" body inverse color="primary">
                        <CardTitle tag="h5">Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button color="secondary">Button</Button>
                    </Card>
                </Row>
            </Container>

        </>
    )
}

export default StatsOverall;