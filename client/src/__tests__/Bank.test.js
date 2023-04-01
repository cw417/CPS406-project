import Bank from '../objects/Bank';
import axios from 'axios';

describe('Bank class', () => {
  let bank;

  beforeEach(() => {
    bank = new Bank('Test Bank');
  });

  describe('constructor', () => {
    it('should set name', () => {
      expect(bank.name).toBe('Test Bank');
    });

    it('should set customers', () => {
      expect(bank.customers).toEqual([]);
    });
  });

  describe('setCustomers', () => {
    it('should set customers', () => {
      const customers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      bank.setCustomers(customers);
      expect(bank.customers).toEqual(customers);
    });
  });

  describe('getCustomers', () => {
    it('should return customers', async () => {
      const customers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      const response = { json: () => Promise.resolve(customers) };
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response));
      const result = await bank.getCustomers();
      expect(result).toEqual(customers);
      global.fetch.mockRestore();
    });
  });

  describe('getAccount', () => {
    it('should return account', async () => {
      const account = { id: 1, type: 'Savings' };
      const response = { json: () => Promise.resolve(account) };
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response));
      const result = await bank.getAccount(1);
      expect(result).toEqual(account);
      global.fetch.mockRestore();
    });
  });

  describe('getAccountByEmail', () => {
    it('should return account', async () => {
      const account = { id: 1, type: 'Savings' };
      const customers = [{ id: 1, email: 'john@example.com', accounts: { savings: [1] } }];
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: customers }));
      jest.spyOn(bank, 'getAccount').mockImplementation(() => Promise.resolve(account));
      const result = await bank.getAccountByEmail('john@example.com');
      expect(result).toEqual(account);
      axios.get.mockRestore();
      bank.getAccount.mockRestore();
    });

    it('should return null if email is not found', async () => {
      const customers = [{ id: 1, email: 'john@example.com', accounts: { savings: [1] } }];
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: customers }));
      const result = await bank.getAccountByEmail('jane@example.com');
      expect(result).toBeNull();
      axios.get.mockRestore();
    });
  });
});