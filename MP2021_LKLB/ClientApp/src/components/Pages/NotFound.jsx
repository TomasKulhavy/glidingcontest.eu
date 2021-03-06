import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => (
    <>
        <Container className="align-items-center mt-5">
            <Card className="bg-dark">
                <CardBody>
                    <CardTitle tag="h1" className="text-white">404 - Stránka nebyla nalezena!</CardTitle>
                    <Button className="btn-dark mt-5 mb-3" tag={Link} to="/">
                        <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" color="danger" />
                        Zpět na domovskou obrazovku
                    </Button>
                </CardBody>
            </Card>
        </Container>
    </>
);

export default NotFound;