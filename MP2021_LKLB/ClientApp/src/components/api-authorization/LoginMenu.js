import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUpload, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        if(userName === "TomasLKLB")
        {
            return (
                <Fragment>
                    <NavItem>
                        <NavLink tag={Link} className="text-light mr-3" to="/feedback/review">Feedback</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/flight/upload">
                            <FontAwesomeIcon icon={faUpload} className="font-size-xl mr-2 mt-1" /> 
                            Nahrát let
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to={profilePath}>
                            <FontAwesomeIcon icon={faIdCard} className="font-size-xl mr-2 mt-1" /> 
                            {userName}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to={logoutPath}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="font-size-xl mr-2 mt-1" /> 
                            Odhlásit se
                        </NavLink>
                    </NavItem>
                </Fragment>);
        }
        else {
            return (
            <Fragment>
                <NavItem>
                    <NavLink tag={Link} className="text-light" to="/flight/upload">
                        <FontAwesomeIcon icon={faUpload} className="font-size-xl mr-2 mt-1" /> 
                        Nahrát let
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-light" to={profilePath}>
                        <FontAwesomeIcon icon={faIdCard} className="font-size-xl mr-2 mt-1" /> 
                        {userName}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-light" to={logoutPath}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="font-size-xl mr-2 mt-1" /> 
                        Odhlásit se
                    </NavLink>
                </NavItem>
            </Fragment>);
        }
    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-light" to={registerPath}>Registrovat se</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-light" to={loginPath}>Přihlásit se</NavLink>
            </NavItem>
        </Fragment>);
    }
}
