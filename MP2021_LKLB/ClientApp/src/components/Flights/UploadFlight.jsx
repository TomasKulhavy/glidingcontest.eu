import React, { useState } from 'react';
import axios from "axios";
import { Card, Input, Alert, Button } from "reactstrap";
import IGCParser from "igc-parser";
import { solver, scoringRules as scoring } from "igc-xc-score";
import { getDistance } from 'geolib';
import NavMenu from "../Layout/NavMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { insideCircle } from "geolocation-utils";

import './Flight.css'

const UploadFlight = () => {
    const [error, setError] = useState(false);
    function copyMultidimensionalArray(arr) {
        return JSON.parse(JSON.stringify(arr));
    }
    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            let output = document.getElementById('output');
            output.textContent = reader.result;
            // Rozparsování souboru
            let result = IGCParser.parse(reader.result);
            calculateDistance(result);
            let tisk = JSON.stringify(result);
            sendFile(tisk);
        };
        reader.readAsText(e.target.files[0])
    }
    function sendFile(data) {
        axios.post('https://localhost:44346/api/FlightLog', { payload: data })
        .catch(() => { 
            setError(true) 
        });
    }

    function calculateDistance(result) {
        var dist = 0;
        var countTP = 0;

        for (let index = 1; index < result.task.points.length - 2; index++) {
            var distT = getDistance(
                { latitude: result.task.points[index].latitude, longitude: result.task.points[index].longitude },
                { latitude: result.task.points[index + 1].latitude, longitude: result.task.points[index + 1].longitude },
            )
            countTP += 1;
            dist = dist + distT;
        }

        const center = {lat: result.task.points[1].latitude, lon: result.task.points[1].longitude};
        const radius = 5000;

        const storeOfFixes = [];
        for (let index = 1; index < result.fixes.length - result.fixes.length / 2; index++) 
        {
            if(insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, center, radius) === true)
            {
                storeOfFixes.push(result.fixes[index].time);
                console.log({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude })
            }
        }
        const taskStarted = storeOfFixes[storeOfFixes.length - 1];
        console.log(taskStarted);

        const centerF = {lat: result.task.points[countTP + 1].latitude, lon: result.task.points[countTP + 1].longitude};

        const radiusF = 1000;
        const storeOfFinish = [];
        var state = false;
        for (let index = Math.round(result.fixes.length / 2); index < result.fixes.length - 1; index++) 
        {
            if(insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, centerF, radiusF) === true)
            {
                storeOfFinish.push(result.fixes[index].time);
            }
            else if(insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, centerF, radiusF) === false)
            {
                const centerT = {lat: result.task.points[countTP].latitude, lon: result.task.points[countTP].longitude};

                if (insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, centerT, radiusF) === true)
                {
                    state = true;
                    storeOfFinish.push({lat: result.fixes[index].latitude, lon: result.fixes[index].longitude, time: result.fixes[index].time});
                }
            }
        }
        console.log(storeOfFinish)
        var distTFinished = getDistance(
            { latitude: storeOfFinish[1].lat, longitude: storeOfFinish[1].lon },
            { latitude: result.fixes[result.fixes.length - 1].latitude, longitude: result.fixes[result.fixes.length - 1].longitude },
        )
        var distLast = getDistance(
            { latitude: result.task.points[countTP].latitude, longitude: result.task.points[countTP].longitude },
            { latitude: result.task.points[countTP + 1].latitude, longitude: result.task.points[countTP + 1].longitude },
        )
        console.log(distTFinished);
        const rightdist = dist - distLast + distTFinished;
        console.log(rightdist)
        const taskFinished = storeOfFinish[1].time;


        console.log(taskFinished);

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
        //var taskStart = 

        //Task time comp
        var timeSF = taskStarted;
        if(state === false)
        {
            var timeFF = taskFinished;
        }
        else if (state === true)
        {
            var timeFF = result.fixes[result.fixes.length-1].time;
        }
        if(timeSF !== undefined)
        {
            var s = timeSF.split(':');
            var times = (+s[0]) * 60 * 60 + (+s[1]) * 60 + (+s[2]); 
        }
        if(timeFF !== undefined)
        {
            var f = timeFF.split(':');
            var timef = (+f[0]) * 60 * 60 + (+f[1]) * 60 + (+f[2]); 
        }
        if(timeFF !== undefined && timeSF !== undefined)
        {
            var totalTimeInSecTask = timef - times;
            var timeTask = new Date(totalTimeInSecTask * 1000).toISOString().substr(11, 8);
        }

        //Flight computing
        var first = firstFix;
        var second = lastFix;
        var a = first.split(':');
        var b = second.split(':');
        var timeone = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        var timetwo = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]); 
        var totalTimeInSec = timetwo - timeone;
        var time = new Date(totalTimeInSec * 1000).toISOString().substr(11, 8);

        if(timeFF !== undefined && timeSF !== undefined)
        {
            var speedTotal = rightdist / totalTimeInSecTask;
            console.log(rightdist);
            console.log(totalTimeInSecTask)
            console.log(speedTotal*3.6)
        }
        else if (timeFF === undefined && timeSF === undefined)
        {
            var speedTotal = 0;
            dist = 0;
            timeTask = 0;
        }

        if(taskStarted === null)
        {
            flight.score = 0;
        }
        if(taskFinished === null)
        {
            flight.score = dist / 1000;
        }

        const scoreFlight = { 
            "score": flight.score,
            "flightTime": time,
            "taskTime": timeTask,
            "kilometers": rightdist / 1000,
            "avgSpeed": speedTotal*3.6,
        }
        result.flightLogAnalyse = scoreFlight;

        console.log(result);
    };
    function renderAlert()
    {
        if(error)
        {
            const array = "Tento let je již nahraný v naší databázi!";
            return array;
        }
    }


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
                                    <span className="font-size-xxl mt-1">{renderAlert()}</span>
                                </div>
                                <div className="ml-auto">
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faUpload} className="font-size-xl" />
                                    </div>
                                </div>
                            </div>
                            <Input className="my-2" type="file" accept=".igc" onChange={(e) => showFile(e)} />
                            <Button className="my-2" onClick={() => sendFile()}>
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
/*
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
        .catch(() => { 
            console.log(err); 
                this.renderAlert(err) 
        });
    }

    calculateDistance(result) {
        var dist = 0;
        var countTP = 0;

        for (let index = 1; index < result.task.points.length - 2; index++) {
            var distT = getDistance(
                { latitude: result.task.points[index].latitude, longitude: result.task.points[index].longitude },
                { latitude: result.task.points[index + 1].latitude, longitude: result.task.points[index + 1].longitude },
            )
            countTP += 1;
            dist = dist + distT;
        }

        const center = {lat: result.task.points[1].latitude, lon: result.task.points[1].longitude};
        const radius = 5000;

        const storeOfFixes = [];
        for (let index = 1; index < result.fixes.length - result.fixes.length / 2; index++) 
        {
            if(insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, center, radius) === true)
            {
                storeOfFixes.push(result.fixes[index].time);
                console.log({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude })
            }
        }
        const taskStarted = storeOfFixes[storeOfFixes.length - 1];
        console.log(taskStarted);

        const centerF = {lat: result.task.points[countTP + 1].latitude, lon: result.task.points[countTP + 1].longitude};

        const radiusF = 1000;
        const storeOfFinish = [];
        var state = false;
        for (let index = Math.round(result.fixes.length / 2); index < result.fixes.length - 1; index++) 
        {
            if(insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, centerF, radiusF) === true)
            {
                storeOfFinish.push(result.fixes[index].time);
            }
            else if(insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, centerF, radiusF) === false)
            {
                const centerT = {lat: result.task.points[countTP].latitude, lon: result.task.points[countTP].longitude};

                if (insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, centerT, radiusF) === true)
                {
                    state = true;
                    storeOfFinish.push({lat: result.fixes[index].latitude, lon: result.fixes[index].longitude, time: result.fixes[index].time});
                }
            }
        }
        console.log(storeOfFinish)
        var distTFinished = getDistance(
            { latitude: storeOfFinish[1].lat, longitude: storeOfFinish[1].lon },
            { latitude: result.fixes[result.fixes.length - 1].latitude, longitude: result.fixes[result.fixes.length - 1].longitude },
        )
        var distLast = getDistance(
            { latitude: result.task.points[countTP].latitude, longitude: result.task.points[countTP].longitude },
            { latitude: result.task.points[countTP + 1].latitude, longitude: result.task.points[countTP + 1].longitude },
        )
        console.log(distTFinished);
        const rightdist = dist - distLast + distTFinished;
        console.log(rightdist)
        const taskFinished = storeOfFinish[1].time;


        console.log(taskFinished);

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
        //var taskStart = 

        //Task time comp
        var timeSF = taskStarted;
        if(state === false)
        {
            var timeFF = taskFinished;
        }
        else if (state === true)
        {
            var timeFF = result.fixes[result.fixes.length-1].time;
        }
        if(timeSF !== undefined)
        {
            var s = timeSF.split(':');
            var times = (+s[0]) * 60 * 60 + (+s[1]) * 60 + (+s[2]); 
        }
        if(timeFF !== undefined)
        {
            var f = timeFF.split(':');
            var timef = (+f[0]) * 60 * 60 + (+f[1]) * 60 + (+f[2]); 
        }
        if(timeFF !== undefined && timeSF !== undefined)
        {
            var totalTimeInSecTask = timef - times;
            var timeTask = new Date(totalTimeInSecTask * 1000).toISOString().substr(11, 8);
        }

        //Flight computing
        var first = firstFix;
        var second = lastFix;
        var a = first.split(':');
        var b = second.split(':');
        var timeone = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        var timetwo = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]); 
        var totalTimeInSec = timetwo - timeone;
        var time = new Date(totalTimeInSec * 1000).toISOString().substr(11, 8);

        if(timeFF !== undefined && timeSF !== undefined)
        {
            var speedTotal = rightdist / totalTimeInSecTask;
            console.log(rightdist);
            console.log(totalTimeInSecTask)
            console.log(speedTotal*3.6)
        }
        else if (timeFF === undefined && timeSF === undefined)
        {
            var speedTotal = 0;
            dist = 0;
            timeTask = 0;
        }

        if(taskStarted === null)
        {
            flight.score = 0;
        }
        if(taskFinished === null)
        {
            flight.score = dist / 1000;
        }

        const scoreFlight = { 
            "score": flight.score,
            "flightTime": time,
            "taskTime": timeTask,
            "kilometers": rightdist / 1000,
            "avgSpeed": speedTotal*3.6,
        }
        result.flightLogAnalyse = scoreFlight;

        console.log(result);
    };

    renderAlert()
    {
        if(err)
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
*/
export default UploadFlight;