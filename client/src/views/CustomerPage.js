import { useLocation } from "react-router-dom";

export default function CustomerPage({}) {

  // get the customer from React Router
  const location = useLocation();
  const customer = location.state.customer;

  return (
    <div>
      <div>Accounts</div>
      <div>
        {customer.name}
      </div>
    </div>
  )
}
