export default function CustomerList({ customers }) {

  function renderCustomerList() {
    /**
     * Map recipes to a list of recipe components.
     */
    return customers.map((customer, index) => {
      return (
        <div key={index}>{customer.name}: {customer.email}: {customer.password}</div>
      )
    })
  }

  return (
    <div>
      {renderCustomerList()}
    </div>
  )
}
