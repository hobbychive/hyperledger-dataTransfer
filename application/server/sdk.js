/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require("../../../test-application/javascript/CAUtil.js");
const {
  buildCCPOrg1,
  buildWallet,
} = require("../../../test-application/javascript/AppUtil.js");
const walletPath = path.join(__dirname, "../wallet");

const channelName = "mychannel";
const chaincodeName = "data";
const mspOrg1 = "Org1MSP";
const org1UserId = "appUser";

const template = require("../app/templete.js");

function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function send(type, func, args, res) {
  try {
    const ccp = buildCCPOrg1();

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway(); // new gateway instance for interacting with fabric network

    // connect to gateway with connecting profile
    await gateway.connect(ccp, {
      wallet: wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork(channelName); // get network with channel name

    const contract = network.getContract(chaincodeName); // get contract with chaincode name

    console.log(">>>> Transaction <<<<");

    if (type == true) {
      // type true : submit transaction, not only query
      await contract.submitTransaction(func, ...args);
      console.log("Submit transaction success");

      const resultString = "Submit Transcation success!!!";
      const html = template.HTML(func, type, resultString);
      res.send(html);
    } else {
      const result = await contract.evaluateTransaction(func, ...args);
      console.log("Evaluate transaction success");
      //const resultJSONString = prettyJSONString(result.toString());
      const resultString = result.toString();
      console.log(`*** Result: ${resultString.replace(/},/gi, "}, \n")}`);
      //res.send(resultJSONString);
      //res.send(resultString);

      const html = template.HTML(func, type, resultString);
      res.send(html);
    }

    await gateway.disconnect();
  } catch (error) {
    console.log("Fail transaction");
    console.log(error);
    res.send(error);
  }
}

module.exports = {
  send: send,
};
