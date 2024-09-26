const Salestransaction = require("../models/salesTransaction");
const Paymenttransaction = require("../models/paymentTransaction");
const Purchasetransaction = require("../models/purchaseTransaction");
const Recipt = require("../models/recipt");
const Journal = require("../models/journalTransactions");
const User = require("../models/user");
const Users = require("../models/client");
// const compare = require("../utils/dateCompare");
// const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  // console.log(req.headers.username);
  const prevuser = await Users.findOne({
    email: req.headers.username,
  });
  console.log(prevuser);
  if (prevuser) {
    const prev = await User.findOne({
      username: req.headers.username,
      password: req.headers.password,
    });
    console.log(prev);
    if (prev != undefined) {
      const token = await prev.generateAuthToken();
      res.status(200).send({
        access_token: `${token}`,
        token_type: "bearer",
        message: "token generated successfully",
      });
    } else {
      const Newuser = new User({
        username: req.headers.username,
        password: req.headers.password,
      });
      try {
        await Newuser.save();
        const token = await Newuser.generateAuthToken();
        res.status(200).send({
          access_token: `${token}`,
          token_type: "bearer",
          message: "token generated successfully",
        });
      } catch (error) {
        res.status(400);
      }
    }
  } else {
    console.log("User not found");
    res.status(400).send({
      error: "User not found",
      success: false,
    });
  }
  // if (prevuser != undefined) {
  //   console.log(req.headers.username);
  //   const token = await prevuser.generateAuthToken();
  //   res.status(200).send({
  //     access_token: `${token}`,
  //     token_type: "bearer",
  //     message: "token generated successfully",
  //   });
  // } else {
  //   console.log("User not found");
  //   res.status(400).send({
  //     error: "User not found",
  //     success: false,
  //   });
  // const user = new User({
  //   username: req.headers.username,
  //   password: req.headers.password,
  // });
  // try {
  //   await user.save();
  //   const token = await user.generateAuthToken();
  //   res.status(200).send({
  //     access_token: `${token}`,
  //     token_type: "bearer",
  //     message: "token generated successfully",
  //   });
  // } catch (error) {
  //   res.status(400);
  // }
};
exports.loginInfo = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400);
  }
};
exports.postapi = async (req, res) => {
  try {
    if (req.query.grant_type == "Sales") {
      const Transaction = new Salestransaction(req.body);
      await Transaction.save();
      res.status(201).json({
        Transaction,
      });
    } else if (req.query.grant_type == "Payment") {
      const Transaction = new Paymenttransaction(req.body);
      await Transaction.save();
      res.status(201).json({
        Transaction,
      });
    } else if (req.query.grant_type == "Purchase") {
      const Transaction = new Purchasetransaction(req.body);
      await Transaction.save();
      res.status(201).json({
        Transaction,
      });
    } else if (req.query.grant_type == "Recipt") {
      const Transaction = new Recipt(req.body);
      await Transaction.save();
      res.status(201).json({
        Transaction,
      });
    }
  } catch (error) {
    res.status(400).send();
  }
};
exports.getapi = async (req, res) => {
  console.log(req.headers);

  try {
    if (req.query.grant_type == "Sales") {
      const transactions = await Salestransaction.find({
        emailId: req.headers.username,
        invoiceStatus: "Reviewed",
      });
      console.log(transactions);
      var Transactions = [];
      transactions.forEach((t) => {
        var b = req.headers.fromdate.split("-");

        var fromDate = new Date(b[2] + "-" + b[1] + "-" + b[0]);

        var c = req.headers.todate.split("-");
        var toDate = new Date(c[2] + "-" + c[1] + "-" + c[0]);
        var d = t.BILL_DT.split("-");
        var date = new Date(d[2] + "-" + d[1] + "-" + d[0]);

        if (date <= toDate && date >= fromDate) {
          Transactions.push(t);
        }
      });

      res.status(201).json({
        Transactions,
      });
    } else if (req.query.grant_type == "Payment") {
      var transactions = await Paymenttransaction.find({
        emailId: req.headers.username,
        invoiceStatus: "Reviewed",
      });
      console.log(transactions);
      var Transactions = [];
      transactions.forEach((t) => {
        var b = req.headers.fromdate.split("-");
        var fromDate = new Date(b[2] + "-" + b[1] + "-" + b[0]);
        var c = req.headers.todate.split("-");
        var toDate = new Date(c[2] + "-" + c[1] + "-" + c[0]);
        var d = t.DOC_DT.split("-");
        var date = new Date(d[2] + "-" + d[1] + "-" + d[0]);

        if (date <= toDate && date >= fromDate) {
          Transactions.push(t);
        }
      });

      res.status(201).json({
        Transactions,
      });
    } else if (req.query.grant_type == "Purchase") {
      var transactions = await Purchasetransaction.find({
        emailId: req.headers.username,
        invoiceStatus: "Reviewed",
      });
      console.log(transactions);
      var Transactions = [];
      transactions.forEach((t) => {
        var b = req.headers.fromdate.split("-");
        var fromDate = new Date(b[2] + "-" + b[1] + "-" + b[0]);
        var c = req.headers.todate.split("-");
        var toDate = new Date(c[2] + "-" + c[1] + "-" + c[0]);
        var d = t.DOCDATE.split("-");
        var date = new Date(d[2] + "-" + d[1] + "-" + d[0]);
        if (date <= toDate && date >= fromDate) {
          Transactions.push(t);
        }
      });

      res.status(201).json({
        Transactions,
      });
    } else if (req.query.grant_type == "Recipt") {
      var transactions = await Recipt.find({
        emailId: req.headers.username,
        invoiceStatus: "Reviewed",
      });
      console.log(transactions);
      var Transactions = [];
      transactions.forEach((t) => {
        var b = req.headers.fromdate.split("-");
        var fromDate = new Date(b[2] + "-" + b[1] + "-" + b[0]);
        var c = req.headers.todate.split("-");
        var toDate = new Date(c[2] + "-" + c[1] + "-" + c[0]);
        var d = t.DOC_DT.split("-");
        var date = new Date(d[2] + "-" + d[1] + "-" + d[0]);
        if (date <= toDate && date >= fromDate) {
          Transactions.push(t);
        }
      });
      res.status(201).json({
        Transactions,
      });
    } else if (req.query.grant_type == "Journal") {
      var transactions = await Journal.find({
        emailId: req.headers.username,
      });
      console.log(transactions);
      var Transactions = [];
      transactions.forEach((t) => {
        var b = req.headers.fromdate.split("-");
        var fromDate = new Date(b[2] + "-" + b[1] + "-" + b[0]);
        var c = req.headers.todate.split("-");
        var toDate = new Date(c[2] + "-" + c[1] + "-" + c[0]);
        var d = t.DOC_DT.split("-");
        var date = new Date(d[2] + "-" + d[1] + "-" + d[0]);
        if (date <= toDate && date >= fromDate) {
          Transactions.push(t);
        }
      });
      res.status(201).json({
        Transactions,
      });
    }
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};
