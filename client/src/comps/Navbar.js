import styles from '../styles/Navbar.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../images/Logo.png'
import { useState, useEffect } from 'react'
import axios from 'axios'


export default function Navbar() {
  
  const navigate = useNavigate()

  function signOut() {
    localStorage.removeItem('userId')
    localStorage.removeItem('admin')
    navigate('/login')
  }

  const [ customer, setCustomer ] = useState(null)
  const userId = localStorage.getItem('userId')

  function getCustomer() {
    axios.get(`http://localhost:5000/customer/${userId}`).then(response => {
      setCustomer(response.data)
    })
  }

  useEffect(() => {
    if (userId != null) {getCustomer()}
  }, [])

  return(
    <>
      <nav>
        <div className={styles.navbar}>
            <div className={styles.left_navbar}>
                <NavLink href="/"><img src={logo} height='50' alt='The Reserve'/></NavLink>
            </div>
            <div className={styles.right_navbar}>
              {customer !== null ? 
              <>
                <NavLink className={styles.right_navbar_item} to="/accounts">Accounts</NavLink>
                <NavLink className={styles.right_navbar_item} to="/transfer">Transfer</NavLink>
                <NavLink className={styles.right_navbar_item} to="/deposit">Deposit</NavLink>
                <NavLink className={styles.right_navbar_item} to="/edit">Edit</NavLink>
                <NavLink className={styles.right_navbar_item} to="/bills">Bills</NavLink>
                <a className={styles.right_navbar_item} onClick={signOut}>Sign Out</a>
              </>
              :
              <>
                <NavLink className={styles.right_navbar_item} to="/login">Login</NavLink>
              </>
              }
            </div>
        </div>
      </nav>
    </>
  );
}