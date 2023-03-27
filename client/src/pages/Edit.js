import Navbar from '../comps/Navbar';
import styles from "../styles/Edit.module.css"
import axios from 'axios'
import { useState, useEffect } from 'react';
import Customer from '../objects/Customer'
import { useNavigate } from 'react-router-dom';

export default function Edit() {

    const [customer, setCustomer] = useState(null);
    const userId = localStorage.getItem("userId");
    const [newEmail, setNewEmail] = useState(null);
    const [newName, setNewName] = useState(null);
    const [newAddress, setNewAddress] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);

    function updateAccount() {
        if (newEmail !== null) {
            customer.email = newEmail
        }
        if (newName !== null) {
            customer.username = newName
        }
        if (newAddress !== null) {
            customer.address = newAddress
        }
        if (newPassword !== null && confirmNewPassword === newPassword && oldPassword === customer.password) {
            customer.password = newPassword
        }
        customer.updateCustomer()
    }

    async function getCustomer() {
        axios.get(`http://localhost:5000/customer/${userId}`).then((response) => {
        var data = response.data;
        var custObject = new Customer(
            data.username,
            data.first,
            data.last,
            data.address,
            data.email,
            data.password,
            data.accounts.chequing,
            data.accounts.savings,
            data.payees,
            data.contacts,
            data._id
        );
        setCustomer(custObject);
        });
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (userId != null) {
            getCustomer();
        } else {
            navigate("/login");
        }
    }, []);

    if (customer === null) {
        return (
            <>
            <h1>Loading...</h1>
            </>
        );
    }

    return (
        <div className={styles.div}>
            <Navbar/>
            <div className={styles.bigheader}>
                    Account Information - {customer.last}, {customer.first} 
                </div>
            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.titles}>
                    Change Name
                    </div>
                    <div className={styles.points}>
                        <p>Current Account Name: {customer.username}</p>
                        <label for="accountName">New Account Name: </label>
                        <input onChange={(event) => setNewName(event.target.value)} className={styles.input} type="text" id="accountName" name="accountName" placeholder="Enter New Account Name: " size="20"/>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.titles}>
                        Change Password
                    </div>
                    <div className={styles.points}>
                    <label for="oldPass">Old Password: </label>
                    <input onChange={(event) => setOldPassword(event.target.value)} className={styles.input} type="text" id="oldPass" name="oldPass" placeholder="Enter Old Password: "/>

                    <label for="newPass">New Password: </label>
                    <input onChange={(event) => setNewPassword(event.target.value)} className={styles.input} type="text" id="newPass" name="newPass" placeholder="Enter New Password: "/>

                    <label for="newPass">Re-enter New Password: </label>
                    <input onChange={(event) => setConfirmNewPassword(event.target.value)} className={styles.input} type="text" id="newPass" name="newPass" placeholder="Re-enter New Password: "/>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.titles}>
                    Change Email Address
                    </div>
                    <div className={styles.points}>
                        <p> Current Email Address: {customer.email}</p>
                        <label for="email">New Email Address: </label>
                        <input onChange={(event) => setNewEmail(event.target.value)} className={styles.input} type="text" id="email" name="email" placeholder="Enter new Email Address"/>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.titles}>
                    Change Home Address
                    </div>
                    <div className={styles.points}>
                        <p> Current Home Address: {customer.address}</p>
                        <label for="address">New Home Address: </label>
                        <input onChange={(event) => setNewAddress(event.target.value)} className={styles.input} type="text" id="home" name="home" placeholder="Enter new Home Address"/>
                    </div>
                </div>
            </div>
            <button class="confirmbutton" onClick={() => updateAccount()} className={styles.buttoncolor}>Confirm Changes</button>
        </div>
    )
}