const express = require("express");
const routes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Get a list of all the accounts
routes.route("/account").get(function (req, res) {
  let db_connect = dbo.getDb("theReserve");
  db_connect
    .collection("accounts")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get a list of accounts that are hooked to a customer id
routes.route("/account/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { customer: ObjectId(req.params.id) };
  db_connect
    .collection("accounts")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Create a new account. (The id is the customer's id that this account belongs to)
routes.route("/account/add/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
    let myobj = {
      accountType: req.body.accountType,
      customerId: req.params.id,
      accountBalance: 0,
      maxTransferAmount: 1000,
      transactionHistory: [],
    };
  db_connect.collection("accounts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Update an account by id.
routes.route("/account/update/:id").post(function (req, response) {
  console.log("editing");
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      accountType: req.body.accountType,
      customerId: req.body.id,
      accountBalance: req.body.accountBalance,
      maxTransferAmount: req.body.maxTransferAmount,
      transactionHistory: req.params.transactionHistory,
    },
  };
  db_connect
    .collection("accounts")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = routes;
