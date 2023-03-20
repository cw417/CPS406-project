import Navbar from '../comps/Navbar'
import CustomerList from '../comps/CustomerList'
import { useLocation } from 'react-router-dom';

export default function AdminPage() {

  const location = useLocation();
  const customers = location.state.customers;

  return (
    <div>
      <Navbar />
      <div className='title'>Admin</div>
      <CustomerList customers={customers}/>
    </div>
  )
}
