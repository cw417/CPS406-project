import HomeNavbar from "../comps/HomeNavbar";
import styles from "../styles/HomePage.css";
import { NavLink, useNavigate } from "react-router-dom";
import desktopMan from "../images/man_on_desktop.png";

export default function Homepage() {

  return (
    <div>
      <HomeNavbar />
      <div className={styles.flex_container}>
        <div>
          <p>Online Banking</p>
          <p>Quick and easy Transfers</p>
          <p>
            Financial services, including free e-transfers, balance check and
            wide range of services - are now available from any devices.
          </p>
          <NavLink to="/signup">Get Started</NavLink>
          <NavLink to="/login">Sign In</NavLink>
        </div>
        <div>
          <NavLink to="/">
            <img src={desktopMan} height="500" alt="The Reserve" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}