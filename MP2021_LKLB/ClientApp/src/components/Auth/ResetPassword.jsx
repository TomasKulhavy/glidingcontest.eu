import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormGroup, FormFeedback, Input, Label, CardBody, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';
import queryString from 'query-string';

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = "Heslo musí být vyplněno";
    }
    if (!/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(values.password)) {
        errors.password = "Heslo musí obsahovat minimálně 8 znaků, 1 velké písmeno, 1 číslo a 1 znak";
    }
    if (!values.repassword) {
        errors.repassword = "Potvrďte heslo";
    }
    if (values.repassword !== values.password) {
        errors.repassword = "Hesla se musí shodovat";
        return errors;
    }
}

export default function ResetPassword(props) {
    const history = useHistory();
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    function renderAlertEmail() {
        if (error) {
            return (<Alert color="danger" isOpen={visible} toggle={onDismiss} className="my-3">Někde se stala chyba! Opravdu jste zadal sprvánou adresu?</Alert>)
        }
    }
    const url = queryString.parse(props.location.search)
    console.log(url.token)

    const formik = useFormik({
        initialValues: {
            email: '',
            token: '',
            password: '',
            repassword: '',
        },
        validate: validate,
        onSubmit: values => {
            setError(false);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/ResetPassword`,
                {
                    Email: values.email,
                    Token: url.token,
                    Password: values.password,
                })
                .then((response) => {
                    history.push("/login");
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
                                    <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Obnovení hesla</small>
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
                                    <Label for="email">E-mail</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="jan.novak@gmail.com"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        invalid={Boolean(formik.errors.email)}
                                        valid={formik.touched.email}
                                    />
                                </FormGroup>
                                <FormGroup className="m-2">
                                    <Label for="password">Nové Heslo</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Nové heslo"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        invalid={Boolean(formik.errors.password)}
                                        valid={formik.touched.password}
                                    />
                                    {formik.errors.password ? <FormFeedback invalid>{formik.errors.password}</FormFeedback> : null}
                                </FormGroup>
                                <FormGroup className="m-2">
                                    <Label for="repassword">Opakujte heslo</Label>
                                    <Input
                                        type="password"
                                        name="repassword"
                                        id="repassword"
                                        placeholder="Heslo"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.repassword}
                                        invalid={Boolean(formik.errors.repassword)}
                                        valid={formik.touched.repassword}
                                    />
                                    {formik.errors.repassword ? <FormFeedback invalid>{formik.errors.repassword}</FormFeedback> : null}
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
