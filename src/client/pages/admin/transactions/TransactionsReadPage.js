import React from "react";
import { getRequestThenDispatch } from "hooks";
import { formatTransaction } from "functions/data";
import CompleteTransactionComponent from "./CompleteTransactionComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function TransactionsReadPage({ location, match }) {
  const { reference } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/transactions/${reference}`,
    "UPDATE_TRANSACTION"
  );

  const oldDta = state.transactions.object[reference] || location.props;

  if (!oldDta) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">
          <h1>Not Found</h1>
        </div>
      </AdminContainerComponent>
    );
  }

  const data = formatTransaction(oldDta);

  let title = "";

  if (oldDta.status == 1) {
    title = `Pending Transaction ${data.amount_in_ngn}`;
  } else {
    title = `Send ${data.amount_in_crypto} to ${data.reference}`;
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Transactions",
      link: "/control/transactions/list.html",
    },
    {
      label: title,
    },
  ];

  const renderRow = () => {
    return Object.keys(data).map((key) => {
      if (typeof key == "object") return false;
      return (
        <tr key={key}>
          <td style={{ textTransform: "uppercase" }}>
            {key.replace(/_/g, " ")}
          </td>
          <td>{data[key]}</td>
        </tr>
      );
    });
  };

  const renderCompleteButton = () => {
    if (oldDta.status == 2) {
      return <CompleteTransactionComponent id={oldDta.id} />;
    }
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l3 s12">
            <center>{renderCompleteButton()}</center>
          </div>
          <div className="col l9 s12">
            <table className="striped">
              <tbody>{renderRow()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminContainerComponent>
  );
}

export default TransactionsReadPage;
