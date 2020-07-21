import React from "react";
// import { sendRequestThenDispatch } from "hooks";
// import SpinnerComponent from "components/SpinnerComponent";
// import { getBtcAddressBalance, getEthAddressBalance } from "functions/http";

function SellPayComponent({ data, rawData }) {
  const [received, setReceived] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  // const { href } = window.location.href;
  // return (
  //   <center>
  //     <form action="https://www.coinpayments.net/index.php" method="post">
  //       <input type="hidden" name="cmd" value="_pay_simple" />
  //       <input type="hidden" name="reset" value="1" />
  //       <input type="hidden" name="email" value={rawData.email} />
  //       <input type="hidden" name="phone" value={rawData.phone_number} />
  //       <input type="hidden" name="currency" value={data.symbol} />
  //       <input type="hidden" name="allow_currencies" value={data.symbol} />
  //       <input type="hidden" name="amountf" value={rawData.amount_in_crypto} />
  //       <input type="hidden" name="item_name" value={rawData.reference} />
  //       <input type="hidden" name="first_name" value={rawData.account_name} />
  //       <input type="hidden" name="success_url" value={href} />
  //       <input type="hidden" name="cancel_url" value={href} />
  //       <input
  //         type="hidden"
  //         name="merchant"
  //         value="f4ba7bb032cdcd0dd3ce211bdbb6e9ce"
  //       />
  //       <input
  //         type="image"
  //         src="https://www.coinpayments.net/images/pub/buynow-wide-blue.png"
  //         alt="Buy Now with CoinPayments.net"
  //       />
  //     </form>
  //   </center>
  // );

  // const { callBack } = sendRequestThenDispatch();

  // React.useEffect(() => {
  //   const asyncOperation = async () => {
  //     if (rawData.cryptoId == 1) {
  //       const balance = await getBtcAddressBalance(data.address);
  //       setReceived(balance);
  //     }
  //     // if (rawData.cryptoId == 2) {
  //     //   // getEthBal();
  //     // }
  //   };

  //   asyncOperation();
  // }, []);

  // const getBtcBal = async () => {
  //   try {
  //     setFetching(true);
  //     let response = await fetch(
  //       `https://insight.bitpay.com/api/addr/${data.address}`
  //     );
  //     response = await response.json();
  //     setFetching(false);
  //     setReceived(response.totalReceived);
  //     if (response.totalReceived >= data.amount) {
  //       callBack("/api/sales/confirm", "UPDATE_SALE", { id: data.id });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setFetching(false);
  //   }
  // };

  // const getEthBal = async () => {
  //   try {
  //     setFetching(true);
  //     let response = await fetch(
  //       `http://api.ethplorer.io/getAddressInfo/${data.address}?apiKey=freekey`
  //     );
  //     response = await response.json();
  //     setFetching(false);
  //     setReceived(response.ETH.balance);
  //     if (response.ETH.balance >= data.amount) {
  //       callBack("/api/sales/confirm", "UPDATE_SALE", { id: data.id });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setFetching(false);
  //   }
  // };

  // const renderConfirmationButton = () => {
  //   if (received > 0 && received < data.amount) {
  //     <div>
  //       <p>
  //         Received: {received} {data.symbol}
  //       </p>
  //       {/* // proceed without complete payment */}
  //       {/* <button className="btn" onClick={getBtcBal}>
  //       Confirm Bitcoin Payment
  //     </button> */}
  //     </div>;
  //   }

  //   if (received >= data.amount) {
  //     return (
  //       <div>
  //         <p>
  //           Received: {received} {data.symbol}
  //         </p>
  //         <p>
  //           Your payment has been received, further confirmation in progress
  //         </p>
  //         <SpinnerComponent />
  //       </div>
  //     );
  //   }

  //   if (fetching) {
  //     return <SpinnerComponent />;
  //   }

  //   if (data.cryptoId == 1) {
  //     return (
  //       <div>
  //         <p>
  //           Received: {received} {data.symbol}
  //         </p>
  //         <button className="btn" onClick={getBtcBal}>
  //           Confirm Bitcoin Payment
  //         </button>
  //       </div>
  //     );
  //   }

  //   if (data.cryptoId == 2) {
  //     return (
  //       <div>
  //         <p>
  //           Received: {received} {data.symbol}
  //         </p>
  //         <button className="btn" onClick={getEthBal}>
  //           Confirm Ethereum Payment
  //         </button>
  //       </div>
  //     );
  //   }
  // };

  return (
    <div>
      <center>
        <p>
          Please send {data.amount_in_crypto} to the address below to proceed{" "}
        </p>
        <p>
          <b>{data.address}</b>
        </p>
        <p> or scan the QR code below with your wallet app.</p>
        <p>
          You will receive {data.amount_in_ngn} via {data.bank_name}{" "}
          {data.account_number} {data.account_name} as soon as your payment is
          received.
        </p>
      </center>
      <br />
      <center>
        <img
          src={`https://chart.googleapis.com/chart?cht=qr&chl=${data.currency}:${data.address}?amount=${rawData.amount_in_crypto}&chs=160x160&chld=L|0`}
          alt={data.address}
        />

        <p>Expected: {data.amount_in_crypto}</p>
        <p>
          Received: {received.toFixed(8)} {data.symbol}
        </p>

        <button className="btn">Confirm Payment</button>
      </center>
    </div>
  );
}

export default SellPayComponent;
