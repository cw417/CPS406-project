import styles from "../styles/Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";

export default function HomeNavbar() {
  return (
    <>
      <nav>
        <div className={styles.navbar}>
          <div className={styles.left_navbar}>
            <NavLink href="/">
              <img src={logo} height="50" alt="The Reserve" />
            </NavLink>
          </div>
          <NavLink href="/">
            <div className={styles.company_text}>The Reserve</div>
          </NavLink>

          <div className={styles.right_navbar}>
            <NavLink className={styles.right_navbar_item}>Our Products</NavLink>
            <NavLink className={styles.right_navbar_item}>Features</NavLink>
            <NavLink className={styles.right_navbar_item}>Pricing</NavLink>
            <NavLink className={styles.right_navbar_item} to="/login">
              Sign In
            </NavLink>
          </div>
          <div className={styles.right_navbar}>
            <NavLink className={styles.top_red_round_button} to="/signup">
              Get Started
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
