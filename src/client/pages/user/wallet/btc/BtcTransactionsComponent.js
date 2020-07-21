import React from "react";
import { months } from "../Months";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";

function BitcoinTransactionsComponent() {
  const { state } = React.useContext(AppContext);
  const { wallet, user } = state;

  const btc_address = user.btc_wallets[0].address;
  const list = { array: wallet.bitcoin.transactions };

  const callback = (props) => {
    const renderChange = () => {
      if (props.balance_change < 0) {
        return (
          <span className="red-text">
            {props.balance_change / 100000000} BTC
          </span>
        );
      }
      return (
        <span className="green-text">
          {props.balance_change / 100000000} BTC
        </span>
      );
    };

    const renderAmount = () => {
      if (props.inputs[0].addresses[0] == btc_address) {
        return (
          <React.Fragment>
            {props.outputs[0].addresses[0]}
            <br />
            <span style={{ color: "red" }}>- {props.outputs[0].value} BTC</span>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          {props.inputs[0].addresses[0]}
          <br />
          <span style={{ color: "green" }}>+ {props.outputs[0].value} BTC</span>
        </React.Fragment>
      );
    };

    const renderDate = () => {
      if (props.time) {
        const date = new Date(props.time * 1000);

        let day = date.getDate();

        if (day < 10) {
          day = "0" + day;
        }

        return (
          <div
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              textAlign: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <p className="app-trading-month" style={{ fontSize: "1.2rem" }}>
              {months[date.getMonth()]}
            </p>
            <span className="app-trading-day" style={{ textAlign: "center" }}>
              {day}
            </span>
          </div>
        );
      }

      return (
        <div
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            textAlign: "center",
            padding: 0,
            margin: 0,
          }}
        >
          PENDING
        </div>
      );
    };

    return (
      <li
        key={props.txid}
        className="collection-item"
        style={{ paddingRight: 0, paddingLeft: 0 }}
      >
        <div className="app-flex app-flex-center">
          {renderDate()}
          <div style={{ flex: 3 }}>{renderAmount()}</div>
        </div>
      </li>
    );
  };

  return <ListComponent {...{ list, callback }} />;
}

export default BitcoinTransactionsComponent;
