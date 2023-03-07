import CustomerListEntry from "./CustomerListEntry"

export default function CustomerList({ customers }) {

  function renderCustomerList() {
    /**
     * Map recipes to a list of recipe components.
     */
    return customers.map((customer, index) => {
      return (
        <div key={index}><CustomerListEntry customer={customer} /></div>
      )
    })
  }

  return (
    <div>
      {renderCustomerList()}
    </div>
  )
}
