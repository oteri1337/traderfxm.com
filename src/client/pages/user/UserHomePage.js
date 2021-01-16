import React from "react";
import DismissableComponent from "components/DismissableComponent";
import BtcBalanceComponent from "./wallet/btc/BtcBalanceComponent";
import EthBalanceComponent from "./wallet/eth/EthBalanceComponent";
import UsdtBalanceComponent from "./wallet/usdt/UsdtBalanceComponent";
import NairaBalanceComponent from "./wallet/naira/NairaBalanceComponent";
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
          <DismissableComponent>
            <span>
              Wallets are currently in{" "}
              <a
                href="https://en.wikipedia.org/wiki/Software_testing#Alpha_testing"
                target="_blank"
              >
                beta testing mode
              </a>
              , please fund with only test coins.
            </span>
          </DismissableComponent>
          <div className="row">
            <div className="col l3 s12">
              <NairaBalanceComponent />
            </div>
            <div className="col l3 s12">
              <BtcBalanceComponent />
            </div>
            <div className="col l3 s12">
              <EthBalanceComponent />
            </div>
            <div className="col l3 s12">
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
