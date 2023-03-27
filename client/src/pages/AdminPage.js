import Navbar from '../comps/Navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bank from '../objects/Bank'
import styles from '../styles/AdminPage.module.css'
import AccountsOverview from '../comps/AccountsOverview'
import Customer from '../objects/Customer'
import QuickActions from '../comps/QuickActions'

export default function AdminPage() {

  const [ customers, setCustomers ] = useState(null)
  const admin = sessionStorage.getItem('admin')
  const navigate = useNavigate();
  const reserve = new Bank();
  const [emailSearch, setEmailSearch] = useState(null)
  const [ customer, setCustomer ] = useState(null)

  function getCustomers() {
    reserve.getCustomers().then((data) => {
      setCustomers(data)
    })
  }

  function getCustomer() {
    console.log(emailSearch)
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].email === emailSearch) {
        const tempObject = new Customer(customers[i].username, customers[i].first, customers[i].last, 
          customers[i].address, customers[i].email, customers[i].password, customers[i].chequing, 
          customers[i].savings, customers[i].payees, customers[i].contacts, customers[i]._id)
        setCustomer(tempObject);
        return;
      }
    }
    setCustomer(null)
  }

  useEffect(() => {
    if (admin !== "false") {getCustomers()}
  }, [])

  if (admin === 'false') {
    navigate('/login')
  }

  if (customers === null) {
    return (
    <>
      <h1>Loading...</h1>
    </>)
  } else {
    return (
      <>
        <Navbar />
        <div>
          <div className={styles.title}>
            <h1>🛠️Admin Page</h1></div>
          <div>
            <div className={styles.AdminContainer}>
              <input autoFocus placeholder="Enter the customer email" className={styles.input} type="text" onChange={(event) => {console.log(event.target.value);setEmailSearch(event.target.value)}}/>
              <button className={styles.button} onClick={() => {getCustomer()}}>Go</button>
              {customer !== null ? 
              <>
                <div className={styles.customer_display}>
                  <AccountsOverview customer={customer}/> 
                  <QuickActions customer={customer}/>
                </div>
              </>:
              <></>}
            </div>
            
          </div>
          <div>
          {/* throw customer stuff here */}
          </div>
        </div>
      </>
    )
  }
}
