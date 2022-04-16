const path = require('path');
const fs = require('fs-extra');
const Web3 = require('web3');

// member1 details
const host = "http://127.0.0.1:8545";

const account = {
    address : "0x21f93e128a6D7926A37DF0c2a94bd0248ea343eF",
    privateKey : "0x8653be3cbd45e2a5de209b52847b52210cf0e1d8ba7eba6ad53f632457085f26"
    };

// abi and bytecode generated from simplestorage.sol:
// > solcjs --bin --abi simplestorage.sol
const contractJsonPath = path.resolve(__dirname, './','contracts','MasterContract.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractBytecode = contractJson.evm.bytecode.object
// initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";


async function createContract(host) {
  const web3 = new Web3(host);
  // make an account and sign the transaction with the account's private key; you can alternatively use an exsiting account
  //const account = web3.eth.accounts.privateKeyToAccount('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63');
  console.log(account);
  console.log("Before");
  const txn = {
    chainId: 1337,
    nonce: await web3.eth.getTransactionCount(account.address, 'pending'),       // 0x00 because this is a new account
    from: account.address,
    to: null,            //public tx
    value: "0x00",
    data: '0x'+contractBytecode+contractConstructorInit,
    gasPrice: "0",     //ETH per unit of gas
    gas: "0xf7b760"  //max number of gas units the tx is allowed to use
  };
  console.log(txn.nonce);

  // address: '0xE45384E9411e1C8702E2a33c99A25D6c9293e141',
  // privateKey: '0x425d3b550ebc0a35182ab3f6a7a0d61d0b4bba510304b8a306d502523fed9096',

  console.log("create and sign the txn")
  console.log(txn.gasPrice)
  const signedTx = await web3.eth.accounts.signTransaction(txn, account.privateKey);
  console.log("sending the txn!")
  console.log(signedTx.rawTransaction)
  const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("tx transactionHash: " + txReceipt.transactionHash);
  console.log("tx contractAddress: " + txReceipt.contractAddress);
  return txReceipt;
};

async function main(){
  createContract(host)
  .then(async function(tx){
    console.log("done")
  })
  .catch(console.error);
}

if (require.main === module) {
  main();
}

module.exports = exports = main

