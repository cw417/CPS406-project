import { v4 as uuidv4 } from 'uuid';

export default class Customer {
  constructor(name, address, email, password, chequing, savings, transactionHistory) {
    this.dbID = ""; // ID given by MongoDB; will be set after adding to database and pulling
    this.id = uuidv4();
    this.name = name;
    this.address = address;
    this.email = email;
    this.password = password;
    this.accounts = {
      chequing: chequing,
      savings: savings
    }
    this.transactionHistory = transactionHistory;
  }

  getId() {
    return this.id;
  }

  getInfo() {
    return {name: this.name, address: this.address, email: this.email};
  }

  getChequing() {
    return this.accounts.chequing;
  }

  getSavings() {
    return this.accounts.savings;
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  getDBID() {
    return this.dbID;
  }

  setDBID(id) {
    this.dbID = id;
  }

  async updateCustomer() {
    await fetch(`http://localhost:5000/update/${this.dbID}`, {
      method: "POST",
      body: JSON.stringify({
        id: this.id,
        name: this.name,
        address: this.address,
        email: this.email,
        password: this.password,
        accounts: {
          chequing: this.accounts.chequing,
          savings: this.accounts.savings
        },
      transactionHistory: this.transactionHistory
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })

  }
}
