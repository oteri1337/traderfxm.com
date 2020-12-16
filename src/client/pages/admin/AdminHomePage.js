import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function AdminHomePage() {
  const nav = [
    {
      label: "Control Panel",
    },
  ];

  return (
    <AdminContainerComponent bread={nav}>
      <ul className="collection">
        <li className="collection-item">
          <Link to="/control/transactions/list.html" className="app-list-link">
            <span className="material-icons notranslate">copyright</span>
            <b>Exchange Transactions</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link
            to="/control/nairatransactions/list.html"
            className="app-list-link"
          >
            <span className="material-icons notranslate">payments</span>
            <b>Naira Transactions</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/products/index.html" className="app-list-link">
            <span className="material-icons notranslate">shopping_cart</span>
            <b>Products</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/orders/list.html" className="app-list-link">
            <span className="material-icons notranslate">airport_shuttle</span>
            <b>Orders</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/rates/list.html" className="app-list-link">
            <span className="material-icons notranslate">payment</span>
            <b>Rates</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/users/list.html" className="app-list-link">
            <span className="material-icons notranslate">
              supervised_user_circle
            </span>
            <b>Users</b>
          </Link>
        </li>
      </ul>
    </AdminContainerComponent>
  );
}

export default AdminHomePage;
