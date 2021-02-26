import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import { BACKEND_URL } from "../../configuration/backend";

const FeedbackReview = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        axios
            .get(BACKEND_URL + `/Feedback`)
            .then((response) => {
                setFeedback(response.data);
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