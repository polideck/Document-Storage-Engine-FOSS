const path = require('path');
const fs = require('fs-extra');
const Web3 = require('web3');

// member1 details
const host = "http://127.0.0.1:8545";
const accountAddress = "0xB75A019c4aD0C1cd733cE8958D54EaeCa7aC525d";


// abi and bytecode generated from simplestorage.sol:
// > solcjs --bin --abi simplestorage.sol
const contractJsonPath = path.resolve(__dirname, './','contracts','MasterContract.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = contractJson.abi;
console.log(contractAbi)
const contractBytecode = contractJson.evm.bytecode.object
// initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";
const contractConstructorUpdate = "000000000000000000000000000000000000000000000000000000000000001F";


async function getValueAtAddress(host, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: "+ res);
  return res
}

async function getAllPastEvents(host, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.getPastEvents("allEvents", {
    fromBlock: 0,
    toBlock: 'latest'
  })
  const amounts = res.map(x => {
    return x.returnValues._amount
  });
  console.log("Obtained all value events from deployed contract : [" + amounts + "]");
  return res
}

// You need to use the accountAddress details provided to Quorum to send/interact with contracts
async function setValueAtAddress(host, accountAddress, value, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const account = web3.eth.accounts.create();
  console.log("account:")
  console.log(account);
  const contract = new web3.eth.Contract(deployedContractAbi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find(e => {
    return e.name === "set";
  });
  const functionArgs = web3.eth.abi
    .encodeParameters(functionAbi.inputs, [value])
    .slice(2);
  const functionParams = {
    to: deployedContractAddress,
    data: functionAbi.signature + functionArgs,
    gas: "0x2CA51"  //max number of gas units the tx is allowed to use
  };
  const signedTx = await web3.eth.accounts.signTransaction(functionParams, account.privateKey);
   console.log("sending the txn")
  const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("tx transactionHash: " + txReceipt.transactionHash);
  console.log("tx contractAddress: " + txReceipt.contractAddress);
  return txReceipt
}

async function createContract(host) {
  const web3 = new Web3(host);
  // make an account and sign the transaction with the account's private key; you can alternatively use an exsiting account
  const account = web3.eth.accounts.create();
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
    // console.log("Contract deployed at address: " + tx.contractAddress);
    // console.log("Use the smart contracts 'get' function to read the contract's constructor initialized value .. " )
    // await getValueAtAddress(host, contractAbi, tx.contractAddress);
    // console.log("Use the smart contracts 'set' function to update that value to 123 .. " );
    // await setValueAtAddress(host, accountAddress, 123, contractAbi, tx.contractAddress );
    // console.log("Verify the updated value that was set .. " )
    // await getValueAtAddress(host, contractAbi, tx.contractAddress);
    // await getAllPastEvents(host, contractAbi, tx.contractAddress);
  })
  .catch(console.error);
}

if (require.main === module) {
  main();
}

module.exports = exports = main

