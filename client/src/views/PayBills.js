import BackButton from '../components/BackButton';
import CustomerAccounts from '../components/CustomerAccounts'
import Navbar from '../components/Navbar'
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function PayBills() {

  const location = useLocation();
  const customer = location.state.customer;
  const navigate = useNavigate();

  function handlePayBills() {
    navigate('/customerPage', {state: { customer: customer }});
  }

  return (
    <div>
      <Navbar />
      <div className='title'>Pay Bills</div>
      <CustomerAccounts  chequing={customer.accounts.chequing} savings={customer.accounts.savings}/>
    </div>
  )
}
