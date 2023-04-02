export default class Account {
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

  deposit(amount, transaction) {
    this.accountBalance += parseFloat(amount);
    this.addTransaction(transaction);
    this.updateAccount();
  }

  withdraw(amount, transaction) {
    if (amount <= this.accountBalance) {
      this.accountBalance -= parseFloat(amount);
      this.addTransaction(transaction);
      this.updateAccount();
    }
  }

  transfer(sendTo, amount, transaction, sendTransaction) {
    if (amount <= this.accountBalance) {
      this.withdraw(amount, transaction);
      sendTo.deposit(amount, sendTransaction);
    }
  }

  setAccountBalance(newVal) {
    this.accountBalance = newVal;
  }

  addTransaction(transaction) {
    this.transactionHistory.push(transaction.getInfo());
  }

  getId() {
    return this.id;
  }

  getInfo() {
    return {
      accountType: this.accountType,
      customerId: this.customerId,
      accountBalance: this.accountBalance,
      maxTransferAmount: this.maxTransferAmount,
      transactionHistory: this.transactionHistory,
    };
  }

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

  async deleteAccount() {
    await fetch(`http://localhost:5000/account/remove/${this.id}`);
  }
}
