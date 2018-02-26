pragma solidity ^0.4.6;

contract omneeRegistry {
    
    struct Registry {
        string link;
        address creator ;
    }
    
    mapping (address => Registry) theLinks;
    //address[] public instructorAccts;
    
    function omneeRegistry() {
    }

    function createLink(address _address, string _URL) public {
        var link = theLinks[_address];
        
        link.link = _URL;
        link.creator = msg.sender;
        //instructorAccts.push(_address) -1;
    }
    
    function getLink(address _address) constant public returns (string, address) {
        return (theLinks[_address].link, theLinks[_address].creator);
    }

    function test() constant public returns(uint) {
        return 69;
    }
}