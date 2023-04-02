const express = require("express");
const routes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Get a list of all the customers.
routes.route("/customer").get(function (req, res) {
  let db_connect = dbo.getDb("theReserve");
  db_connect
    .collection("customers")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get a single customer by id
routes.route("/customer/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("customers").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Create a new customer.
routes.route("/customer/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    accounts: {
      chequing: [],
      savings: [],
    },
    payees: [],
    contacts: [],
  };
  db_connect.collection("customers").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Update a customer by id.
routes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      username: req.body.username,
      first: req.body.first,
      last: req.body.last,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      accounts: {
        chequing: req.body.accounts.chequing,
        savings: req.body.accounts.savings,
      },
      payees: req.body.payees,
      contacts: req.body.contacts,
    },
  };
  db_connect
    .collection("customers")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Remove a customer by id.
routes.route("/remove/:id").delete(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("customers")
    .deleteOne(myquery)
    .then((data) => res.json(data));
});

module.exports = routes;
