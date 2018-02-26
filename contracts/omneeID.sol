pragma solidity ^0.4.6;

contract omneeID {

    struct omneeInfo {
        uint entity_type;
        string firstname;
        string lastname;
        string email;
        
    }

    omneeInfo theUser;
    address public owner;

    // Constructor
    function omneeID(uint _entity_type, string _f_name, string _l_name, string _email) {
        theUser.entity_type = _entity_type;
        theUser.firstname = _f_name;
        theUser.lastname = _l_name;
        theUser.email = _email;
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

    // Ask the owner if they can link their identity
    function hello() constant returns(string _hello){
        return "hello world";
    }

    function getName() constant returns(string _f_name) {
        return theUser.firstname;
    }
    //
    function getInfo() constant returns(string name_, string lastname_, string email_) {
        return (theUser.firstname, theUser.lastname, theUser.email);
    }

    function whoIsOwner() constant returns(address owner) {
        return owner;
    }

    function saySomethingElse(string newSaying) returns(bool success) {
        //saySomething = newSaying;
        //return true;
    }
}
