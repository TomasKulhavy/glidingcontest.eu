import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormGroup, FormFeedback, Input, Label, CardBody, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.firstname)
        errors.firstname = "Jméno musí být vyplněno";
    if (!values.lastname)
        errors.lastname = "Příjmení musí být vyplněno";
    if (!values.email) {
        errors.email = "E-mail musí být vyplněn";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Neplatná e-mailová adresa!";
    }
    if (!values.username) {
        errors.username = "Uživatelské heslo musí být vyplněno";
    }
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
    }
    return errors;
}

export default function SignUp() {
    const history = useHistory();
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            repassword: '',
        },
        validate: validate,
        onSubmit: values => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/register`,
                {
                    FirstName: values.firstname,
                    LastName: values.lastname,
                    Email: values.email,
                    UserName: values.username,
                    Password: values.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(() => {
                    history.push("/");
                    setError(false);
                })
                .catch((response) => {
                    setError(true);
                });
        },
    });
    function renderAlert()
    {
        if(error === true)
        {
            return (<Alert color="danger" isOpen={visible} toggle={onDismiss} className="my-3">Uživatel s těmito údaji je již zaregistrovaný!</Alert>)
        }
    }
    return (
        <Container className="text-center">
            {renderAlert()}
            <Button className="btn-dark mt-5 mb-3" tag={Link} to="/">
                <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" />
                Zpět na domovskou obrazovku
            </Button>
            <FormikProvider value={formik}>
                <Card className="m-2 text-center">
                    <CardBody className="text-center bg-dark text-light">
                        <div className="d-flex align-items-start">
                            <div className="font-weight-bold">
                                <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Registrace</small>
                                <span className="font-size-xxl mt-1"></span>
                            </div>
                            <div className="ml-auto">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faUserPlus} className="font-size-xl" />
                                </div>
                            </div>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup className="m-2">
                                <Label for="firstname">Jméno</Label>
                                <Input
                                    name="firstname"
                                    id="firstname"
                                    placeholder="Jan"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstname}
                                    invalid={Boolean(formik.errors.firstname)}
                                    valid={formik.touched.firstname}
                                />
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label for="lastname">Přijmení</Label>
                                <Input
                                    name="lastname"
                                    id="lastname"
                                    placeholder="Novák"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastname}
                                    invalid={Boolean(formik.errors.lastname)}
                                    valid={formik.touched.lastname}
                                />
                            </FormGroup>
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
                                <Button type="submit" className="m-2" color="success">Zaregistrovat se</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </FormikProvider>
        </Container>
    )
}