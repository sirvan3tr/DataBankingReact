pragma solidity ^0.4.6;
import "./omneeID.sol";

contract omneePortal {
    mapping (address => address) public directory;
    address public usersOmneeID;
    
    // Create a new identity
    function createID(uint _entity_type, string _f_name, 
                        string _l_name, string _email, uint _NHSNum) public returns(string outputmessage) {
        if (directory[msg.sender] == 0) {
            address newID = new omneeID(1, _f_name, _l_name, _email, _NHSNum, msg.sender);
            directory[msg.sender] = newID;
            outputmessage = "New ID was created";
            // we have created an ID
        } else {
            // identity already exists, so lets login
            outputmessage = "ID already exists";
        }
        usersOmneeID = directory[msg.sender];
    }

    uint themsg = 0;
    function userExists() public view returns(uint themsg){
        if (directory[msg.sender] == 0) {
            // user doesnt exist
            themsg = 1;
        } else {
            // user exists
            themsg = 2;
        }
    }

    function id() constant returns(address) {
        return directory[msg.sender];
    }

    // Returns the users contract address
    function returnID() public constant returns(address omneeIDC, string theMsg) {
        if (directory[msg.sender] == 0) {
            // no ID here to return
            omneeIDC = 0;
            theMsg = "no id to return";
        } else {
            omneeIDC = directory[msg.sender];
            theMsg = "wassap";
        }
    }
}