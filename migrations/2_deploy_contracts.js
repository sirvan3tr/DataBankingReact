var omneeID = artifacts.require("./omneeID");
var omneePortal = artifacts.require("./omneePortal");
var omneeRegistry = artifacts.require("./omneeRegistry");

module.exports = function(deployer) {
  deployer.deploy(omneePortal);
  deployer.deploy(omneeRegistry);
  deployer.deploy(omneeID , 1, 'Sirvan', 'Almasi', 'ucabsa8@ucl.ac.uk', '9876544321', '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef');
};