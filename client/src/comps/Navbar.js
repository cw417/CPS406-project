import styles from "../styles/Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
    navigate("/login");
  }

  const [customer, setCustomer] = useState(null);
  const userId = localStorage.getItem("userId");
  const admin = localStorage.getItem("admin");

  function getCustomer() {
    axios.get(`http://localhost:5000/customer/${userId}`).then((response) => {
      setCustomer(response.data);
    });
  }

  useEffect(() => {
    if (userId != null) {
      getCustomer();
    }
  }, []);

  return (
    <>
      <nav>
        <div className={styles.navbar}>
          <div className={styles.left_navbar}>
            <NavLink to="/">
              <img src={logo} height="50" alt="The Reserve" />
            </NavLink>
          </div>
          <div className={styles.right_navbar}>
            {customer !== null || admin === "true" ? (
              <>
                {admin !== "true" ? (
                  <>
                    <NavLink
                      className={styles.right_navbar_item}
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink className={styles.right_navbar_item} to="/edit">
                      Account Settings
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className={styles.right_navbar_item} to="/admin">
                      Dashboard
                    </NavLink>
                  </>
                )}
                <a className={styles.right_navbar_item} onClick={signOut}>
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
