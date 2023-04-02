import styles from "../styles/Contact.module.css";
import { useState } from "react";
import { accountCheck } from "../lib/validate";
import { useNavigate } from 'react-router-dom'

export default function AddPayee(props) {
  const [payeeName, setPayeeName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const customer = props.customer;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[-a-zA-Z\s]+$/.test(payeeName)) {
      alert(
        "Invalid payee name. Payee name can only contain letters, spaces, and hyphens."
      );
      return;
    }
    accountCheck(accountNumber).then((result) => {
      if (result === false) {
        alert("Account Number Does Not Exist");
        return;
      } else {
        customer.addPayee({ name: payeeName, accountNumber: accountNumber });
        setTimeout(function() {
          navigate('/dashboard');
        }, 1000);
      }
    });
  };

  return (
    <div className={styles.outerFrame}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "bold", fontSize: "30px" }}>Add Payee</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={styles.Form}>
          <label className={styles.FormLabel}>
            Payee Name:
            <input
              type="text"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
            />
          </label>
          <label className={styles.FormLabel}>
            Account Number:
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </label>
          <button className={styles.FormButton} type="submit">
            Complete
          </button>
        </form>
      </div>
    </div>
  );
}
