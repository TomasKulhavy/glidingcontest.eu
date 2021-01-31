import React, { Component } from 'react';
import axios from "axios";
import { Card, Input, CardTitle, Button } from "reactstrap";
import IGCParser from "igc-parser";
import { solver, scoringRules as scoring } from "igc-xc-score";
import { getSpeed, convertSpeed, getDistance } from 'geolib';
import NavMenu from "../Layout/NavMenu";

import './Flight.css'

class UploadFlight extends Component {
    copyMultidimensionalArray(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            let output = document.getElementById('output');
            output.textContent = reader.result;
            // Rozparsování souboru
            let result = IGCParser.parse(reader.result);

            // Scorování letu
            const flight = solver(result, scoring.XContest).next().value;
            delete result.closestPairs;
            delete result.filtred;
            delete result.ll;
            //delete result.furthestPoints;
            delete result.flightPoints;
            delete result.filtered; 

            // Flight time
            var firstFix = result.fixes[0].time;
            var lastFix = result.fixes[result.fixes.length-1].time;

            var first = firstFix;
            var second = lastFix;
            var a = first.split(':');
            var b = second.split(':');
            var timeone = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
            var timetwo = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]); 
            var totalTimeInSec = timetwo - timeone;
            //var sec = Math.floor((totalTimeInMiliSec/1000) % 60);
            var time = new Date(totalTimeInSec * 1000).toISOString().substr(11, 8)
            //console.log(time);

            // Pridani analyse do json
            const scoreFlight = { 
                "score": flight.score,
                "flightTime": time,
                "furthestPoints": flight.furthestPoints
            }
            //const userId = ("TOMAS123")
            result.flightLogAnalyse = scoreFlight;
            //result.userId = userId;
            
            let tisk = JSON.stringify(result);
            this.sendFile(tisk);
            this.calculateDistance(result, totalTimeInSec);
        };
        reader.readAsText(e.target.files[0])
    }

    sendFile(data) {
        axios.post('https://localhost:44346/api/FlightLog', { payload: data });
    }
    //TODO
    calculateDistance(result, totalTimeInSec) {
        var dis1 = getDistance(
            { latitude: result.task.points[1].latitude, longitude: result.task.points[1].longitude },
            { latitude: result.task.points[2].latitude, longitude: result.task.points[2].longitude },
        )
        var dis2 = getDistance(
            { latitude: result.task.points[2].latitude, longitude: result.task.points[2].longitude },
            { latitude: result.task.points[3].latitude, longitude: result.task.points[3].longitude },
        )
        var dis3 = getDistance(
            { latitude: result.task.points[3].latitude, longitude: result.task.points[3].longitude },
            { latitude: result.task.points[4].latitude, longitude: result.task.points[4].longitude },
        )

        var dis = dis1 + dis2 + dis3;
        var speedTotal = (dis) / totalTimeInSec;
        console.log(speedTotal*3.6);
        console.log(
          `Distance\n${dis / 1000} KM`
        );
    };

    render = () => {
        return (
            <>
                <NavMenu />
                <div className="Flight container h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-md-6 .offset-md-3 mx-auto d-flex justify-content-center">
                            <Card className="" body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardTitle tag="h5">Nahraj svůj let</CardTitle>
                                <Input className="my-2" type="file" accept=".igc" onChange={(e) => this.showFile(e)} />
                                <Button className="my-2" onClick={() => this.sendFile()}>Odeslat</Button>
                            </Card>
                        </div>
                    </div>
                </div>
                <pre className="Output" id='output'>
                </pre>
            </>
        )
    }
}
export default UploadFlight;