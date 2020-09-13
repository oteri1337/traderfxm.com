import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render = () => {
    return (
      <footer className="bg center">
        <div className=" row app-py-3">
          <div className="container" style={{ fontSize: "16px" }}>
            <div className="col l2 s12">
              <div>
                <ul>
                  <b>Sell Crypto</b>
                  <li>
                    <Link to="/transactions/sell.html">Sell Bitcoin</Link>
                  </li>
                  <li>
                    <Link to="/transactions/sell.html?currency=ETH">
                      Sell Ethereum
                    </Link>
                  </li>
                  <li>
                    <Link to="/transactions/sell.html?currency=ETH">
                      Sell Tether (USDT)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col l2 s12">
              <div>
                <ul>
                  <b>Buy Crypto</b>
                  <li>
                    <Link to="/transactions/buy.html">Buy Bitcoin</Link>
                  </li>
                  <li>
                    <Link to="/transactions/buy.html?currency=ETH">
                      Buy Ethereum
                    </Link>
                  </li>
                  <li>
                    <Link to="/transactions/buy.html?currency=ETH">
                      Buy Tether (USDT)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col l2 s12">
              <div>
                <ul>
                  <b>TraderFX</b>
                  {/* <li>
                    <Link to="/signup.html">Create Account</Link>
                  </li> */}
                  <li>
                    <Link to="/shop/products.html">Traderfxm Shop</Link>
                  </li>
                  <li>
                    <Link to="/signin.html">Traderfxm Login</Link>
                  </li>
                  <li>
                    <Link to="/terms.html">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col l6 s12 app-desktop-right">
              <p>
                <span className="material-icons notranslate">phone</span> +2341
                234 5678
              </p>

              <p>
                <span className="material-icons notranslate">mail</span>{" "}
                {MAIL_NAME}
              </p>

              <span className="material-icons notranslate">location_on</span>
              <span>98 Green Road, Farmgate, Bitcoin Estate</span>
            </div>
          </div>
        </div>
      </footer>
    );
  };
}

export default Footer;
