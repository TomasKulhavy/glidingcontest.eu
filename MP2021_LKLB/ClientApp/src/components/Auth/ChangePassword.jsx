import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormGroup, FormFeedback, Input, Label, CardBody, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';
import { FlightDataContext } from "../../providers/FlightDataContext";

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = "Heslo musí být vyplněno";
    }
    if (!values.newpassword) {
        errors.newpassword = "Heslo musí být vyplněno";
    }
    if (!/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(values.newpassword)) {
        errors.newpassword = "Heslo musí obsahovat minimálně 8 znaků, 1 velké písmeno, 1 číslo a 1 znak";
    }
    if (!values.repassword) {
        errors.repassword = "Potvrďte heslo";
    }
    if (values.repassword !== values.newpassword) {
        errors.repassword = "Hesla se musí shodovat";
        return errors;
    }
}

export default function ChangePassword() {
    const history = useHistory();
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const [{accessToken}] = useContext(FlightDataContext);

    function renderAlertEmail() {
        if (error) {
            return (<Alert color="danger" isOpen={visible} toggle={onDismiss} className="my-3">Někde se stala chyba! Opravdu jste zadal správné staré heslo?</Alert>)
        }
    }

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    let user;
    if(accessToken !== null)
    {
        var tokenData = parseJwt(accessToken);
        user = tokenData.sub;
    }

    const formik = useFormik({
        initialValues: {
            id: '',
            password: '',
            newpassword: '',
            repassword: ''
        },
        validate: validate,
        onSubmit: values => {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/Account/changePassword`,
                {
                    id: tokenData.sub,
                    oldPassword: values.password,
                    newPassword: values.newpassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken
                    }
                })
                .then(() => {
                    history.push(`/pilot/profile/${user}`);
                })
                .catch(() => {
                    setError(true);
                })
        },
    });

    return (
        <div class="feedback">
            <Container className="text-center">
                <Button className="btn-dark mt-5 mb-3" tag={Link} to={`/pilot/profile/${user}`}>
                    <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" />
                    Zpět na svůj profil
                </Button>
                {renderAlertEmail()}
                <FormikProvider value={formik}>
                    <Card className="m-2 text-center border-0">
                        <CardBody className="text-center bg-dark text-light">
                            <div className="d-flex align-items-start">
                                <div className="font-weight-bold">
                                    <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Změna hesla</small>
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
                                    <Label for="password">Staré heslo</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Staré heslo"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        invalid={Boolean(formik.errors.password)}
                                        valid={formik.touched.password}
                                    />
                                    {formik.errors.password ? <FormFeedback invalid>{formik.errors.password}</FormFeedback> : null}
                                </FormGroup>
                                <FormGroup className="m-2">
                                    <Label for="newpassword">Nové Heslo</Label>
                                    <Input
                                        type="password"
                                        name="newpassword"
                                        id="newpassword"
                                        placeholder="Nové heslo"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.newpassword}
                                        invalid={Boolean(formik.errors.newpassword)}
                                        valid={formik.touched.newpassword}
                                    />
                                    {formik.errors.newpassword ? <FormFeedback invalid>{formik.errors.newpassword}</FormFeedback> : null}
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
                                    <Button type="submit" className="m-2" color="success">Změnit heslo</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </FormikProvider>
            </Container>
        </div>
    )
}
