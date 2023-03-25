import styles from "../styles/AddPayee.module.css";
import { useState } from "react";

export default function AddPayee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email !== confirmEmail) {
      alert("Email does not match the confirm email.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      alert("Invalid phone number format.");
      return;
    }
  };

  return (
    <div className={styles.outerFrame}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "bold", fontSize: "30px" }}>Add Payee</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Confirm Email:
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button type="submit">Complete</button>
        </form>
      </div>
    </div>
  );
}
