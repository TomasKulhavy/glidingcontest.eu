import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';

const Layout = ({ component: Component, layout: Layout, ...rest }) => {
  if (Layout === undefined) {
    Layout = (props) => <React.Fragment>{props.children}</React.Fragment>;
  }
  return (
    <>
      <NavMenu />
        <Route
          {...rest}
          render={(props) => (
            <Layout {...rest}>
              <Component {...props} />
            </Layout>
          )}
        />
      <Footer />
    </>
  );
}

export default Layout;
