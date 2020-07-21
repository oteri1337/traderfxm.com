import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "providers/AppProvider";

function UsdtBalanceComponent() {
  const [fetching, setFetching] = React.useState(true);
  const { state, callReducer } = React.useContext(AppContext);
  const { wallet, user } = state;

  const usdt_address = user.usdt_wallets[0].address;

  React.useEffect(() => {
    let mounted = true;

    const asyncOperation = async () => {
      let url;

      url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdac17f958d2ee523a2206206994597c13d831ec7&address=${usdt_address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
      let response = await fetch(url);
      response = await response.json();

      console.log("er", response);

      url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${usdt_address}&startblock=0&endblock=999999999&sort=desc&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
      let transResponse = await fetch(url);
      transResponse = await transResponse.json();

      if (mounted) {
        setFetching(false);
      }

      let balance_map = {};

      if (response.status == "1") {
        const balance_approximate = response.result / 1e6;

        balance_map[usdt_address] = balance_approximate;

        const transactions = transResponse.result;

        callReducer({
          dispatch: "UPDATE_USDT_WALLET",
          data: { balance_approximate, transactions, balance_map },
        });
      }
    };
    asyncOperation();

    return () => {
      mounted = false;
    };
  }, []);

  const style = { paddingLeft: 0, paddingRight: 0, borderRadius: "10px" };
  const iconStyle = { fontSize: "3rem", margin: "10px" };

  const copy = () => {
    navigator.clipboard.writeText(user.usdt_wallets[0].address);
    M.toast({ html: `Copied to clipboard`, displayLength: 1000 });
  };

  return (
    <div>
      <ul className="collection">
        <li className="collection-item center" style={style}>
          {/* {fetching && (
            <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            </div>
          )} */}

          <p className="icon icon-usdt" style={iconStyle} />
          {fetching ? (
            <p>
              <Skeleton count={1} width={100} />
            </p>
          ) : (
            <p> {wallet.usdt.balance_approximate.toFixed(2)} USDT</p>
          )}

          {fetching ? (
            <p>
              <Skeleton count={1} width={150} />
            </p>
          ) : (
            <p> {format("USD", wallet.usdt.balance_approximate)}</p>
          )}
          {/* <p>{wallet.usdt.balance_approximate.toFixed(2)} USDT</p>
          <p>{format("USD", wallet.usdt.balance_approximate)}</p> */}
          <button data-target="modal3" className="btn modal-trigger">
            RECEIVE
          </button>
          <Link to="/user/wallet/usdt/send.html" className="btn" title="Send">
            SEND
          </Link>
        </li>
      </ul>
      <div id="modal3" className="modal" style={{ color: "#000" }}>
        <div className="modal-content center">
          <img
            src={`https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=bitcoin:${user.usdt_wallets[0].address}`}
            alt={user.usdt_wallets[0].address}
          />
          <p>
            {user.usdt_wallets[0].address}{" "}
            <span className="material-icons notranslate" onClick={copy}>
              file_copy
            </span>
          </p>
          <Link to="/user/wallet/usdt/create.html" className="btn-color">
            GENERATE NEW ADDRESS
          </Link>
        </div>
        <div className="modal-footer">
          <a
            className="modal-close waves-effect waves-green btn-flat"
            style={{ color: "#000" }}
          >
            close
          </a>
        </div>
      </div>
    </div>
  );
}

export default UsdtBalanceComponent;
