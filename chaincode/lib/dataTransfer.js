/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class DataTransfer extends Contract {
  async InitLedger(ctx) {
    const datas = [
      {
        ID: "data1",
        buyer: "Donghwan",
        seller: "Sangwon",
        registeredTime: "2023-04-01T12:00:00.235Z",
        transactionTime: "2023-05-02T18:01:32.642Z",
        description: "Information of Yonsei freshman",
        dataCategory: "name, phone, email",
        recordnum: "3000",
        columnnum: "3",
        similarity: "90",
        retention: "30",
        value: "80",
        price: "100000 won",
        capacity: "100mb",
        possessionTransfer: "true",
        prevTransfer: "null",
      },
      {
        ID: "data2",
        buyer: "Junsik",
        seller: "Sangwon",
        registeredTime: "2021-11-12T18:00:00.176Z",
        transactionTime: "2023-05-03T15:35:24.375Z",
        description: "Address for business man",
        dataCategory: "name, phone, home address, company address",
        recordnum: "100000",
        columnnum: "4",
        similarity: "70",
        retention: "50",
        value: "90",
        price: "120000 won",
        capacity: "240mb",
        possessionTransfer: "true",
        prevTransfer: "null",
      },
      {
        ID: "data3",
        buyer: "Donghwan",
        seller: "Namjin",
        registeredTime: "2022-08-07T20:30:02.452Z",
        transactionTime: "2023-05-06T07:45:37.237Z",
        description: "register information of CS hompage",
        dataCategory: "name, id, password",
        recordnum: "200",
        columnnum: "3",
        similarity: "95",
        retention: "60",
        value: "50",
        price: "80000 won",
        capacity: "70mb",
        possessionTransfer: "false",
        prevTransfer: "data1",
      },
    ];

    for (const data of datas) {
      data.docType = "data";
      await ctx.stub.putState(data.ID, Buffer.from(JSON.stringify(data)));
      console.info(`Data Transaction ${data.ID} initialized`);
    }
  }

  // CreateData issues a new data to the world state with given details.
  async CreateData(
    ctx,
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
    prevTransfer
  ) {
    const data = {
      docType: "data",
      ID: id,
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
    };
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(data)));
    return JSON.stringify(data);
  }

  // ReadData returns the data stored in the world state with given id.
  async ReadData(ctx, id) {
    const dataJSON = await ctx.stub.getState(id); // get the data from chaincode state
    if (!dataJSON || dataJSON.length === 0) {
      throw new Error(`The data transaction ${id} does not exist`);
    }
    return dataJSON.toString();
  }

  // UpdateData updates an existing data in the world state with provided parameters.
  async UpdateData(
    ctx,
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
    prevTransfer
  ) {
    const exists = await this.DataExists(ctx, id);
    if (!exists) {
      throw new Error(`The data transaction ${id} does not exist`);
    }

    // overwriting original data with new data
    const updatedData = {
      ID: id,
      docType: "data",
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
    };
    return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedData)));
  }

  // DeleteData deletes an given data from the world state.
  async DeleteData(ctx, id) {
    const exists = await this.DataExists(ctx, id);
    if (!exists) {
      throw new Error(`The data transaction ${id} does not exist`);
    }
    return ctx.stub.deleteState(id);
  }

  // DataExists returns true when data with given ID exists in world state.
  async DataExists(ctx, id) {
    const dataJSON = await ctx.stub.getState(id);
    return dataJSON && dataJSON.length > 0;
  }

  // TransferData updates the owner field of data with given id in the world state.
  async TransferData(ctx, id, newBuyer) {
    const dataString = await this.ReadData(ctx, id);
    const data = JSON.parse(dataString);
    data.buyer = newBuyer;
    return ctx.stub.putState(id, Buffer.from(JSON.stringify(data)));
  }

  // GetAllDatas returns all Datas found in the world state.
  async GetAllDatas(ctx) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all Datas in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push({ Key: result.value.key, Record: record });
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }

  async GetSeller(ctx, seller) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all Datas in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      if (record.seller === seller)
        allResults.push({ Key: result.value.key, Record: record });
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }
  async GetBuyer(ctx, buyer) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all Datas in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      if (record.buyer === buyer)
        allResults.push({ Key: result.value.key, Record: record });
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }
}

module.exports = DataTransfer;
