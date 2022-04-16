pragma solidity ^0.8.0;

import "./DocumentContract.sol";
contract MasterContract {
    address private serverAddress = 0x21f93e128a6D7926A37DF0c2a94bd0248ea343eF;
    // modifier onlyOwner(){
    //     require(msg.sender == serverAddress);
    //     _;
    // }

    //ownerAddress => documentContracts
    mapping(address => DocumentContract[]) public owners;

    function getListOfDocuments(address owner) public view returns(string memory){
        DocumentContract[] memory contracts = owners[owner];
        string memory output = '{ "Files": [';

        for(uint i = 0; i < contracts.length; i++){
            string[2] memory hashAndDocument = contracts[i].getIpfsHashAndDocumentName();
            if(i != contracts.length - 1){
                output = string(bytes.concat(bytes(output), '{ "Hash": "', bytes(hashAndDocument[0]), '", "Name": "', bytes(hashAndDocument[1]), '"}, '));
            }
            else{
                output = string(bytes.concat(bytes(output), '{ "Hash": "', bytes(hashAndDocument[0]), '", "Name": "', bytes(hashAndDocument[1]), '"} '));
            }
        }

        output = string(bytes.concat(bytes(output), ']}'));

        return output;
    }

    function uploadDocument(string memory ipfsHash, address ownerAddress, string memory documentName) public{
        owners[ownerAddress].push(new DocumentContract(ipfsHash, documentName));
    }

    function deleteOwnerFromDocument(address owner, DocumentContract document) public{
        DocumentContract[] memory documents = owners[owner];
        for(uint i = 0; i < documents.length; i++){
            if(documents[i] == document){
                documents[i] = documents[documents.length - 1];
                delete documents[documents.length - 1];
                break;
            }
        }

        owners[owner] = documents;
    }

    function setServerAddress(address newAddress) public{
        serverAddress = newAddress;
    }
}