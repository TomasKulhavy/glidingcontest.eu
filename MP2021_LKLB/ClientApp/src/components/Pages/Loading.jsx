import React from "react";
import Loader from "react-loader-spinner";
import "./style.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="text-center align-middle center">
        <Loader type="TailSpin" color="#00BFFF" height={40} width={40}/>
      </div>
    </div>
  );
};
export default Loading;