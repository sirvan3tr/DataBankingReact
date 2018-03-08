pragma solidity ^0.4.6;

contract omneeID {

    struct omneeInfo {
        uint entityType;
        string firstname;
        string lastname;
        string email;
        string phoneNum;
        address owner;
    }

    omneeInfo theUser;
    address public owner;

    // Constructor
    function omneeID(uint _entity_type, string _f_name, string _l_name, string _email, address _senderAddress) public {
        // We should have a if statement and using oraclise we connect to.
        // a server with the original omneePortal address.
        // so that we only create this contract if it is created by it.

        theUser.entityType = _entity_type;
        theUser.firstname = _f_name;
        theUser.lastname = _l_name;
        theUser.email = _email;
        theUser.owner = _senderAddress;
        owner = msg.sender;
    }

    // function to make changes to users primary information
    function changeInfo() constant returns(string) {
        // Only the creator can alter the name --
        // the comparison is possible since contracts
        // are implicitly convertible to addresses.
        if (msg.sender == address(owner)) {
            return "hello world";
        } else {
            return theUser.firstname;
        }
    }

    function getName() public constant returns(string _f_name) {
        return theUser.firstname;
    }

    function getInfo() public constant returns(string name_, string lastname_, string email_, address _owner) {
        return (theUser.firstname, theUser.lastname, theUser.email, theUser.owner);
    }
}
