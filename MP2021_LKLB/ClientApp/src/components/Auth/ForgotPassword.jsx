import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormGroup, FormFeedback, Input, Label, CardBody, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = "E-mail musí být vyplněn";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Neplatná e-mailová adresa!";
    }
    return errors;
}

export default function ForgotPassword() {
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    function renderAlertEmail()
    {
        if(done)
        {
            return (<Alert color="success" isOpen={visible} toggle={onDismiss} className="my-3">Na Váš e-mail Vám byl zaslán odkaz na obnovení hesla.</Alert>)
        }
        else if(error)
        {
            return (<Alert color="danger" isOpen={visible} toggle={onDismiss} className="my-3">Někde se stala chyba! Opravdu jste zadal sprvánou adresu?</Alert>)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: validate,
        onSubmit: values => {
            setError(false);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/forgotPassword`,
                {
                    email: values.email,
                    password: "",
                })
                .then(response => {
                    setDone(true);
                })
                .catch(() => {
                    setError(true);
                })
        },
    });
    return (
        <div class="feedback">
            <Container className="text-center">
                <Button className="btn-dark mt-5 mb-3" tag={Link} to="/">
                    <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" />
                    Zpět na domovskou obrazovku
                </Button>
                {renderAlertEmail()}
                <FormikProvider value={formik}>
                    <Card className="m-2 text-center border-0">
                        <CardBody className="text-center bg-dark text-light">
                            <div className="d-flex align-items-start">
                                <div className="font-weight-bold">
                                    <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Zapomenuté heslo</small>
                                    <span className="font-size-xxl mt-1"></span>
                                </div>
                                <div className="ml-auto">
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faSignInAlt} className="font-size-xl" />
                                    </div>
                                </div>
                            </div>
                            <Form onSubmit={formik.handleSubmit}>
                                <FormGroup className="m-2">
                                    <Label for="email">E-mailová adresa</Label>
                                    <Input
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="jannovak@email.cz"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        invalid={Boolean(formik.errors.email)}
                                        valid={formik.touched.email}
                                    />
                                    {formik.errors.email ? <FormFeedback invalid>{formik.errors.email}</FormFeedback> : null}
                                </FormGroup>
                                <div>
                                    <Button type="submit" className="m-2" color="success">Restartovat heslo</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </FormikProvider>
            </Container>
        </div>
    )
}