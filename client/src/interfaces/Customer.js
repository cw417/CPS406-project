import { v4 as uuidv4 } from 'uuid';
import Transaction from './Transaction';

export default class Customer {
  constructor(name, address, email, password, chequing, savings, transactionHistory, dbID = "") {
    this.dbID = dbID; // ID given by MongoDB; will be set after adding to database and pulling
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

  deposit(amount, accountType) {
    /**
     * @param {number} amount             Amount to deposit.
     * @param {string} accountType        Either 'Chequing' or 'Savings'.
     */
    accountType === 'Chequing' ? this.accounts.chequing += amount : this.accounts.savings += amount;
    const transaction = new Transaction(amount, accountType, 'Deposit', 'Deposit');
    this.transactionHistory.push(transaction);
    this.updateCustomer();
  }

  transfer(amount, accountType, to, from) {
    /**
     * @param {number} amount             Amount to deposit.
     * @param {string} accountType        Either 'Chequing' or 'Savings'.
     * @param {string} to                 Sender of the transfer.
     * @param {string} from               Recipient of the transfer.
     */
    // check to make sure that amount is less or equal to amount in account.
    if (accountType === 'Chequing') {
      if (amount <= this.accounts.chequing) {
        return;
      } 
      else {
        this.accounts.chequing -= amount;
      }
    }
    else {
      if (amount <= this.accounts.savings) {
        return;
      } 
      else {
        this.accounts.savings -= amount;
      }
    }
    const transaction = new Transaction(amount, accountType, to, from);
    this.transactionHistory.push(transaction);
    this.updateCustomer();
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
