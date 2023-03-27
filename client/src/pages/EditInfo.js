import Navbar from '../comps/Navbar';
import styles from "../styles/EditInfo.module.css"


export default function EditInfo() {
    return (
        <div className={styles.div}>
            <Navbar/>
            <div className={styles.bigheader}>
                    Account Information - Account Number Here
                </div>
            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.titles}>
                    Change Name
                    </div>
                    <div className={styles.points}>
                        <p>Current Account Name:</p>
                        <label for="accountName">New Account Name: </label>
                        <input type="text" id="accountName" name="accountName" placeholder="Enter New Account Name: " size="20"/>
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
                    <input type="text" id="oldPass" name="oldPass" placeholder="Enter Old Password: "/>

                    <label for="newPass">New Password: </label>
                    <input type="text" id="newPass" name="newPass" placeholder="Enter New Password: "/>

                    <label for="newPass">Re-enter New Password: </label>
                    <input type="text" id="newPass" name="newPass" placeholder="Re-enter New Password: "/>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.titles}>
                    Change Email Address
                    </div>
                    <div className={styles.points}>
                        <p> Current Email Address: </p>
                        <label for="email">New Email Address: </label>
                        <input type="text" id="email" name="email" placeholder="Enter new Email Address"/>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.box1}>
                    <div className={styles.titles}>
                    Change Home Address
                    </div>
                    <div className={styles.points}>
                        <p> Current Home Address: </p>
                        <label for="address">New Home Address: </label>
                        <input type="text" id="home" name="home" placeholder="Enter new Home Address"/>
                    </div>
                </div>
            </div>
            <div className={styles.submitbutton}>
            <   button class="confirmbutton">Confirm Changes</button>
            </div>
        </div>
    )
}