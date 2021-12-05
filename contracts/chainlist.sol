pragma solidity >0.5.0;

import "./ownable.sol";

contract chainlist is ownable {

  // custom typeString
  struct Article{
    uint id;
    address payable seller;
    address buyer;
    string name;
    string description;
    uint256 price;
  }

  mapping (uint => Article) public articles;
  uint articleCounter;


// store variables\
//address owner;

//constructor() public {
//  owner = msg.sender;
//}




//events
event logSellArticle(uint indexed _id, address indexed _seller,
  string _name,
  uint256 _price
  );

  event logBuyArticle(uint indexed _id, address indexed _seller,address indexed _buyer,
    string _name,
    uint256 _price
    );

    //modifier onlyOwner(){
    //  require(msg.sender == owner);
    //  _;

    //}

//constructor() public {
//function chainlist() public {
//  sellArticle('Defaulat Article', 'This is an article by dedault', 1000000000000000000);
//}


//sell an
function sellArticle(string memory _name, string memory _description, uint256 _price) public {

  articleCounter++;
  articles[articleCounter] = Article(
    articleCounter,
    msg.sender,
    address(0x0),
    _name,
    _description,
    _price
    );




  emit logSellArticle(articleCounter, msg.sender, _name, _price);


}

//fethch number of articles in contracts
function getNumberOfArticles() public view returns (uint) {
  return articleCounter;
}

function getArticlesForSale() public view returns (uint[] memory) {
  uint[] memory articleIds = new uint[](articleCounter);

  uint numberOfArticlesForSale = 0;

  for(uint i = 1; i <= articleCounter; i++){
    if(articles[i].buyer == address(0x0)) {
      articleIds[numberOfArticlesForSale] = articles[i].id;
      numberOfArticlesForSale++;
    }
  }

  // copy articles id array to a smaller isInlineArray
  uint[] memory forSale = new uint[](numberOfArticlesForSale);
  for(uint j=0; j <numberOfArticlesForSale; j++) {
    forSale[j] = articleIds[j];
  }
  return forSale;
}





function buyArticle(uint _id) payable public {
  // is there an article for salee

  require(articleCounter > 0, "There are articles for sale");
  require(_id > 0 && _id <= articleCounter, "check that article exists");

  Article storage article = articles[_id];
  require(article.buyer == address(0x0), "The article has already been sold");
  require(msg.sender != article.seller, "The seller cannot buy his own article");
  require(msg.value == article.price, "Payment doesnt match price");
  article.buyer = msg.sender;
  article.seller.transfer(msg.value);

  //triger events
  emit logBuyArticle(_id, article.seller, article.buyer, article.name, article.price);

  }

  function kill() public onlyOwner {
    //require(msg.sender == owner, "only allowed to contracts owner");
    selfdestruct(msg.sender);
  }





}
