var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var omneeID = artifacts.require("./omneeID");
var omneePortal = artifacts.require("./omneePortal");
var omneeRegistry = artifacts.require("./omneeRegistry");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(omneePortal);
  deployer.deploy(omneeRegistry);
  deployer.deploy(omneeID , 1, 'Sirvan', 'Almasi', 'themail', '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef');
};