import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Buttons from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormGroup, FormFeedback, Input, Label, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

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
            console.log(values);
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
            });
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
                            <Label for="repassword">Heslo</Label>
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
                            <Button type="submit" className="m-2" color="success">Odeslat</Button>
                        </div>
                    </Form>
                </CardBody>
                </Card>
            </FormikProvider>
        </Container>
    )
/*
  return (
    <>
        <Card className="col-4 mx-auto mt-5">
            <Container component="main" maxWidth="xs">    
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Zaregistrovat se
                    </Typography>
                    <FormikProvider value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormGroup className="m-2">
                                        <Label for="username">Jméno</Label>
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
                                        {formik.errors.username ? <FormFeedback invalid>{formik.errors.username}</FormFeedback> : null}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Heslo"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {formik.errors.password ? <FormFeedback invalid>{formik.errors.password}</FormFeedback> : null}
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="repassword"
                                    label="Heslo"
                                    type="password"
                                    id="repassword"
                                />
                                {formik.errors.repassword ? <FormFeedback invalid>{formik.errors.repassword}</FormFeedback> : null}
                                </Grid>
                            </Grid>
                            <div>
                                <Button type="submit" className="m-2" color="success">Zaregistrovat se</Button>
                            </div>
                            <Grid container justify="flex-end">
                                <Grid item>
                                <Link href="#" variant="body2">
                                    Máte již vytvořený účet? Přihlaste se
                                </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    </FormikProvider>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
                <Button className="btn-dark mt-5 mb-3" tag={Link} to="/">
                    <FontAwesomeIcon icon={faHome} className="font-size-xl mr-3" />
                    Zpět na domovskou obrazovku
                </Button>
            </Container>
        </Card>
    </>
  );
  */
}
/*
import React from "react";
import { Button, Form, FormGroup, Input, Label, FormFeedback, Card, CardHeader, CardBody, Row, Container } from "reactstrap";
import { useFormik, FormikProvider } from 'formik';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHome } from "@fortawesome/free-solid-svg-icons";

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
    if (!values.repassword) {
        errors.repassword = "Potvrďte heslo";
    }  
    if (values.repassword !== values.password) {
        errors.repassword = "Hesla se musí shodovat";
    }      
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
          username: '',
          password: '',
          repassword: '',
          GDPR: false,
        },
        validate: validate,
        onSubmit: values => {
            let tisk = JSON.stringify(values);
            console.log(tisk);
            axios.post('https://localhost:44346/api/Account/register', { userData: tisk })
            .then(() => {
                history.push("/");
            });
        },
    });

    console.log(formik);
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
        </Container>
    )
}

export default Feedback;
*/