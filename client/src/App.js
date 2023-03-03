import { Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage';
import CreateUser from './views/CreateUser';
import Navbar from './components/Navbar';
import './App.css';
import CustomerPage from './views/CustomerPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/customerPage' element={<CustomerPage />} />
      </Routes>
    </div>
  );
}