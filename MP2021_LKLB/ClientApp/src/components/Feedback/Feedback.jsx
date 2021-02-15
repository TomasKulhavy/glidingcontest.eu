import React, {useState} from "react";
import { Button, Form, FormGroup, Input, Label, FormFeedback, Card, CardHeader, CardBody, Row, Container } from "reactstrap";
import { useFormik, FormikProvider } from 'formik';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

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
    if (!values.club)
        errors.club = "Napište svůj domovský aeroklub";
    if (!values.feedback)
        errors.feedback = "Sdělte nám svůj názor";
    if (values.GDPR === false)
        errors.GDPR = "Potvrďte zpracování údajů";
    return errors;
}  

const Feedback = () => {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
          firstname: '',
          lastname: '',
          email: '',
          club: '',
          feedback: '',
          GDPR: false,
        },
        validate: validate,
        onSubmit: values => {
            let tisk = JSON.stringify(values);
            console.log(tisk);
            axios.post('https://localhost:44346/api/Feedback', { payload: tisk })
            .then(() => {
                history.push("/");
            });
            
        },
    });

    console.log(formik);
    return (
        <Container>
            <div className="">
                <FormikProvider value={formik}>
                    <Card className="m-2 text-center">
                        <CardHeader className="text-light bg-dark"><h5>Sdělte nám svůj názor na tuto aplikaci</h5></CardHeader>
                        <CardBody className="text-center bg-dark text-light">
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
                                {formik.errors.firstname ? <FormFeedback invalid>{formik.errors.firstname}</FormFeedback> : null}
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
                                {formik.errors.lastname ? <FormFeedback invalid>{formik.errors.lastname}</FormFeedback> : null}
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
                                {formik.errors.email ? <FormFeedback invalid>{formik.errors.email}</FormFeedback> : null}
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label for="club">Domovský aeroklub</Label>
                                <Input 
                                    name="club" 
                                    id="club" 
                                    placeholder="Aeroklub Liberec" 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    value={formik.values.club} 
                                    invalid={Boolean(formik.errors.club)} 
                                    valid={formik.touched.club}
                                />
                                {formik.errors.club ? <FormFeedback invalid>{formik.errors.club}</FormFeedback> : null}
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label for="feedback">Feedback</Label>
                                <Input 
                                    name="feedback" 
                                    id="feedback" 
                                    placeholder="Napište nám svůj názor..." 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    value={formik.values.feedback} 
                                    invalid={Boolean(formik.errors.feedback)} 
                                    valid={formik.touched.feedback}
                                />
                                {formik.errors.feedback ? <FormFeedback invalid>{formik.errors.feedback}</FormFeedback> : null}
                            </FormGroup>
                            <FormGroup className="m-2" check>
                                <Label check>
                                    <Input 
                                        id="GDPR"
                                        name="GDPR"
                                        type="checkbox" 
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.GDPR} 
                                        invalid={Boolean(formik.errors.GDPR)} 
                                        valid={formik.touched.GDPR}
                                    />{' '}
                                    GDPR
                                    {formik.errors.GDPR ? <FormFeedback invalid>{formik.errors.GDPR}</FormFeedback> : null}
                                </Label>
                            </FormGroup>
                            <div>
                                <Button type="submit" className="m-2" color="success">Odeslat</Button>
                            </div>
                        </Form>
                    </CardBody>
                    </Card>
                </FormikProvider>
            </div>
        </Container>
    )
}

export default Feedback;