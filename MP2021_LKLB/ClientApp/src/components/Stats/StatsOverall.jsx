import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Card, CardTitle, CardText, Row } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";

const StatsOverall = () => {
    const [flightsNo, setFlightsNo] = useState();
    const [time, setTime] = useState();
    const [km, setKm] = useState();

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/Statistics`)
            .then((response) => {
                setFlightsNo(response.data.flightsNo);
                setTime(response.data.timeInSeconds);
                setKm(response.data.kilometers);
                console.log(response.data);
            });
    }, []);

    function renderTime() {
        var d = Number(time);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
    
        var hDisplay = h > 0 ? h + ":" : "";
        var mDisplay = m > 9 ? m : "0" + m;
        return hDisplay + mDisplay; 
    }

    return(
        <>
            <NavMenu />
            <Container>
                <Row>
                    <Card className="my-3 col-4" body inverse color="dark">
                        <CardTitle tag="h5">Počet letů</CardTitle>
                        <CardText>{flightsNo}</CardText>
                    </Card>
                    <Card className="my-3 col-4" body inverse color="dark">
                        <CardTitle tag="h5">Počet hodin</CardTitle>
                        <CardText>{renderTime()}</CardText>
                    </Card>
                    <Card className="my-3 col-4" body inverse color="dark">
                        <CardTitle tag="h5">Počet kilometrů</CardTitle>
                        <CardText>{Math.round(km)} KM</CardText>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default StatsOverall;