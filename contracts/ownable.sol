pragma solidity >0.5.0;
contract ownable {

  address owner;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  constructor() public {
    owner = msg.sender;
  }
}
