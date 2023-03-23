import LoginForm from "../comps/LoginForm"
import styles from '../styles/Login.module.css'
import Navbar from '../comps/Navbar'

export default function Login() {
    return(
        <>
            <Navbar />     
            <div className={styles.log}>
                <LoginForm/>
            </div>
        </>
    )
}