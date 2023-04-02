import Navbar from "../comps/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bank from "../objects/Bank";
import styles from "../styles/AdminPage.module.css";
import AccountsOverview from "../comps/AccountsOverview";
import Customer from "../objects/Customer";
import QuickActions from "../comps/QuickActions";
import { MdDeleteForever } from "react-icons/md";

export default function AdminPage() {
  const [customers, setCustomers] = useState(null);
  const admin = localStorage.getItem("admin");
  const navigate = useNavigate();
  const reserve = new Bank();
  const [emailSearch, setEmailSearch] = useState(null);
  const [customer, setCustomer] = useState(null);

  function getCustomers() {
    reserve.getCustomers().then((data) => {
      setCustomers(data);
    });
  }

  function getCustomer() {
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].email === emailSearch) {
        const tempObject = new Customer(
          customers[i].username,
          customers[i].first,
          customers[i].last,
          customers[i].address,
          customers[i].email,
          customers[i].password,
          customers[i].chequing,
          customers[i].savings,
          customers[i].payees,
          customers[i].contacts,
          customers[i]._id
        );
        setCustomer(tempObject);
        return;
      }
    }
    setCustomer(null);
  }

  function deleteCustomer() {
    customer.removeCustomer();
    navigate(0);
  }

  useEffect(() => {
    if (admin !== "false" && admin !== null) {
      getCustomers();
    } else {
      navigate("/login");
    }
  }, []);

  if (customers === null) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>🛠️Admin Page</h1>
            <h4>Number of users: {customers.length}</h4>
          </div>
          <div className={styles.ParentAdminContainer}>
            <div className={styles.AdminContainer}>
              <input
                autoFocus
                placeholder="Enter the customer email"
                className={styles.input}
                type="text"
                onChange={(event) => setEmailSearch(event.target.value)}
              />
              <button
                className={styles.button}
                onClick={() => {
                  getCustomer();
                }}
              >
                Go
              </button>
            </div>
          </div>
          <div className={styles.CustomerContainer}>
            {customer !== null ? (
              <>
                <div className={styles.customer_display}>
                  <MdDeleteForever
                    onClick={() => {
                      deleteCustomer();
                    }}
                    size={100}
                  />
                  <AccountsOverview customer={customer} />
                  <QuickActions customer={customer} />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
}
