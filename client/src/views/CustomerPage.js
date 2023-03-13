import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomerTransactionHistory from '../components/CustomerTransactionHistory';
import CustomerAccounts from '../components/CustomerAccounts';

export default function CustomerPage({}) {

  // get the customer from React Router
  const location = useLocation();
  const customer = location.state.customer;
  const navigate = useNavigate();
  
  return (
    <div>
      <Navbar />
      <div className='title'>{customer.name}</div>
      <div className='center'>
        <div>
          <button onClick={() => { navigate('/editCustomer', {state: { customer: customer } }); } }>Edit Account Details</button>
        </div>
        <CustomerAccounts chequing={customer.accounts.chequing} savings={customer.accounts.savings} />

        <div>
          <button onClick={() => { navigate('/transfer', {state: { customer: customer } }); } }>Transfer</button>
          <button onClick={() => { navigate('/deposit', {state: { customer: customer } }); } }>Deposit</button>
          <button onClick={() => { navigate('/payBills', {state: { customer: customer } }); } }>Pay Bills</button>
        </div>

      </div>
      <CustomerTransactionHistory customer={customer} />
    </div>
  )
}
