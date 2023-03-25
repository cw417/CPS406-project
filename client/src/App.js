import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Contacts from './pages/Contacts';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/' element={<Homepage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/accounts/:aNum' element={<Account />} />
        <Route path='/contacts' element={<Contacts />} />
      </Routes>
    </div>
  );
}