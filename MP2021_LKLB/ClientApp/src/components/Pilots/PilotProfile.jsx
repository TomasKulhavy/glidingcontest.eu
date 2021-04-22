import React, { useContext, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Card, Button, Form, FormFeedback, Input, Row, CardBody, Alert, CardHeader, Col, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEdit, faEnvelope, faMobile, faPlane, faRulerHorizontal,faStarOfLife, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFormik, FormikProvider } from 'formik';
import NavMenu from '../Layout/NavMenu';
import { FlightDataContext } from "../../providers/FlightDataContext";
import Loading from '../Pages/Loading';
import { createBrowserHistory } from "history";
import AccessDenied from "../Pages/AccessDenied";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const validate = values => {
    const errors = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Neplatná e-mailová adresa!";
    }
    if (!/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/i.test(values.phoneNumber)) {
        errors.phoneNumber = "Neplatné telefonní číslo!";
    }
    return errors;
}

export default function PilotProfile(props) {
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const [{accessToken}] = useContext(FlightDataContext);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState([]);
    const [done, setDone] = useState(false);
    const history = createBrowserHistory();
    const [mobile, setMobile] = useState(false);
    const [email, setEmail] = useState(false);

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let user;
    if(accessToken !== null)
    {
        var tokenData = parseJwt(accessToken);
        user = tokenData.sub;
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/Account/profile/${props.match.params.id}`)
            .then((response) => {
                setProfile(response.data);
            })
            .catch(() => {
                history.push("/");
                window.location.reload();
            })
            .then(() => {
                setLoading(false);
            });
    }, [props.match.params.id]);

    function secondsToHms() {
        var d = Number(profile.flightTime);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
    
        var hDisplay = h > 0 ? h + ":" : "";
        var mDisplay = m > 9 ? m : "0" + m;
        return hDisplay + mDisplay; 
    }

    function renderAlertEmail()
    {
        if(done)
        {
            return (<Alert color="success" isOpen={visible} toggle={onDismiss} className="my-3">Vaše osobní inforamce byly aktualizovány.</Alert>)
        }
        else if(error)
        {
            return (<Alert color="danger" isOpen={visible} toggle={onDismiss} className="my-3">Někde se stala chyba!</Alert>)
        }
    }

    const formikEmail = useFormik({
        initialValues: {
            email: '',
        },
        validate: validate,
        onSubmit: values => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/changeEmail/${user}/${values.email}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken
                    }
                })
                .catch(() => {
                    setError(true);
                })
                .then(() => {
                    setDone(true);
                    window.location.reload();
                })
        },
    });

    const formikBirth = useFormik({
        initialValues: {
            birthday: '',
        },
        validate: validate,
        onSubmit: values => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/changeBirth/${user}/${values.birthday}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken
                    }
                })
                .catch(() => {
                    setError(true);
                })
                .then(() => {
                    setDone(true);
                    window.location.reload();
                })
        },
    });

    const formikPhone = useFormik({
        initialValues: {
            phoneNumber: '',
        },
        validate: validate,
        onSubmit: values => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Account/changePhone/${user}/${values.phoneNumber}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken
                    }
                })
                .catch(() => {
                    setError(true);
                })
                .then(() => {
                    setDone(true);
                    window.location.reload();
                })
        },
    });

    function deleteUser()
    {
        setLoading(true)
        axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/api/Account/deleteUser/${user}`)
        .then(() => {
            setLoading(false);
            history.push("/");
            window.location.reload();
        })   
    }

    if(loading)
    {
        return (
            <Loading />
        )
    }
    else if(user === props.match.params.id)
    {
        return (
            <div class="feedback">
                <NavMenu/>
                <Container className="text-center">
                    <Button className="btn-dark mt-5 mb-3" tag={Link} to={`/pilot/flights/${user}`}>
                        <FontAwesomeIcon icon={faPlane} className="font-size-xl mr-3" />
                        Zobrazit mé lety
                    </Button>
                    {renderAlertEmail()}
                        <Card className="m-2 text-center border-0">
                            <CardHeader className="text-center bg-dark text-white">
                                <h1 className="mb-3"><FontAwesomeIcon icon={faUserAlt} className="font-size-xxl mr-2" />{profile.name}</h1>
                                <p className="personal">Osobní nálet</p>
                                <h5><FontAwesomeIcon icon={faClock} className="mr-2" />{secondsToHms()}</h5>
                                <h5><FontAwesomeIcon icon={faRulerHorizontal} className="mr-2" />{Math.round(profile.kilometers)} KM</h5>
                            </CardHeader>
                            <CardBody className="text-center bg-dark text-light">
                                <p className="personal">Osobní údaje</p>
                                <Row className="align-items-center mt-2">
                                    <Col xs="2" sm="2" lg="5" md="5" className="text-right text-white">
                                        <FontAwesomeIcon
                                        icon={faEnvelope}
                                        size="2x"
                                        ></FontAwesomeIcon>
                                    </Col>
                                    <Col xs="10" sm="10" lg="7" md="7" className="text-left">
                                        <FormikProvider value={formikEmail}>
                                            <>
                                                {email 
                                                ? (
                                                    <Form onSubmit={formikEmail.handleSubmit} inline>
                                                        <Input
                                                            className="col-4"
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            onChange={formikEmail.handleChange}
                                                            onBlur={formikEmail.handleBlur}
                                                            value={formikEmail.values.email}
                                                            invalid={Boolean(formikEmail.errors.email)}
                                                            valid={formikEmail.touched.email}
                                                        />
                                                        {formikEmail.errors.email ? <FormFeedback invalid>{formikEmail.errors.email}</FormFeedback> : null}
                                                        <Button type="submit" className="m-3" color="success" disabled>Uložit</Button> 
                                                    </Form>
                                                    )
                                                : (

                                                    <h4>{profile.email} <FontAwesomeIcon icon={faEdit} className="ml-2 icons" onClick={() => setEmail(!email)} disabled/></h4> 
                                                )
                                                }
                                            </>
                                        </FormikProvider>
                                    </Col>
                                </Row>
                                <Row className="align-items-center mt-2">
                                    <Col xs="2" sm="2" lg="5" md="5" className="text-right text-white">
                                        <FontAwesomeIcon
                                        icon={faMobile}
                                        size="2x"
                                        ></FontAwesomeIcon>
                                    </Col>
                                    <Col xs="10" sm="10" lg="7" md="7" className="text-left">
                                        <FormikProvider value={formikPhone}>
                                            <>
                                                {mobile 
                                                ? (
                                                    <Form onSubmit={formikPhone.handleSubmit} inline>
                                                        <Input
                                                            className="col-4"
                                                            type="text"
                                                            name="phoneNumber"
                                                            id="phoneNumber"
                                                            onChange={formikPhone.handleChange}
                                                            onBlur={formikPhone.handleBlur}
                                                            value={formikPhone.values.phoneNumber}
                                                            invalid={Boolean(formikPhone.errors.phoneNumber)}
                                                            valid={formikPhone.touched.phoneNumber}
                                                        />
                                                        {formikPhone.errors.phoneNumber ? <FormFeedback invalid>{formikPhone.errors.phoneNumber}</FormFeedback> : null}
                                                        <Button type="submit" onClick={formikPhone.handleSubmit} className="m-3" color="success" disabled>Uložit</Button> 
                                                    </Form>
                                                    )
                                                : (
                                                    <h4>{profile.phoneNumber} <FontAwesomeIcon icon={faEdit} className="ml-2" onClick={setMobile(!mobile)}/></h4> 
                                                )
                                                }
                                            </>
                                        </FormikProvider>
                                    </Col>
                                </Row>
                                <Row className="align-items-center mt-2">
                                    <Col xs="2" sm="2" lg="5" md="5" className="text-right text-white">
                                        <FontAwesomeIcon
                                        icon={faStarOfLife}
                                        size="2x"
                                        ></FontAwesomeIcon>
                                    </Col>
                                    <Col xs="10" sm="10" lg="7" md="7" className="text-left">
                                        <Form onSubmit={formikBirth.handleSubmit} inline>
                                            {profile.birthDay 
                                            ? 
                                            <h4>{profile.birthDay} <FontAwesomeIcon icon={faEdit} className="ml-2" /></h4> 
                                            :
                                            <>
                                                <Input
                                                    className="col-4"
                                                    type="date"
                                                    name="birthday"
                                                    id="birthday"
                                                    onChange={formikBirth.handleChange}
                                                    onBlur={formikBirth.handleBlur}
                                                    value={formikBirth.values.birthday}
                                                    invalid={Boolean(formikBirth.errors.birthday)}
                                                    valid={formikBirth.touched.birthday}
                                                />
                                                <Button type="submit" className="m-3" color="success" disabled>Uložit</Button>
                                            </>
                                            }
                                        </Form>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className="bg-dark">
                                    <div>
                                        <Button tag={Link} to="/password/change" className="m-3" color="warning">Změna hesla</Button>
                                        <Button onClick={handleClickOpen} className="m-3" color="danger">Smazat tento účet</Button>
                                    </div>
                            </CardFooter>
                        </Card>
                </Container>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Potvrďte, že chcete smazat tento účet"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Po smazání Vašeho účtu se smažou i veškeré Vaše lety! Opravdu chcete smazat tento účet?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Zrušit
                    </Button>
                    <Button onClick={() => deleteUser()} color="danger" autoFocus>
                        Potvrdit
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    else
    {
        return (
            <AccessDenied/>
        )
    }
}