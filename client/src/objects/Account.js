export default class Account {
  // Sets the initial values for the object
  constructor(
    id,
    accountType,
    customerId,
    accountBalance,
    maxTransferAmount,
    transactionHistory
  ) {
    this.id = id;
    this.accountType = accountType;
    this.customerId = customerId;
    this.accountBalance = accountBalance;
    this.maxTransferAmount = maxTransferAmount;
    this.transactionHistory = transactionHistory;
  }

  // Make a transaction object and update the balance
  deposit(amount, transaction) {
    this.accountBalance += parseFloat(amount);
    this.addTransaction(transaction);
    this.updateAccount();
  }

  // Make a transaction object and update the balance
  withdraw(amount, transaction) {
    if (amount <= this.accountBalance) {
      this.accountBalance -= parseFloat(amount);
      this.addTransaction(transaction);
      this.updateAccount();
    }
  }

  // Make a transaction object and update the balance
  transfer(sendTo, amount, transaction, sendTransaction) {
    if (amount <= this.accountBalance) {
      this.withdraw(amount, transaction);
      sendTo.deposit(amount, sendTransaction);
    }
  }
  // set the account balance
  setAccountBalance(newVal) {
    this.accountBalance = newVal;
  }
  
  // Update the balance
  addTransaction(transaction) {
    this.transactionHistory.push(transaction.getInfo());
  }

  // get Id
  getId() {
    return this.id;
  }

  // get parts of the attributes
  getInfo() {
    return {
      accountType: this.accountType,
      customerId: this.customerId,
      accountBalance: this.accountBalance,
      maxTransferAmount: this.maxTransferAmount,
      transactionHistory: this.transactionHistory,
    };
  }

  // update account with given inputs
  async updateAccount() {
    await fetch(`http://localhost:5000/account/update/${this.id}`, {
      method: "POST",
      body: JSON.stringify({
        accountType: this.accountType,
        customerId: this.customerId,
        accountBalance: this.accountBalance,
        maxTransferAmount: this.maxTransferAmount,
        transactionHistory: this.transactionHistory,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // delete an account
  async deleteAccount() {
    await fetch(`http://localhost:5000/account/remove/${this.id}`);
  }
}
