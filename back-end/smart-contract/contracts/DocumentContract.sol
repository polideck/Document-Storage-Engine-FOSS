pragma solidity >=0.4.22 <0.9.0;

/* How Master Contract Moves:
    Owner Address (Used to index for each user)
        List of Document Contracts (Appends new Document Contract for every upload based on IPFS hash) (Used to search/view all documents on main search page)
            Document Contract (Has its own contract address and name for each document on blockchain)
                Document Revisions/Versions w/ Hashes (Used to download from IPFS based on hash stored)
                
 */
contract MasterContract {
    //Needs to take in public owner address 

    //Using owner address grab List of Document Contracts

    //Document Contracts
    /*List of Document Contracts:
    {
        {DOC_CONTRACT_ADDRESS: NAME_OF_DOCUMENT},
        {DOC_CONTRACT_ADDRESS: NAME_OF_DOCUMENT},
        {DOC_CONTRACT_ADDRESS: NAME_OF_DOCUMENT}
    } */




    //Function needed to take IPFS hash and make new Document Contract (or add new revision) (FOR UPLOAD)

    //Function needed to get all document contracts from specified owner (FOR SEARCH/VIEWING)

    //Function needed to download most recent document revision (actually getting hash) (FOR DOWNLOAD)

    //Function needed to grab most recent document revision to delete (FOR DELETE)

}


contract DocumentContract {
    //List Document Revisions and their respective hashes
    //Want an array of document versions

}