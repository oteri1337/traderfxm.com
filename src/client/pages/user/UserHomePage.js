import React from "react";
import BtcBalanceComponent from "./wallet/btc/BtcBalanceComponent";
import EthBalanceComponent from "./wallet/eth/EthBalanceComponent";
import UsdtBalanceComponent from "./wallet/usdt/UsdtBalanceComponent";
import UserContainerComponent from "components/container/UserContainerComponent";
import CombinedTransactionsComponent from "./wallet/CombinedTransactionsComponent";

function UserHomePage() {
  React.useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, []);

  return (
    <UserContainerComponent showFooter={false}>
      <div className="bg app-py-1">
        <div className="container">
          <div className="row">
            <div className="col l4 s12">
              <BtcBalanceComponent />
            </div>
            <div className="col l4 s12">
              <EthBalanceComponent />
            </div>
            <div className="col l4 s12">
              <UsdtBalanceComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <br />
        <CombinedTransactionsComponent />
      </div>
    </UserContainerComponent>
  );
}

export default UserHomePage;
