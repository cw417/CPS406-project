export default class Bank {
  constructor(name = 'The Reserve') {
    this.name = name;
    this.customers = [];
  }

  setCustomers(customersList) {
    this.customers = customersList;
  }

  async getAccount(accountId) {
    const response = await fetch(`http://localhost:5000/account/get/${accountId}`)
    const data = await response.json()
    return data
  }
}