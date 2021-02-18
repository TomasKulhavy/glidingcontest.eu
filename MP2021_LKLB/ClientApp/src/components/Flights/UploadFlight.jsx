import React, { Component } from 'react';
import axios from "axios";
import { Card, Input, Alert, Button } from "reactstrap";
import IGCParser from "igc-parser";
import { solver, scoringRules as scoring } from "igc-xc-score";
import { getDistance, getSpeed } from 'geolib';
import NavMenu from "../Layout/NavMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareSquare } from "@fortawesome/free-solid-svg-icons";

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
            this.calculateDistance(result);
            let tisk = JSON.stringify(result);
            this.sendFile(tisk);
        };
        reader.readAsText(e.target.files[0])
    }

    sendFile(data) {
        axios.post('https://localhost:44346/api/FlightLog', { payload: data })
        .catch(err => { console.log(err); this.renderAlert(err) });
    }

    calculateDistance(result) {
        var dist = 0;

        for (let index = 1; index < result.task.points.length - 2; index++) {
            var distT = getDistance(
                { latitude: result.task.points[index].latitude, longitude: result.task.points[index].longitude },
                { latitude: result.task.points[index + 1].latitude, longitude: result.task.points[index + 1].longitude },
            )
            console.log(distT);
            dist = dist + distT;
        }

        console.log(dist);

        const flight = solver(result, scoring.XContest).next().value;
        delete result.closestPairs;
        delete result.filtred;
        delete result.ll;
        delete result.furthestPoints;
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
        var time = new Date(totalTimeInSec * 1000).toISOString().substr(11, 8);

        var speedTotal = (dist) / totalTimeInSec;

        const scoreFlight = { 
            "score": flight.score + speedTotal*3.6,
            "flightTime": time,
            "kilometers": dist / 1000,
            "avgSpeed": speedTotal*3.6,
        }
        result.flightLogAnalyse = scoreFlight;

        console.log(result);
    };

    renderAlert(err)
    {
        if(err != null)
        {
            const array = "Tento let je již nahraný v naší databázi!";
            return array;
        }
    }

    render = () => {
        return (
            <>
                <NavMenu />
                <div className="Flight container h-100"> 
                    <div className="row align-items-center h-100">
                        <div className="col-md-6 .offset-md-3 mx-auto d-flex justify-content-center">
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <div className="d-flex align-items-start">
                                    <div className="font-weight-bold">
                                        <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Nahraj svůj let</small>
                                        <span className="font-size-xxl mt-1">{this.renderAlert()}</span>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="text-center">
                                            <FontAwesomeIcon icon={faUpload} className="font-size-xl" />
                                        </div>
                                    </div>
                                </div>
                                <Input className="my-2" type="file" accept=".igc" onChange={(e) => this.showFile(e)} />
                                <Button className="my-2" onClick={() => this.sendFile()}>
                                    <FontAwesomeIcon icon={faShareSquare} className="font-size-xl mr-1" />
                                    Odeslat
                                </Button>
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