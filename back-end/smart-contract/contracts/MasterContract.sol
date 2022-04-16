pragma solidity >=0.4.22 <0.9.0;

import "./DocumentContract.sol";
/* How Master Contract Moves:
    Owner Address (Used to index for each user)
        List of Document Contracts (Appends new Document Contract for every upload based on IPFS hash) (Used to search/view all documents on main search page)
            Document Contract (Has its own contract address and name for each document on blockchain)
                Document Revisions/Versions w/ Hashes (Used to download from IPFS based on hash stored)
                
 */

contract MasterContract {
    address constant private serverAddress = 0x21f93e128a6D7926A37DF0c2a94bd0248ea343eF;
    modifier onlyOwner(){
        require(msg.sender == serverAddress);
        _;
    }

    //ownerAddress => documentContracts
    mapping(address => address[]) public owners;

    //Using owner address grab List of Document Contracts
    function getListOfDocuments(address owner) public view returns(address[] memory){
        return owners[owner];
    }

    //Note: Add in onlyOwner modifier
    function uploadDocument(string memory ipfsHash, address ownerAddress, string memory documentName) public{
        owners[ownerAddress].push(address(new DocumentContract(ipfsHash, ownerAddress, documentName)));
    }

    //Function needed to get all or specifically searched document contracts from specified owner (FOR SEARCH/VIEWING)
    //Note: Add in onlyOwner modifier
    function getContractsByOwner(address ownerAddress) public view returns(address[] memory){
        return owners[ownerAddress];
    }

    //Note: Add in onlyOwner modifier
    function deleteOwnerFromDocument(address owner, address document) public{
        address[] memory documentAddresses = owners[owner];
        for(uint i = 0; i < documentAddresses.length; i++){
            if(documentAddresses[i] == document){
                documentAddresses[i] = documentAddresses[documentAddresses.length - 1];
                delete documentAddresses[documentAddresses.length - 1];
                break;
            }
        }

        owners[owner] = documentAddresses;
    }
}
