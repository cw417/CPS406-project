import styles from "../styles/Contact.module.css";
import { useState } from "react";
import { emailCheck } from "../lib/validate";
import { useNavigate } from 'react-router-dom'

export default function AddContact(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const customer = props.customer;
  const navigate = useNavigate()

  // Run on form submission and ensure inputs are valid
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email !== confirmEmail) {
      alert("Email does not match the confirm email.");
      return;
    }
    emailCheck(email).then((result) => {
      if (result === false) {
        alert("Account with this email does not exist");
        return;
      } else {
        // Add a contact to the customer object and navigate to dashboard
        customer.addContact({ name: name, email: email });
        setTimeout(function() {
          navigate('/dashboard');
        }, 1000);
      }
    });
  };

  return (
    <div className={styles.outerFrame}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "bold", fontSize: "30px" }}>Add Contact</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={styles.Form}>
          <label className={styles.FormLabel}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className={styles.FormLabel}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.FormLabel}>
            Confirm Email:
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
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
