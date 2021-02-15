import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import { FlightDataContext, ADD_PILOTID } from "../../providers/FlightDataContext";
import { render } from "react-dom";

const FeedbackReview = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        axios
            .get(`https://localhost:44346/api/Feedback`)
            .then((response) => {
                setFeedback(response.data);
                console.log(response.data);
            });
    }, []);

    function renderFeedback() {
        const array = feedback.map((item) => {
          return (
            <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.feedback}</td>
            </tr> 
          );
        });
        return array;
    }

    return (
        <>
            <NavMenu />
            <Container>
                <Table className="bg-light" striped>
                    <thead>
                        <tr>
                            <th>E-mail</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderFeedback()}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default FeedbackReview;