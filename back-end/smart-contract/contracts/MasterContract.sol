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
                output = string(bytes.concat(bytes(output), '{ "Hash": "', bytes(hashAndDocument[0]), '", "Name": "', bytes(hashAndDocument[1]), '", "Address": "', bytes(toAsciiString(address(contracts[i]))), '"}, '));
            }
            else{
                output = string(bytes.concat(bytes(output), '{ "Hash": "', bytes(hashAndDocument[0]), '", "Name": "', bytes(hashAndDocument[1]), '", "Address": "' , bytes(toAsciiString(address(contracts[i]))), '"} '));
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

    function getAddressFromHash(address owner, string memory ipfsHash) public view returns(address){
        for(uint i = 0; i < owners[owner].length; i ++){
            if(keccak256(bytes(owners[owner][i].getIpfsHashAndDocumentName()[0])) == keccak256(bytes(ipfsHash))){
                return address(owners[owner][i]);
            }
        }

        //No matches
        return address(0x0);
    }

    function _addressToString(address addr) private pure returns (string memory){
        bytes memory addressBytes = abi.encodePacked(addr);

        bytes memory stringBytes = new bytes(42);

        stringBytes[0] = '0';
        stringBytes[1] = 'x';

        for(uint i = 0; i< 20; i++){
            uint8 leftValue = uint8(addressBytes[i])/16;
            uint8 rightValue = uint8(addressBytes[i]) - 16 * leftValue;

            bytes1 leftChar = leftValue < 10? bytes1(leftValue + 48) : bytes1(leftValue + 87);
            bytes1 rightChar = rightValue < 10? bytes1(rightValue + 48) : bytes1(rightValue + 87);

            stringBytes[2 * i + 3] = rightChar;
            stringBytes[2 * i + 3] = leftChar;
        }

        return string(stringBytes);
    }

    function toAsciiString(address x) internal pure returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
        bytes1 hi = bytes1(uint8(b) / 16);
        bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
}

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}