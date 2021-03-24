import React from "react";
import { Button, Form, FormGroup, Input, Label, FormFeedback, Card, CardBody, Container } from "reactstrap";
import { useFormik, FormikProvider } from 'formik';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHome } from "@fortawesome/free-solid-svg-icons";

import "../../custom.css"

const validate = values => {
    const errors = {};
    if (!values.feedback)
        errors.feedback = "Sdělte nám svůj názor";
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
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Feedback`,
            {
                FirstName: values.firstname,
                LastName: values.lastname,
                Email: values.email,
                Club: values.club,
                Feedback: values.feedback,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(() => {
                history.push("/");
            });           
        },
    });

    return (
        <div className="feedback">
            <Container className="text-center">
                <Button className="btn-dark mt-5 mb-3" tag={Link} to="/">
                    <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" />
                    Zpět na domovskou obrazovku
                </Button>
                <FormikProvider value={formik}>
                    <Card className="m-2 text-center border-0">
                        <CardBody className="text-center bg-dark text-light">
                            <div className="d-flex align-items-start">
                                <div className="font-weight-bold">
                                    <small className="text-white-70 d-block font-size-xl mb-1 text-uppercase">Sdělte nám svůj názor na tuto aplikaci</small>
                                    <span className="font-size-xxl mt-1"></span>
                                </div>
                                <div className="ml-auto">
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faCommentDots} className="font-size-xl" />
                                    </div>
                                </div>
                            </div>
                            <Form onSubmit={formik.handleSubmit}>
                                <FormGroup className="m-2">
                                    <Label for="firstname">Jméno (nepovinné)</Label>
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
                                    <Label for="lastname">Přijmení (nepovinné)</Label>
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
                                    <Label for="email">E-mail (nepovinné)</Label>
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
                                    <Label for="club">Domovský aeroklub (nepovinné)</Label>
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
                                </FormGroup>
                                <FormGroup className="m-2">
                                    <Label for="feedback">Feedback</Label>
                                    <Input 
                                        type="textarea"
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
                                <div>
                                    <Button type="submit" className="m-2" color="success">Odeslat</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </FormikProvider>
            </Container>
        </div>
    )
}

export default Feedback;