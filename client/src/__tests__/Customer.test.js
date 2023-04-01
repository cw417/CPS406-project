import Customer from '../objects/Customer';

describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(
      'ericchang',
      'Eric',
      'Chang',
      '123 Main St',
      'ericbbc@example.com',
      'password',
      [],
      [],
    );
  });

  test('should return customer info', () => {
    const expected = {
      username: 'ericchang',
      first: 'Eric',
      last: 'Chang',
      address: '123 Main St',
      email: 'ericbbc@example.com',
    };
    expect(customer.getInfo()).toEqual(expected);
  });

  test('should open a chequing account', async () => {
    const mockResponse = { insertedId: '123456' };
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });
    await customer.openAccount('Chequing');
    expect(customer.getChequing()).toContain(mockResponse.insertedId);
  });

  test('should open a savings account', async () => {
    const mockResponse = { insertedId: '123456' };
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });
    await customer.openAccount('Savings');
    expect(customer.getSavings()).toContain(mockResponse.insertedId);
  });

  test('should add a contact', () => {
    const contact = { name: 'Eric Chang', email: 'ericbbc@example.com' };
    customer.addContact(contact);
    expect(customer.contacts).toContain(contact);
  });

  test('should remove a contact', () => {
    const contact = { name: 'Eric Chang', email: 'ericbbc@example.com' };
    customer.contacts = [contact];
    customer.removeContact(contact);
    expect(customer.contacts).not.toContain(contact);
  });

  test('should add a payee', () => {
    const payee = { name: 'Electric Company', accountNumber: '123456789' };
    customer.addPayee(payee);
    expect(customer.payees).toContain(payee);
  });

  test('should remove a payee', () => {
    const payee = { name: 'Electric Company', accountNumber: '123456789' };
    customer.payees = [payee];
    customer.removePayee(payee);
    expect(customer.payees).not.toContain(payee);
  });
});