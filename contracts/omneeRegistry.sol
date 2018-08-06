pragma solidity ^0.4.6;

contract omneeRegistry {
    
    struct Link {
        string link;
        string title;
        address creator;
        string status; // not in use, garbage etc...
    }

    struct Links {
        uint[] linkList; // list of keys so we can lookup a link
        mapping (uint => Link) linkStruct;
    }
    
    mapping (address => Links) linksStruct;
    address[] userAddressList;


    mapping (address => Link) theLinks;
    
    function omneeRegistry() {
    }

    function createLink(address _address, string _URL, string _title) public {
        var link = theLinks[_address];
        
        link.link = _URL;
        link.creator = msg.sender;
        link.title = _title;
        
        //instructorAccts.push(_address) -1;
    }

    function newLink(string _url, string _title, address _omneeID) {
        var newID = linksStruct[_omneeID].linkList.length + 1;
        linksStruct[_omneeID].linkList.push(newID);
        linksStruct[_omneeID].linkStruct[newID].link = _url;
        linksStruct[_omneeID].linkStruct[newID].title = _title;
        linksStruct[_omneeID].linkStruct[newID].creator = msg.sender;
    }

    // return link and title
    function getALink(address _omneeID, uint _linkID) view public returns (string, string) {
        return (linksStruct[_omneeID].linkStruct[_linkID].link,
            linksStruct[_omneeID].linkStruct[_linkID].title);
    }

    function getLink(address _address) view public returns (string, address, string) {
        return (theLinks[_address].link, theLinks[_address].creator, theLinks[_address].title);
    }
}