import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage';
import CreateUser from './views/CreateUser';
import CustomerPage from './views/CustomerPage';
import AdminPage from './views/AdminPage';
import Transfer from './views/Transfer';
import Deposit from './views/Deposit';
import EditCustomer from './views/EditCustomer';
import PayBills from './views/PayBills';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/customerPage' element={<CustomerPage />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/editCustomer' element={<EditCustomer />} />
        <Route path='/payBills' element={<PayBills />} />
      </Routes>
    </div>
  );
}