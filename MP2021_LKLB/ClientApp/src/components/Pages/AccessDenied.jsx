import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";

const AccessDenied = () => (
    <>
        <Container className="align-items-center mt-5">
            <Card className="bg-dark">
                <CardBody>
                    <CardTitle tag="h1" className="text-white">Na tuto stránku se musíte přihlásit nebo nemáte dostatečná práva!</CardTitle>
                    <Button className="mt-5 mb-3" color="danger" tag={Link} to="/">
                        <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" />
                        Zpět na domovskou obrazovku
                    </Button>
                </CardBody>
            </Card>
        </Container>
    </>
);

export default AccessDenied;