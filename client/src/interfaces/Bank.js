export default class Bank {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }

  setCustomers(customersList) {
    this.customers = customersList;
  }
}