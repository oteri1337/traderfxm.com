import React from "react";
import ContainerComponent from "components/container/TourContainerComponent";

function AboutPage() {
  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "About Us",
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="container app-py-3">
        <div className="card-panel">
          <div className="container">
            <p>
              TraderFX is a Nigerian founded data tokenization and traditional
              finance marketplace with RC NO:3126939.We design, jointly
              manufacture, sell, buy, tokenize and utilize any financial
              instrument, driving innovations in the next generation
              technologies of data. "TraderFX" the name means Trader's Foreign
              Exchange.
            </p>

            <p>
              We launched our platform Jan 31st starting the market with the two
              most influential data tokenized asset, BTC, USDT and ETH. Our
              application fosters a dynamic and interactive ecosystem. We look
              to offer a broader spectrum of services. Contact:
              info@traderfxm.com for enquires
            </p>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default AboutPage;
