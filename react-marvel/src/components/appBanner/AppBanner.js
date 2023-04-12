import "./appBanner.scss";
import avengers from "../../resources/img/Avengers.png";
import avengersLogo from "../../resources/img/Avengers_logo.png";
import { Outlet } from "react-router-dom";

const AppBanner = () => {
  return (
    <>
      <div className="app__banner content">
        <img src={avengers} alt="Avengers" />
        <div className="app__banner-text">
          New comics every week!
          <br />
          Stay tuned!
        </div>
        <img src={avengersLogo} alt="Avengers logo" />
      </div>
      <Outlet />
    </>
  );
};

export default AppBanner;
