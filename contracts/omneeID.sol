pragma solidity ^0.4.6;

contract omneeID {
    struct omneeInfo {
        uint entityType;
        string firstname;
        string lastname;
        string email;
        uint NHSNum;
        address owner;
        string msgServer;
        bool approved;
    }

    struct key {
        string title;
        string key;
        bool status;
        string comment;
        address approver;
    }

    omneeInfo omneeUser;
    address public owner;

    // list of keys
    key[] keys;

    // Constructor
    function omneeID(uint _entity_type, string _f_name, string _l_name, string _email, uint _NHSNum, address _senderAddress) public {
        // We should have a if statement and using oraclise we connect to.
        // a server with the original omneePortal address.
        // so that we only create this contract if it is created by it.
        omneeUser.entityType = _entity_type;
        omneeUser.firstname = _f_name;
        omneeUser.lastname = _l_name;
        omneeUser.email = _email;
        omneeUser.NHSNum = _NHSNum;
        omneeUser.owner = _senderAddress;
        owner = msg.sender;
    }

    // Add a key to your contract
    // status is automatically set as active, = 1
    function addKey(string _title, string _key, string _comment) public {
        key newKey;
        newKey.title = _title;
        newKey.key = _key;
        newKey.status = true;
        newKey.comment = _comment;
        keys.push(newKey);
    }

    // function to make changes to users primary information
    function changeInfo() public view returns(string) {
        // Only the creator can alter the name --
        // the comparison is possible since contracts
        // are implicitly convertible to addresses.
        if (msg.sender == address(owner)) {
            return "hello world";
        } else {
            return omneeUser.firstname;
        }
    }

    function getName() public view returns(string _f_name) {
        return omneeUser.firstname;
    }

    // Returns all the users info
    function getInfo() public view returns(string name_, string lastname_, string email_, uint NHSNum_, address _owner) {
        return (omneeUser.firstname, omneeUser.lastname, omneeUser.email, omneeUser.NHSNum, omneeUser.owner);
    }

    // Description of what is being returned
    //function getInfoDesc() public view returns(string name_, string lastname_, string email_, uint NHSNum_, address _owner) {
        //return ("First name", "Last name", "Email", "NHS number", "Owner address");
    //}
}
