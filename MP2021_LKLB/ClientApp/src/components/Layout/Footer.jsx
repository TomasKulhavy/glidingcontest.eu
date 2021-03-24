import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlaneArrival, faInfoCircle, faIdCardAlt, faRulerHorizontal, faBroadcastTower, faSearchLocation, faHome, faEnvelope, faPhone, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{position: 'absolute', width: '100%'}} className="page-footer font-small bg-dark text-white pt-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left mt-3 pb-3">
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <FontAwesomeIcon className="mr-3" icon={faInfoCircle} />
              Informace o letišti
            </h6>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faPlaneArrival} /> LKLB
            </p>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faTachometerAlt} /> 1329 ft / 405 m
            </p>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faRulerHorizontal} /> RWY 16/34 — 1020 x 50 m
            </p>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faBroadcastTower} /> Liberec RADIO 122.605 MHz
            </p>
          </div>
          <hr className="w-100 clearfix d-md-none" />
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <FontAwesomeIcon className="mr-3" icon={faIdCardAlt} />
              Kontakt
            </h6>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faSearchLocation} /> 50°46'06" N 15°01'30" E
            </p>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faHome} /> Aeroklub Liberec
            </p>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faEnvelope} /> tom.kulhavy@seznam.cz
            </p>
            <p>
              <FontAwesomeIcon className="mr-3" icon={faPhone} /> +420 720 046 104
            </p>
          </div>
        </div>
        <hr />
        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">
              © 2021 - Databáze letů pro Aeroklub Liberec
            </p>
          </div>
          <div className="col-md-5 col-lg-4 ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <Link className="btn-floating btn-sm rgba-white-slight mx-1" className="text-light" to="/feedback">
                    Feedback <FontAwesomeIcon className="ml-1 mr-3" icon={faCommentDots} />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" className="text-light" target="_blank" href="https://www.facebook.com/tomas.kulhavy.52/">
                    <FontAwesomeIcon className="mr-3" icon={faFacebook} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" className="text-light" target="_blank" href="https://www.instagram.com/tomaslklb/">
                    <FontAwesomeIcon className="mr-3" icon={faInstagram} />
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
