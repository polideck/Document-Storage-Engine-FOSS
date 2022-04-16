const CONTRACT_ADDRESS = '0xB7fC6C3DFebD24EAe16E307Ea39EdF7c93ff7866';

const CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "data",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

module.exports = {
    CONTRACT_ADDRESS,
    CONTRACT_ABI
  }
