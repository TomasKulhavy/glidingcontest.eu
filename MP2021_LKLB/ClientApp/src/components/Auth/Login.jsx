import React, { useContext, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormGroup, FormFeedback, Input, Label, CardBody, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';
import { FlightDataContext, SET_ACCESS_TOKEN } from "../../providers/FlightDataContext";

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = "E-mail musí být vyplněn";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Neplatná e-mailová adresa!";
    }
    if (!values.password) {
        errors.password = "Heslo musí být vyplněno";
    }
    return errors;
}

export default function SignIn() {
    const history = useHistory();
    const [{ accessToken }, dispatch] = useContext(FlightDataContext);
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    function renderAlert()
    {
        if(error)
        {
            return (<Alert color="danger" isOpen={visible} toggle={onDismiss} className="my-3">Někde se stala chyba, zkuste to znovu!</Alert>)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validate,
        onSubmit: values => {
            setError(false);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/login`,
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken
                    }
                })
                .then(response => {
                    dispatch({ type: SET_ACCESS_TOKEN, payload: response.data.accessToken });
                    history.push("/");
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
                {renderAlert()}
                <FormikProvider value={formik}>
                    <Card className="m-2 text-center border-0">
                        <CardBody className="text-center bg-dark text-light">
                            <div className="d-flex align-items-start">
                                <div className="font-weight-bold">
                                    <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Přihlásit se</small>
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
                                <FormGroup className="m-2">
                                    <Label for="password">Heslo</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Heslo"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        invalid={Boolean(formik.errors.password)}
                                        valid={formik.touched.password}
                                    />
                                    {formik.errors.password ? <FormFeedback invalid>{formik.errors.password}</FormFeedback> : null}
                                </FormGroup>
                                <div>
                                    <Button type="submit" className="m-2" color="success">Přihlásit se</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </FormikProvider>
            </Container>
        </div>
    )
}