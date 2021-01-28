import React, { Component } from 'react';

const Footer = () => {
  return (
    <footer style={{position: 'absolute', width: '100%'}} className="page-footer font-small bg-dark text-white pt-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left mt-3 pb-3">
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Informace o letišti</h6>
            <p>
              <i className="fas fa-plane-arrival mr-3" /> LKLB
            </p>
            <p>
              <i className="fas fa-tachometer-alt mr-3" /> 1329 ft / 405 m
            </p>
            <p>
              <i className="fas fa-ruler-horizontal mr-3" /> RWY 16/34 — 1020 x 50 m
            </p>
            <p>
              <i className="fas fa-broadcast-tower mr-3" /> Liberec RADIO 122.605 MHz
            </p>
          </div>
          <hr className="w-100 clearfix d-md-none" />
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Kontakt</h6>
            <p>
              <i className="fas fa-search-location mr-3" /> GPS: 50°46'06" N, 15°01'30" E
            </p>
            <p>
              <i className="fas fa-home mr-3" /> Aeroklub Liberec
            </p>
            <p>
              <i className="fas fa-envelope mr-3" /> tom.kulhavy@seznam.cz
            </p>
            <p>
              <i className="fas fa-phone mr-3" /> +420 720 046 104
            </p>
          </div>
        </div>
        <hr />
        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">
              © 2020 - Databáze letů pro Aeroklub Liberec - <a asp-area asp-page="/Privacy">Privacy</a>
            </p>
          </div>
          <div className="col-md-5 col-lg-4 ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" href="https://www.facebook.com/tomas.kulhavy.52/">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" href="https://www.instagram.com/tomaslklb/">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
