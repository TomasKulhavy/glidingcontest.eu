import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormGroup, FormFeedback, Input, Label, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';
import { FlightDataContext, SET_ACCESS_TOKEN } from "../../providers/FlightDataContext";

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = "Uživatelské heslo musí být vyplněno";
    }
    if (!values.password) {
        errors.password = "Heslo musí být vyplněno";
    }
    return errors;
}

export default function SignIn() {
    const history = useHistory();
    const [{ accessToken }, dispatch] = useContext(FlightDataContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            isPersistant: false,
        },
        validate: validate,
        onSubmit: values => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/login`,
                {
                    email: values.username,
                    password: values.password,
                    isPersistant: values.isPersistant
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
                .catch(error => {
                    alert("CHYBA");
                })
        },
    });
    return (
        <Container>
            <Button className="btn-dark mt-5 mb-3" tag={Link} to="/">
                <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" />
                Zpět na domovskou obrazovku
            </Button>
            <FormikProvider value={formik}>
                <Card className="m-2 text-center">
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
                                <Label for="username">Přihlašovací jméno</Label>
                                <Input
                                    name="username"
                                    id="username"
                                    placeholder="JanNovak"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    invalid={Boolean(formik.errors.username)}
                                    valid={formik.touched.username}
                                />
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
                                <Button type="submit" className="m-2" color="success">Odeslat</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </FormikProvider>
        </Container>
    )
}