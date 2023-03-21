import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import Transfer from './pages/Transfer';
import Deposit from './pages/Deposit';
import EditCustomer from './pages/EditCustomer';
import PayBills from './pages/PayBills';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/' element={<Homepage />} />
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