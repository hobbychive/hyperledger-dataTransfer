var sdk = require("./sdk.js");

module.exports = function (app) {
  app.get("/GetAllDatas", function (req, res) {
    let args = [];
    sdk.send(false, "GetAllDatas", args, res);
  });

  app.get("/DataExists", function (req, res) {
    var id = req.query.id;
    let args = [id];
    sdk.send(false, "DataExists", args, res);
  });

  app.get("/DeleteData", function (req, res) {
    var id = req.query.id;
    let args = [id];
    sdk.send(true, "DeleteData", args, res);
  });

  app.get("/InitLedger", function (req, res) {
    let args = [];
    sdk.send(true, "InitLedger", args, res);
  });

  app.get("/ReadData", function (req, res) {
    var id = req.query.id;
    let args = [id];
    sdk.send(false, "ReadData", args, res);
  });

  app.get("/TransferData", function (req, res) {
    var id = req.query.id;
    var newBuyer = req.query.newBuyer;
    let args = [id, newBuyer];
    sdk.send(true, "TransferData", args, res);
  });

  app.get("/CreateData", function (req, res) {
    var id = req.query.id;
    var buyer = req.query.buyer;
    var seller = req.query.seller;
    var registeredTime = req.query.registeredTime;
    var transactionTime = req.query.transactionTime;
    var description = req.query.description;
    var dataCategory = req.query.dataCategory;
    var recordnum = req.query.recordnum;
    var columnnum = req.query.columnnum;
    var similarity = req.query.similarity;
    var retention = req.query.retention;
    var value = req.query.value;
    var price = req.query.price;
    var capacity = req.query.capacity;
    var possessionTransfer = req.query.possessionTransfer;
    var prevTransfer = req.query.prevTransfer;

    let args = [
      id,
      buyer,
      seller,
      registeredTime,
      transactionTime,
      description,
      dataCategory,
      recordnum,
      columnnum,
      similarity,
      retention,
      value,
      price,
      capacity,
      possessionTransfer,
      prevTransfer,
    ];
    sdk.send(true, "CreateData", args, res);
  });

  app.get("/UpdateData", function (req, res) {
    var id = req.query.id;
    var buyer = req.query.buyer;
    var seller = req.query.seller;
    var registeredTime = req.query.registeredTime;
    var transactionTime = req.query.transactionTime;
    var description = req.query.description;
    var dataCategory = req.query.dataCategory;
    var recordnum = req.query.recordnum;
    var columnnum = req.query.columnnum;
    var similarity = req.query.similarity;
    var retention = req.query.retention;
    var value = req.query.value;
    var price = req.query.price;
    var capacity = req.query.capacity;
    var possessionTransfer = req.query.possessionTransfer;
    var prevTransfer = req.query.prevTransfer;

    let args = [
      id,
      buyer,
      seller,
      registeredTime,
      transactionTime,
      description,
      dataCategory,
      recordnum,
      columnnum,
      similarity,
      retention,
      value,
      price,
      capacity,
      possessionTransfer,
      prevTransfer,
    ];
    sdk.send(true, "UpdateData", args, res);
  });

  app.get("/GetSeller", function (req, res) {
    var seller = req.query.seller;
    let args = [seller];
    sdk.send(false, "GetSeller", args, res);
  });

  app.get("/GetBuyer", function (req, res) {
    var buyer = req.query.buyer;
    let args = [buyer];
    sdk.send(false, "GetBuyer", args, res);
  });
};
