import LoginForm from "../comps/LoginForm"
import styles from '../styles/login.module.css'
import Navbar from '../comps/Navbar'

export default function Login() {
    return(
        <>
        
        <div >
             <Navbar />
            
            
      
        </div>
        <div className={styles.log}>
            <LoginForm/>

        </div>
        
        </>
        
        
    )
}