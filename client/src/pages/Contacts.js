import AddPayee from '../comps/AddPayee'
import AddRecipient from '../comps/AddRecipient'
import Navbar from '../comps/Navbar'

export default function Contacts() {
    return(
        <>  
            <Navbar/>
            <AddPayee/>
            <AddRecipient/>
        </>
    )
}