import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../comps/Navbar"
import AccountInfo from "../comps/AccountInfo"

export default function Account() {
    const accountId = useParams().aNum
    
    return (
        <>
            <Navbar/>
            <AccountInfo accountId={accountId}/>
        </>
    )
}