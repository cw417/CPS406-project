import axios from 'axios'

export default class Bank {
  constructor(name = 'The Reserve') {
    this.name = name;
    this.customers = [];
  }

  setCustomers(customersList) {
    this.customers = customersList;
  }

  async getCustomers() {
    const response = await fetch('http://localhost:5000/customer/');
    const data = await response.json()
    return data
  }

  async getAccount(accountId) {
    const response = await fetch(`http://localhost:5000/account/get/${accountId}`)
    const data = await response.json()
    return data
  }

  async getAccountByEmail(email) {
    return axios.get("http://localhost:5000/customer").then(response => {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].email === email){
                return this.getAccount(response.data[i].accounts.savings[0])
            }
        }
        return null  
    })
  }

}