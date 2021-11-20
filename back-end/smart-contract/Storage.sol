pragma solidity ^0.4.18;

contract Storage {
    
    uint documentHash;
    
    function set(uint data) public {
        documentHash = data;
    }
    
    function get() public view returns (uint){
        return documentHash;
    }
    
}
