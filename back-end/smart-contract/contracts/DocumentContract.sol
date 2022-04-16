pragma solidity ^0.8.13;

contract DocumentContract {
    struct RevisionDocument{
        string name;
        string ipfsHash;
    }

    string public ipfsHash;
    string public documentName;
    RevisionDocument[] public revisions;

    constructor(string memory _ipfsHash, string memory _documentName){
        ipfsHash = _ipfsHash;
        documentName = _documentName;
    }

    function updateDocument(string memory newIpfsHash, string  memory newName) public{
        revisions.push(RevisionDocument({ipfsHash: ipfsHash, name: documentName}));

        ipfsHash = newIpfsHash;
        documentName = newName;
    }

    function getIpfsHashAndDocumentName() public view returns(string[2] memory){
        return [ipfsHash, documentName];
    }

    function getRevisionDocument() public view returns(RevisionDocument[] memory){
        return revisions;
    }
}