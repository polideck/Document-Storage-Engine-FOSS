pragma solidity ^0.8.13;

contract DocumentContract {
    struct RevisionDocument{
        string name;
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

    function getOwners() public view returns(address[] memory){
        return ownerAddresses;
    }

    function updateDocument(string memory newIpfsHash, string  memory newName) public{
        revisions.push(RevisionDocument(
            {ipfsHash: ipfsHash, name: documentName}
            ));

        ipfsHash = newIpfsHash;
        documentName = newName;
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