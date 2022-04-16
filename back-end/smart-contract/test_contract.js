const path = require('path');
const fs = require('fs-extra');
const Web3 = require('web3');

// member1 details
const host = "http://127.0.0.1:8545";
const contractAddress = "0x846E4E684D62f08453A25048234524E9897b46A8"
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "contract DocumentContract",
				"name": "document",
				"type": "address"
			}
		],
		"name": "deleteOwnerFromDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "getListOfDocuments",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "owners",
		"outputs": [
			{
				"internalType": "contract DocumentContract",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAddress",
				"type": "address"
			}
		],
		"name": "setServerAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "ownerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "documentName",
				"type": "string"
			}
		],
		"name": "uploadDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const account = {
    address : "0x21f93e128a6D7926A37DF0c2a94bd0248ea343eF",
    privateKey : "0x8653be3cbd45e2a5de209b52847b52210cf0e1d8ba7eba6ad53f632457085f26"
    };

// const account = {
//     address : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
//     privateKey : "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"
//     };
// abi and bytecode generated from simplestorage.sol:
// > solcjs --bin --abi simplestorage.sol
const contractJsonPath = path.resolve(__dirname, './','contracts','MasterContract.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = abi;
//onsole.log(abi)
const contractBytecode = contractJson.evm.bytecode.object
// initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";
const contractConstructorUpdate = "000000000000000000000000000000000000000000000000000000000000001F";


async function getValueAtAddress(host, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
//   contractInstance.methods.uploadDocument("ipfshash","0x627306090abaB3A6e1400e9345bC60c78a8BEf57","documentname.txt").send({from: account.address}, function(error, result){
//     console.log(result)
//     console.log(error)
//     });
  //const res = await contractInstance.methods.uploadDocument("ipfshash","0x627306090abaB3A6e1400e9345bC60c78a8BEf57","documentname.txt").call();


  const new_account = web3.eth.accounts.create();
  console.log("account:")
  console.log(new_account);
  const functionAbi = contractInstance._jsonInterface.find(e => {
    return e.name === "uploadDocument";
  });
  console.log(functionAbi)
  const functionArgs = web3.eth.abi
  .encodeParameters(functionAbi.inputs, ["ipfshash2","0x627306090abaB3A6e1400e9345bC60c78a8BEf57","documentname.txt"])
  .slice(2);
const functionParams = {
  to: deployedContractAddress,
  data: functionAbi.signature + functionArgs,
  gas: "3000000"  //max number of gas units the tx is allowed to use
};
console.log(functionParams)
const signedTx = await web3.eth.accounts.signTransaction(functionParams, account.privateKey);
 console.log("sending the txn")
const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
console.log("tx transactionHash: " + txReceipt.transactionHash);
console.log("tx contractAddress: " + txReceipt.contractAddress);

  const res = await contractInstance.methods.getListOfDocuments("0x627306090abaB3A6e1400e9345bC60c78a8BEf57").call();
  console.log(res);

  return res
}




async function main(){
    getValueAtAddress(host, contractAbi, contractAddress);
}

if (require.main === module) {
  main();
}

module.exports = exports = main

