import styles from "../styles/AddRecipient.module.css";
import { useState } from "react";

export default function AddPayee() {
  const [payeeName, setPayeeName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[-a-zA-Z\s]+$/.test(payeeName)) {
      alert(
        "Invalid payee name. Payee name can only contain letters, spaces, and hyphens."
      );
      return;
    }
    if (!/^\d+$/.test(accountNumber)) {
      alert("Invalid account number. Account number can only contain digits.");
      return;
    }
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
