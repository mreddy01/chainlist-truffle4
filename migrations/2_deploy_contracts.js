var chainlist = artifacts.require("./chainlist.sol");

module.exports = function(deployer) {

  deployer.deploy(chainlist);

}
