import React from "react";
import TourWalletComponent from "components/tour/TourWalletComponent";
import TourNavComponent from "components/container/TourNavComponent";
import TourSliderComponent from "components/tour/TourSliderComponent";
import TourServicesComponent from "components/tour/TourServicesComponent";
import ContainerComponent from "components/container/TourContainerComponent";
import TourGetStartedComponent from "components/tour/TourGetStartedComponent";

// import TourTestimonialsComponent from "components/tour/TourTestimonialsComponent";
// import BitcoinConverterComponent from "components/tour/TourConverterComponent";
// import TourAboutComponent from "components/tour/TourAboutComponent";
// import TourPressComponent from "components/tour/TourPressComponent";
// import TradingViewSlider from "components/charts/SliderComponent";

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
