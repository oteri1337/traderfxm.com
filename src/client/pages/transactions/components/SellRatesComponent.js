import React from "react";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";

const format = (currency, amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

function RatesListComponent() {
  const { state } = getRequestThenDispatch("/api/rates/sell", "UPDATE_RATES");

  const list = state.rates;

  const callback = (props) => {
    let className = "material-icons notranslate";

    let upper_limit = "";

    if (props.upper_limit) {
      upper_limit = `$${props.upper_limit}`;
    }

    return (
      <tr key={props.id}>
        <td className={className} style={{ top: "15px" }}>
          copyright
        </td>
        <td>${props.lower_limit}</td>
        <td>{upper_limit}</td>
        <td>
          <s>N</s>
          {props.rate}/$
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table className="striped">
        <tbody>
          <ListComponent style="none" {...{ list, callback }} />
        </tbody>
      </table>
      <br />
      {/* <table className="striped">
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>
              <span
                className="icon icon-btc"
                style={{ fontSize: "20px" }}
              ></span>
            </td>
            <td style={{ textAlign: "center" }}>${state.prices.bitcoin.usd}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>
              <span
                className="icon icon-eth"
                style={{ fontSize: "20px" }}
              ></span>
            </td>
            <td style={{ textAlign: "center" }}>
              ${state.prices.ethereum.usd}
            </td>
          </tr>
        </tbody>
      </table> */}
      <br />
    </div>
  );
}

export default RatesListComponent;
