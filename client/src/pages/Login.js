import LoginForm from "../comps/LoginForm"
import styles from '../styles/Login.module.css'
import Navbar from '../comps/Navbar'
import { useState, useEffect } from "react"
import Bank from '../objects/Bank'
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [bank, setBank] = useState(new Bank());
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    
    useEffect(() => {
      if (userId != null) {navigate('/dashboard')}
      async function getCustomers() {
        const response = await fetch(`http://localhost:5000/customer/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const customers = await response.json();
        const newBank = new Bank('The Reserve');
        newBank.setCustomers(customers)
        setBank(newBank)
      }
      getCustomers();
    }, [])

    return(
        <>
            <Navbar />     
            <div className={styles.log}>
                <LoginForm/>
            </div>
        </>
    )
}