import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <div>
      <nav className='nav'>

        <NavLink className='nav-link' to='/'>
          <div>Home</div>
        </NavLink>

        <NavLink className='nav-link' to='/create'>
          <div>Create Account</div>
        </NavLink>

        <button onClick={() => { navigate(-1); }}>Back</button>

      </nav>
    </div>
  )
}
