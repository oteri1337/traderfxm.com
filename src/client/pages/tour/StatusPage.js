import React from "react";
import ContainerComponent from "components/container/TourContainerComponent";

function StatusPage() {
  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Status Page",
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="container app-py-3">
        <div className="card-panel">
          <div className="container center">
            <a
              target="_blank"
              href="https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
            >
              Coingecko
            </a>
            <br />
            <br />
            <a
              target="_blank"
              href={`https://blockchain.info/rawaddr/15xxKf38HnyP9MbmNcjvQhTLW6aKBhFxo1`}
            >
              Blockchain
            </a>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default StatusPage;
