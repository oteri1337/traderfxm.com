import React from "react";
import { Link } from "react-router-dom";

function TourSliderTwoComponent() {
  return (
    <div className="container center app-vh">
      <div className="container-50" style={{ margin: "auto" }}>
        <br />
        <h1 className="app-slider-title">
          Control Your{" "}
          <span className="app-orange">
            {" "}
            Coins
            <br />
          </span>
          on {PWA_NAME}
        </h1>
        <br />
        <p>
          Avoid stress. Buy, Sell, Send, and Recieve Bitcoin, Ethereum and
          Tether (USDT) with your {PWA_NAME} Wallet.
        </p>
        <br />
        <Link to="/signup.html" className="btn btn-alt">
          CREATE MY WALLET
        </Link>
      </div>
    </div>
  );
}

export default TourSliderTwoComponent;
