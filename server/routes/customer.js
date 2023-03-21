const express = require('express');
const routes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
 
// Get a list of all the customers.
routes.route('/customer').get(function (req, res) {
  let db_connect = dbo.getDb('theReserve');
  db_connect
    .collection('customers')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// Get a single customer by id
routes.route('/customer/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection('customers')
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// Create a new customer.
routes.route('/customer/add').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.body.id,
    username: req.body.username,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    accounts: {
      chequing: 0,
      savings: 0
    },
    transactionHistory: []
  };
  db_connect.collection('customers').insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
 
// Update a customer by id.
routes.route('/update/:id').post(function (req, response) {
  console.log('editing')
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      id: req.body.id,
      username: req.body.name,
      first: req.body.first,
      last: req.body.last,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      accounts: {
        chequing: req.body.accounts.chequing,
        savings: req.body.accounts.savings 
      },
      transactionHistory: req.body.transactionHistory 
    },
  };
  db_connect
    .collection('customers')
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log('1 document updated');
      response.json(res);
    });
});
 
//// Delete a recipe
//routes.route('/:id').delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection('recipes').deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log('1 document deleted');
//    response.json(obj);
//  });
//});
// 
module.exports = routes;