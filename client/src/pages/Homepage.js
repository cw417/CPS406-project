import HomeNavbar from "../comps/HomeNavbar";
import AddRecipient from "../comps/AddRecipient";
import AddPayee from "../comps/AddPayee";
import styles from "../styles/HomePage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import desktopMan from "../images/man_on_desktop.png";

export default function Homepage() {
  return (
    <div>
      <AddPayee />
      <AddRecipient/>
      <HomeNavbar />
      <div className={styles.outer_box}>
        <div className={styles.left_box}>
          <div className={styles.first_box}>
            <p>Online Banking</p>
          </div>
          <div className={styles.second_box}>
            <p>
              <span className={styles.red_bold_text}>Quick</span> and <br />
              easy&nbsp;<span className={styles.bold_text}>Transfers</span>
            </p>
          </div>
          <div className={styles.third_box}>
            <p>
              Financial services, including free e-transfers, balance check and
              wide range of services are now available from any devices.
            </p>
          </div>

          <div className={styles.grid_container}>
            <div className={styles.grid_item1}>
              <p>Already a member?</p>
            </div>
            <NavLink className={styles.grid_item2} to="/signup">
              <div>Get Started</div>
            </NavLink>
            <NavLink to="/login" className={styles.grid_item3}>
              <div>Sign in</div>
            </NavLink>
          </div>
        </div>
        <div className={styles.right_box}>
          <img src={desktopMan} height="500" alt="The Reserve" />
        </div>
      </div>
    </div>
  );
}
