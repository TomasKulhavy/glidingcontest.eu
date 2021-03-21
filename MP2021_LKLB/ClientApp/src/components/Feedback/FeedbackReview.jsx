import React, { useState, useEffect, useContext } from "react";
import { Container, Table } from "reactstrap";
import NavMenu from "../Layout/NavMenu";
import axios from "axios";
import { FlightDataContext } from "../../providers/FlightDataContext";
import AccessDenied from "../Pages/AccessDenied";

const FeedbackReview = () => {
    const [feedback, setFeedback] = useState([]);
    const [{accessToken}] = useContext(FlightDataContext);
    let user;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/Feedback`)
            .then((response) => {
                setFeedback(response.data);
            });
    }, []);

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    if(accessToken !== null)
    {
        let tokenData = parseJwt(accessToken);
        user = tokenData.given_name;
    }

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
    if(user !== "TomasLKLB")
    {
        return (<AccessDenied />)
    }
    else if(user === "TomasLKLB")
    {
        return (
            <>
                <NavMenu />
                <Container>
                    <Table className="bg-dark text-white" striped>
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
}

export default FeedbackReview;