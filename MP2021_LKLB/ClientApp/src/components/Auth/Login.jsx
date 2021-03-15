import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Buttons from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, FormGroup, FormFeedback, Input, Label, CardBody, Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FlightDataContext, SET_ACCESS_TOKEN } from "../../providers/FlightDataContext";

const Login = () => {
    const [{accessToken}, dispatch] = useContext(FlightDataContext);
    let history = useHistory();
    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}

            validate={
                values=>{
                    let errors = [];
                    if (!values.email) errors.email = "Je nutné vyplnit email uživatele.";
                    if (!values.password) errors.password = "Je nutné vyplnit heslo uživatele.";
                    return errors;
                }
            }

            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
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
                    dispatch({type: SET_ACCESS_TOKEN, payload: response.data.accessToken});
                    history.push("/");
                })
                .catch(error => {
                    alert("CHYBA");
                })
                .then(()=>{
                    setSubmitting(false);
                })            
            }}
        >
        {({errors, touched}) => 
            (
                <Form>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Field tag={Input} id="email" name="email" placeholder="aaa@aaa.aa" />
                    {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Heslo</Label>
                    <Field id="password" name="password" type="password" />
                    {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                </FormGroup>
                <div>
                    <Button>Login</Button>
                </div>
                </Form>
            )
        }  
        </Formik>       
    );
}

export default Login;
/*
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

export default function SignInSide() {
  const [state, dispatch] = useContext(FlightDataContext);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: validate,
    onSubmit: values => {
        console.log(values);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/login`, 
        { 
            UserName: values.username,
            Password: values.password,
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log(response.data.accessToken)
            dispatch({type: SET_ACCESS_TOKEN, payload: response.data.accessToken});
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
*/