pragma solidity ^0.8.13;

contract DocumentContract {
    struct RevisionDocument{
        string ipfsHash;
    }

    //List Document Revisions and their respective hashes
    //Want an array of document versions
    string public ipfsHash;
    address[] public ownerAddresses;

    string public documentName;

    constructor(string memory _ipfsHash, address[] memory _ownerAddresses, string memory _documentName){
        ipfsHash = _ipfsHash;
        ownerAddresses = _ownerAddresses;
        documentName = _documentName;
    }
    
    //Hashes to previous versions of document
    RevisionDocument[] public revisions;

    function AppendRevision(string memory newIpfsHash) public{
        revisions.push(RevisionDocument({ipfsHash:ipfsHash}));

        ipfsHash = newIpfsHash;
    }

    function GetOwners() public view returns(address[] memory){
        return ownerAddresses;
    }
}