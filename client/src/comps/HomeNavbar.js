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
          <div className={styles.right_navbar}>
            {null === null ? (
              <>
                <NavLink className={styles.right_navbar_item} to="/dashboard">
                  Dashboard
                </NavLink>
                <a className={styles.right_navbar_item}>
                  Sign Out
                </a>
              </>
            ) : (
              <>
                <NavLink className={styles.right_navbar_item} to="/login">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
