import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CustomerPage({}) {

  // get the customer from React Router
  const location = useLocation();
  const customer = location.state.customer;

  return (
    <div>
      <Navbar />
      <div className='title'>{customer.name}</div>
      <div>
        <div className='f2'>Accounts</div>
        <div>Chequing: {customer.accounts.chequing}</div>
        <div>Savings: {customer.accounts.savings}</div>
      </div>
    </div>
  )
}
