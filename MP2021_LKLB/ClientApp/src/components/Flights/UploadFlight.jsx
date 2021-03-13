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

function parseL(str) {
    var RE_L = /^L.*(?=R1)R1(.*?)(\d{2}|\d{1})(.*?)(\d{4}|\d{3}|\d{2})(.*?).*$/;
    var radiusArray = [];

    function processLine (line) {
        var recordType = line[0];
        if (recordType === "L") 
        {
            var radius = line.match(RE_L);
            radiusArray.push(radius);
        }
    }
   
    for (var _i = 0, _a = str.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        processLine(line.trim());
    }
    var filtered = radiusArray.filter(function (el) {
        return el != null;
    });
    var radiusDone = [];
    for (let index = 0; index < filtered.length; index++) {
        radiusDone.push(filtered[index][2] + filtered[index][4])
    }
    return radiusDone;
}

const UploadFlight = () => {
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            let output = document.getElementById('output');
            output.textContent = reader.result;
            // Rozparsování souboru
            let result = IGCParser.parse(reader.result);
            let taskRad = parseL(reader.result);
            const tpRadius = { 
                taskRad,
            }
            result.radiusTP = tpRadius;
            calculateDistance(result);
            let tisk = JSON.stringify(result);
            sendFile(tisk);
            setError(false);
        };
        reader.readAsText(e.target.files[0]);
    }
    
    function sendFile(data) {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/FlightLog`, { payload: data })
        .then(() => {
            setDone(true);
            setError(false);
        })
        .catch(() => { 
            setError(true);
        });
    }
    
    function calculateDistance(result) {
        var dist = 0;
        var countTP = 0;
        var taskT = 1;
        var distT = 0;
        var lastDist = 0;
        var indexOfFix = 1;
        const storeOfStart = [];
        const storeOfFixes = [];
        
        for (taskT; taskT < result.task.points.length - 2; taskT++) {
            const radius = result.radiusTP.taskRad[taskT - 1];
            const center = {lat: result.task.points[taskT].latitude, lon: result.task.points[taskT].longitude};
            distT = getDistance(
                { latitude: result.task.points[taskT].latitude, longitude: result.task.points[taskT].longitude },
                { latitude: result.task.points[taskT + 1].latitude, longitude: result.task.points[taskT + 1].longitude },
            )
            if (taskT === 1)
            {
                for (let index = 1; index < result.fixes.length - result.fixes.length / 2; index++) 
                {
                    if(insideCircle({ lat: result.fixes[index].latitude, lon: result.fixes[index].longitude }, center, radius) === true)
                    {
                        storeOfStart.push(result.fixes[index].time);
                    }
                }
                countTP += 1;
                dist = dist + distT;
            }
            else if (taskT > 1)
            {
                for (indexOfFix; indexOfFix < result.fixes.length - 1; indexOfFix++) 
                {
                    if(insideCircle({ lat: result.fixes[indexOfFix].latitude, lon: result.fixes[indexOfFix].longitude }, center, radius) === true)
                    {
                        storeOfFixes.push(result.fixes[indexOfFix].time);
                        countTP += 1;
                        lastDist = distT;
                        dist = dist + distT;
                        indexOfFix = indexOfFix;
                        break;
                    }
                }
            }
        }

        if(countTP !== result.task.points.length - 3)
        {
            var distLast = getDistance(
                { latitude: result.task.points[taskT - 2].latitude, longitude: result.task.points[taskT - 2].longitude },
                { latitude: result.fixes[result.fixes.length - 1].latitude, longitude: result.fixes[result.fixes.length - 1].longitude },
            )
            dist = dist - lastDist;
            dist = dist + distLast;
        }
        const storeOfFinish = [{time: result.fixes[result.fixes.length - 1].time}];
        const taskStarted = storeOfStart[storeOfStart.length - 1];

        var taskFinished;
        if(taskStarted !== undefined)
        {
            taskFinished = storeOfFinish[0].time;
        }

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

        //Task time comp
        if(taskStarted !== undefined)
        {
            var timeSF = taskStarted;
        }

        var timeFF = taskFinished;

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
        var speedTotal;
        if(timeFF !== undefined && timeSF !== undefined)
        {
            speedTotal = dist / totalTimeInSecTask;
        }
        else if (timeFF === undefined && timeSF === undefined)
        {
            speedTotal = 0;
            dist = 0;
            timeTask = 0;
            flight.score = 0;
        }

        const scoreFlight = { 
            "score": flight.score,
            "flightTime": time,
            "taskTime": timeTask,
            "kilometers": dist / 1000,
            "avgSpeed": speedTotal*3.6,
        }
        result.flightLogAnalyse = scoreFlight;
    };
    function renderAlert()
    {
        if(error)
        {
            return (
                <Alert color="danger" isOpen={visible} toggle={onDismiss}>Někde se vyskytla chyba, zkuste to znovu (Nebo zkuste nahrát jiný let)</Alert>
            );
        }
        if(done)
        {
            return (
                <Alert color="success" isOpen={visible} toggle={onDismiss}>Let se podařilo úspěšně nahrát</Alert>
            );
        }
    }

    return (
        <>
            <NavMenu />
            <div className="Flight container h-100"> 
            {renderAlert()}
                <div className="row align-items-center h-100">
                    <div className="col-md-6 .offset-md-3 mx-auto d-flex justify-content-center">
                        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                            <div className="d-flex align-items-start">
                                <div className="font-weight-bold">
                                    <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Nahraj svůj let</small>
                                    <span className="font-size-xxl mt-1"></span>
                                </div>
                                <div className="ml-auto">
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faUpload} className="font-size-xl" />
                                    </div>
                                </div>
                            </div>
                            <Input className="my-2" type="file" accept=".igc" onChange={(e) => showFile(e)} />
                            <Button className="my-2" disabled={error} onClick={() => sendFile()}>
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

export default UploadFlight;