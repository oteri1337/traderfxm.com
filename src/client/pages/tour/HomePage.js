import React from "react";
import TradingViewSlider from "components/charts/SliderComponent";
import TourNavComponent from "components/container/TourNavComponent";
import TourSliderComponent from "components/tour/TourSliderComponent";
import TourWalletComponent from "components/tour/TourWalletComponent";
import TourServicesComponent from "components/tour/TourServicesComponent";
import ContainerComponent from "components/container/TourContainerComponent";
import TourGetStartedComponent from "components/tour/TourGetStartedComponent";

// import TourTestimonialsComponent from "components/tour/TourTestimonialsComponent";
// import BitcoinConverterComponent from "components/tour/TourConverterComponent";
// import TourAboutComponent from "components/tour/TourAboutComponent";
// import TourPressComponent from "components/tour/TourPressComponent";

function HomePage() {
  const parent = React.useRef();

  return (
    <ContainerComponent renderHeader={false}>
      <div className="app-relative bg app-vh-image">
        <div className="app-bg-overlay"></div>
        <TourNavComponent />
        <div ref={parent}>
          <TourSliderComponent parentRef={parent} />
        </div>
      </div>
      <TradingViewSlider />
      <TourGetStartedComponent />
      <TourWalletComponent />
      <TourServicesComponent />
      {/* <TradingViewSlider />
      <TourAboutComponent />
      <BitcoinConverterComponent />
      <TourTestimonialsComponent />
      <TourPressComponent /> */}
    </ContainerComponent>
  );
}

export default HomePage;
