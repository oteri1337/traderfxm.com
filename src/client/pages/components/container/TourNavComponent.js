import React from "react";
import { Link } from "react-router-dom";
import { getNavClassName } from "hooks";
import { AppContext } from "providers/AppProvider";
import ThemeChangerNavComponent from "./ThemeChangerNavComponent";

function TourNavComponent() {
  const { state, signOut } = React.useContext(AppContext);
  const { user } = state;

  React.useLayoutEffect(() => {
    const dropdown = document.querySelectorAll(".dropdown-trigger");
    const options = {
      constrainWidth: false,
      coverTrigger: false,
      hover: true,
      closeOnClick: false,
    };
    if (window.M) {
      M.Dropdown.init(dropdown, options);
    }
  }, []);

  const className = getNavClassName();

  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  });

  const renderUser = () => {
    if (user) {
      return (
        <li>
          <Link to="/user/auth/account.html" className="hover">
            {user.account_name}
          </Link>
        </li>
      );
    }

    return (
      <li>
        <Link to="/signin.html" className="hover">
          My Account
        </Link>
      </li>
    );
  };

  const renderSignIn = () => {
    if (state.user) {
      return (
        <li>
          <a className="hover" onClick={signOut}>
            <span className="material-icons notranslate">
              power_settings_new
            </span>
          </a>
        </li>
      );
    }
    return (
      <li>
        <Link to="/signin.html" className="hover">
          <span className="material-icons notranslate">account_circle</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="navbar-fixed">
      <nav className={className}>
        <ul>
          <li>
            <a
              data-target="mobile-demo"
              className="sidenav-trigger show-on-large"
            >
              <span className="material-icons notranslate">menu</span>
            </a>
          </li>
        </ul>
        <Link to="/" className="brand-logo">
          {PWA_NAME}
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link
              to="/transactions/sell.html"
              className="hover dropdown-trigger"
              data-target="sell"
            >
              SELL CRYPTO
            </Link>
          </li>
          <ul id="sell" className="dropdown-content">
            <li>
              <Link to="/transactions/sell.html">Sell Bitcoin</Link>
            </li>
            <li>
              <Link to="/transactions/sell.html?currency=ETH">
                Sell Ethereum
              </Link>
            </li>
            <li>
              <Link to="/transactions/sell.html?currency=USDT">
                Sell Tether (USDT)
              </Link>
            </li>
          </ul>

          <li>
            <Link
              to="/transactions/buy.html"
              className="hover dropdown-trigger"
              data-target="buy"
            >
              BUY CRYPTO
            </Link>
          </li>
          <ul id="buy" className="dropdown-content">
            <li>
              <Link to="/transactions/buy.html">Buy Bitcoin</Link>
            </li>
            <li>
              <Link to="/transactions/buy.html?currency=ETH">Buy Ethereum</Link>
            </li>
            <li>
              <Link to="/transactions/buy.html?currency=USDT">
                Buy Tether (USDT)
              </Link>
            </li>
          </ul>

          <li>
            <Link
              to="/shop/products.html"
              className="hover"
              className="hover dropdown-trigger"
              data-target="shop"
            >
              Shop
            </Link>
          </li>
          <ul id="shop" className="dropdown-content">
            <li>
              <Link to="/shop/categories/list.html">Categories</Link>
            </li>
            <li>
              <Link to="/shop/products.html">All Products</Link>
            </li>
          </ul>
          {renderUser()}
          <ThemeChangerNavComponent />
          <li>
            <Link to="/shop/cart.html" title="Cart">
              <span className="material-icons notranslate">shopping_cart</span>(
              {Object.keys(state.cart).length})
            </Link>
          </li>
          {renderSignIn()}
        </ul>

        <ul id="nav-mobile" className="right hide-on-large-only">
          <li>
            <Link to="/shop/cart.html" title="Cart">
              <span
                className="material-icons notranslate"
                style={{ padding: 0 }}
              >
                shopping_cart
              </span>
              ({Object.keys(state.cart).length})
            </Link>
          </li>
          {renderSignIn()}
          {/* <li>
            <Link to="/signin.html" className="hover">
              <span
                className="material-icons notranslate"
                style={{ padding: 0 }}
              >
                account_circle
              </span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default TourNavComponent;
