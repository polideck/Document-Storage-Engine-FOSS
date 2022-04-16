const CONTRACT_ADDRESS = '0x0df696240A730Cb52302311b25F891C3ab28e2FF';

const CONTRACT_ABI = [{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"document","type":"address"}],"name":"deleteOwnerFromDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"ownerAddress","type":"address"}],"name":"getContractsByOwner","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getListOfDocuments","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"owners","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"ipfsHash","type":"string"},{"internalType":"address","name":"ownerAddress","type":"address"},{"internalType":"string","name":"documentName","type":"string"}],"name":"uploadDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

module.exports = {
    CONTRACT_ADDRESS,
    CONTRACT_ABI
  }
