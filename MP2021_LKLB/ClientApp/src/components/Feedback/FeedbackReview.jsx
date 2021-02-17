import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";

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