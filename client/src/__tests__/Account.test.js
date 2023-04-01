import Account from '../objects/Account';

describe('Account', () => {
  let account;
  const id = '123';
  const accountType = 'savings';
  const customerId = '456';
  const accountBalance = 1000;
  const maxTransferAmount = 500;
  const transactionHistory = [];

  beforeEach(() => {
    account = new Account(
      id,
      accountType,
      customerId,
      accountBalance,
      maxTransferAmount,
      transactionHistory
    );
  });

  test('deposit', () => {
    const amount = 500;
    const transaction = { id: '789', date: new Date(), type: 'deposit',  getInfo: () => {
        return {
          id: "1",
          type: "deposit",
          amount: 500,
          date: "2022-04-01",
        };
      }, };
    account.deposit(amount, transaction);
    expect(account.accountBalance).toBe(1500);
    expect(account.transactionHistory.length).toBe(1);
  });

  test('withdraw', () => {
    const amount = 500;
    const transaction = { id: '789', date: new Date(), type: 'withdrawal',  getInfo: () => {
        return {
          id: "1",
          type: "deposit",
          amount: 500,
          date: "2022-04-01",
        };
      }, };
    account.withdraw(amount, transaction);
    expect(account.accountBalance).toBe(500);
   
  });

  test('transfer', () => {
    const sendTo = new Account(
      '456',
      'checking',
      '789',
      500,
      500,
      []
    );
    const amount = 500;
    const transaction = { id: '123', date: new Date(), type: 'transfer',   getInfo: () => {
        return {
          id: "1",
          type: "deposit",
          amount: 500,
          date: "2022-04-01",
        };
      }, };
    const sendTransaction = { id: '789', date: new Date(), type: 'transfer',  getInfo: () => {
        return {
          id: "1",
          type: "deposit",
          amount: 500,
          date: "2022-04-01",
        };
      }, };
    account.transfer(sendTo, amount, transaction, sendTransaction);
    expect(account.accountBalance).toBe(500);
    expect(sendTo.accountBalance).toBe(1000);
   
  });

  test('setAccountBalance', () => {
    const newVal = 500;
    account.setAccountBalance(newVal);
    expect(account.accountBalance).toBe(newVal);
  });

  test('addTransaction', () => {
    const transaction = { id: '123', date: new Date(), type: 'deposit',  getInfo: () => {
        return {
          id: "1",
          type: "deposit",
          amount: 500,
          date: "2022-04-01",
        };
      }, };
    account.addTransaction(transaction);
    expect(account.transactionHistory.length).toBe(4);
  });

  test('getId', () => {
    expect(account.getId()).toBe(id);
  });

  test('getInfo', () => {
    const info = account.getInfo();
    expect(info.accountType).toBe(accountType);
    expect(info.customerId).toBe(customerId);
    expect(info.accountBalance).toBe(accountBalance);
    expect(info.maxTransferAmount).toBe(maxTransferAmount);
    expect(info.transactionHistory).toBe(transactionHistory);
  });

  test('updateAccount', async () => {
    global.fetch = jest.fn(() => Promise.resolve());
    await account.updateAccount();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('deleteAccount', async () => {
    global.fetch = jest.fn(() => Promise.resolve());
    await account.deleteAccount();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});