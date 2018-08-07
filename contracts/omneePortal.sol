pragma solidity ^0.4.6;
import "./omneeID.sol";

contract omneePortal {
    mapping (address => address) public directory;
    address public usersOmneeID; // tmp store to retrieve id of new con'
    
    // Create a new identity
    function createID() public returns (bool status_, address newID_) {
        if (directory[msg.sender] == 0) {
            address newID = new omneeID(msg.sender);
            directory[msg.sender] = newID;
            usersOmneeID = directory[msg.sender];
            return (true, newID);
        } else {
            return (false, address(0));
        }
    }

    // Id of my contract
    function id() public view returns(address) { return directory[msg.sender]; }

    // Returns the users contract address
    function returnID() public view returns(bool status_, address omneeID_) {
        if (directory[msg.sender] == 0) {
            return (false, address(0));
        } else {
            return (true, directory[msg.sender]);
        }
    }
}