import React from "react";
import { format } from "functions/dom";
import { formatOrder } from "functions/data";
import SpinnerComponent from "components/SpinnerComponent";
import BreadComponent from "components/container/BreadComponent";
import TourNavComponent from "components/container/TourNavComponent";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";
import TourContainerComponent from "components/container/TourContainerComponent";

function OrderReadPage({ match }) {
  const { reference } = match.params;
  const url = `/api/orders/${reference}`;
  const { state } = getRequestThenDispatch(url, "UPDATE_ORDER");
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching } = request;

  const rawData = state.orders.object[reference];

  if (!rawData) {
    return (
      <TourContainerComponent
        bread={[
          { label: "Shop", link: "/shop/products.html" },
          { label: "Order Not Found" },
        ]}
      >
        <div className="container">
          <br />
          <div className="card-panel">
            <p>Order Not Found</p>
          </div>
        </div>
      </TourContainerComponent>
    );
  }

  const data = formatOrder(rawData);

  let nav;

  if (state.user) {
    nav = [
      {
        label: "Orders",
        link: "/shop/orders.html",
      },
      {
        label: `${reference} ${data.total_in_ngn}`,
      },
    ];
  } else {
    nav = [
      {
        label: `${reference} ${data.total_in_ngn}`,
      },
    ];
  }

  const pay = () => {
    FlutterwaveCheckout({
      public_key: PUBLIC_KEY,
      tx_ref: rawData.reference,
      amount: rawData.total_in_ngn,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      // specified redirect URL
      // redirect_url:
      //   "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
      // meta: {
      //   consumer_id: 23,
      //   consumer_mac: "92a3-912ba-1192a",
      // },
      customer: {
        email: rawData.email,
        phone_number: rawData.phone_number,
      },
      callback: function (body) {
        console.log(body);
        callBack(
          "/api/orders/confirm/flutter",
          "UPDATE_ORDE",
          body,
          () => {},
          "PATCH"
        );
      },
      customizations: {
        title: "TraderFX Martketplace",
        description: "Payment for Crypto",
        logo: "https://www.traderfxm.com/assets/images/logo.png",
      },
    });

    // var handler = PaystackPop.setup({
    //   key: "pk_test_f2c23dc93935cb13f5c362d77856827d34a16be4",
    //   email: rawData.email,
    //   amount: rawData.total_in_ngn * 100,
    //   currency: "NGN",
    //   ref: rawData.reference, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    //   metadata: {
    //     custom_fields: [
    //       {
    //         display_name: "Mobile Number",
    //         variable_name: "mobile_number",
    //         value: "+2348012345678",
    //       },
    //     ],
    //   },
    //   callback: function (response) {
    //     const body = { ...response };
    //     callBack(
    //       "/api/orders/confirm/paystack",
    //       "UPDATE_ORDER",
    //       body,
    //       () => {},
    //       "PATCH"
    //     );
    //   },
    //   onClose: function () {
    //     callBack(
    //       "/api/orders/confirm/paystack",
    //       "UPDATE_ORDER",
    //       { reference: rawData.reference },
    //       () => {},
    //       "PATCH"
    //     );
    //   },
    // });
    // handler.openIframe();
  };

  const renderRow = () => {
    return Object.keys(data).map((key) => {
      if (typeof data[key] == "object") {
        return false;
      }

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

  const renderPaystack = () => {
    if (fetching) {
      return <SpinnerComponent />;
    }

    if (rawData.status == 2) {
      return (
        <div>
          <p>
            Your payment has been recieved, your order will be delivered as soon
            as possible
          </p>

          <p>
            Please copy this url or the reference code to monitor your order.
          </p>
        </div>
      );
    }

    return (
      <button className="btn" onClick={pay}>
        PAY WITH FLUTTERWAVE
      </button>
    );
  };

  const renderProducts = () => {
    console.log(rawData);
    return rawData?.products?.map((product) => {
      return (
        <tr key={product.id}>
          <td>
            {product.title} X {product.order_product.quantity}
          </td>
          <td>{format("NGN", product.price)}</td>
        </tr>
      );
    });
  };

  // const renderBread = () => {
  //   if (props.bread) {
  //     return <BreadComponent data={nav} className="container" />;
  //   }
  //   return <Helmet title={PWA_NAME} />;
  // };

  return (
    <TourContainerComponent renderHeader={false}>
      <div className="bg">
        <TourNavComponent />
      </div>
      <BreadComponent data={nav} className="container" />

      <div className="container">
        <div className="card-panel app-mt-1">
          <div className="row">
            <center>
              <h1>{data.total_in_ngn}</h1>
              {renderPaystack()}
            </center>
            <br />

            <table className="striped">
              <tbody>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
                {renderProducts()}
              </tbody>
            </table>
            <br />
            <br />

            <table className="striped">
              <tbody>{renderRow()}</tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
    </TourContainerComponent>
  );
}

export default OrderReadPage;
