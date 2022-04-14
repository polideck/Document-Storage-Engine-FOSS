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

    constructor(string memory _ipfsHash, address _ownerAddress, string memory _documentName){
        ipfsHash = _ipfsHash;
        ownerAddresses.push(_ownerAddress);
        documentName = _documentName;
    }
    
    //Hashes to previous versions of document
    RevisionDocument[] public revisions;

    function appendRevision(string memory newIpfsHash) public{
        revisions.push(RevisionDocument({ipfsHash:ipfsHash}));

        ipfsHash = newIpfsHash;
    }

    function getOwners() public view returns(address[] memory){
        return ownerAddresses;
    }

    function deleteOwner(address ownerAddress) public{
        for(uint i = 0; i < ownerAddresses.length; i++){
            if(ownerAddress == ownerAddresses[i]){
                ownerAddresses[i] = ownerAddresses[ownerAddresses.length - 1];
                ownerAddresses.pop();
                break;
            }
        }
    }
}