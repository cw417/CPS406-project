import styles from '../styles/Navbar.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../images/Logo.png'

export default function Navbar() {
  
  const navigate = useNavigate()

  function signOut() {
    localStorage.removeItem('userId')
    localStorage.removeItem('admin')
    navigate('/login')
  }

  return(
    <>
      <nav>
        <div className={styles.navbar}>
            <div className={styles.left_navbar}>
                <NavLink href="/"><img src={logo} height='50'/></NavLink>
            </div>
            <div className={styles.right_navbar}>
                <NavLink className={styles.right_navbar_item} to="/accounts">Accounts</NavLink>
                <NavLink className={styles.right_navbar_item} to="/transfer">Transfer</NavLink>
                <NavLink className={styles.right_navbar_item} to="/deposit">Deposit</NavLink>
                <NavLink className={styles.right_navbar_item} to="/edit">Edit</NavLink>
                <NavLink className={styles.right_navbar_item} to="/bills">Bills</NavLink>
                <a className={styles.right_navbar_item} href="" onClick={signOut}>Sign Out</a>
            </div>
        </div>
      </nav>
    </>
  );
}