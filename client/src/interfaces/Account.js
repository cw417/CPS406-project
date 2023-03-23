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
    console.log('Update')
    console.log(this.transactionHistory)
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
}
