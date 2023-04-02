import Transaction from "../objects/Transaction";

describe("Transaction", () => {
  test("should create a transaction with correct values", () => {
    const transaction = new Transaction(
      100,
      "Chequing",
      "Eric Chang",
      "Gurkarn Chang",
      "Deposit"
    );

    expect(transaction.getInfo()).toEqual({
      date: expect.any(String),
      amount: 100,
      accountType: "Chequing",
      type: "Deposit",
      to: "Eric Chang",
      from: "Gurkarn Chang",
    });
  });
});
