pragma solidity ^0.4.6;

contract omneeID {
    struct entity {
        uint entityType;
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

    entity public omneeUser;
    address public owner;
    key[] public keys;

    // Constructor
    function omneeID(address _senderAddress) public {
        omneeUser.owner = _senderAddress;
        owner = msg.sender;
    }

    // Add a key to your contract
    // status is automatically set as active, = 1
    function addKey(string _title, string _key, string _comment) public {
        if(msg.sender == omneeUser.owner) {
            keys.push(key(_title, _key, true, _comment, address(0)));
        } 
    }

    function lenKeys() public returns (uint size) { return keys.length; }

    function getKey(uint _index) view public returns(string title, string key,
            bool status, string comment, address approver) {
        return (keys[_index].title, keys[_index].key, keys[_index].status,
            keys[_index].comment, keys[_index].approver);
    }

    function isApproved() view public returns (bool approved) {
        if(omneeUser.approved == true) return true;
        return false;
    }

    function msgServer() view public returns (string msgServer) {
        return omneeUser.msgServer;
    }

    function changeMsgServer(string _url) public returns (string outcome){
        // to save gas we assume the user is using primary key
        if(msg.sender == omneeUser.owner) {
            omneeUser.msgServer = _url;
            return "Successful";
        } else {
            return "Do not have permission";
        }
    }

    // function to make changes to users primary information
    function changeInfo() public view returns (string) {
        if (msg.sender == omneeUser.owner) {
            return "hello world";
        } else {
            return 'the user';
        }
    }


}
