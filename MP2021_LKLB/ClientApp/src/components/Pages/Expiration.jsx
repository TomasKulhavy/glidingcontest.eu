import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Expiration = () => (
    <>
        <Container className="align-items-center mt-5">
            <Card className="bg-dark">
                <CardBody>
                    <CardTitle tag="h1" className="text-white">Uživatel byl automaticky odhlášen!</CardTitle>
                    <Button className="btn-dark mt-5 mb-3" tag={Link} to="/">
                        <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" color="danger" />
                        Zpět na domovskou obrazovku
                    </Button>
                    <Button className="btn-dark mt-5 mb-3" tag={Link} to="/login">
                        <FontAwesomeIcon icon={faSignInAlt} className="font-size-xl mr-3" color="danger" />
                        Nebo se znovu přihlašte
                    </Button>
                </CardBody>
            </Card>
        </Container>
    </>
);

export default Expiration;