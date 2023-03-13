import Navbar from '../components/Navbar'
import CustomerList from '../components/CustomerList'
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';

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
