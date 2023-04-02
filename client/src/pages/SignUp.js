import SignUpForm from "../comps/SignupForm";
import Navbar from '../comps/Navbar'
import styles from '../styles/Login.module.css'

export default function SignUp() {
    return(
        <>
            <Navbar/>
            <div className={styles.log}>
            <SignUpForm/>
            </div>
        </>
    )
}
