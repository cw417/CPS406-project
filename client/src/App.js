import { Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage';
import CreateUser from './views/CreateUser';
import CustomerPage from './views/CustomerPage';
import AdminPage from './views/AdminPage';
import './App.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/customerPage' element={<CustomerPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </div>
  );
}