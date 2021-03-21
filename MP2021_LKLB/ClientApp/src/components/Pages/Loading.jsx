import React from "react";
import Loader from "react-loader-spinner";
import { Row } from "reactstrap";
import "./style.css";

const Loading = () => {
  return (
    <div className="loading d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Loader type="TailSpin" color="#00BFFF" height={30} width={30}/>
        <Row>
          <div>
            <p className="mb-1 mt-1">Nahrávám...</p>
          </div>
        </Row>
      </div>
    </div>
  );
};
export default Loading;