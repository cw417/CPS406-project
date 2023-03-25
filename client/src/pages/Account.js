import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../comps/Navbar"
import AccountInfo from "../comps/AccountInfo"
import styles from '../styles/Account.module.css'

export default function Account() {
    const accountId = useParams().aNum
    
    return (
        <>  
            <Navbar/>
            <div className={styles.body}>
                <AccountInfo accountId={accountId}/>
            </div>
        </>
    )
}