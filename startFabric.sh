#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

starttime=$(date +%s)

# clean out any old identites in the wallets
pushd ../hyperledger-dataTransfer/application
rm -rf wallet/*
popd

# launch network; create channel and join peer to channel
pushd ../test-network
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn data -ccp ../hyperledger-dataTransfer/chaincode/ -ccl javascript

popd

# print message
cat <<EOF

Network up is done !
    Total setup execution time : $(($(date +%s) - starttime)) secs ...

    cd application
        for Go to application folder

    npm install
        for install node modules at first 

    node start.js
        for Enroll Admin, Register User, and Submit Transaction: InitLedger

    cd server
    node server.js
        for Run Server on localhost:8080

EOF
