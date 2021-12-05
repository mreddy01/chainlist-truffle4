var chainlist = artifacts.require("./chainlist.sol");

contract("chainlist", function(accounts){
  var chainlistInstance;
  var seller = accounts[1];
  var buyer = accounts[2];
  var articleName = "Article 1";
  var articleDescription = "description for article 1";
  var articlePrice = 10;

  it("should throw an exception if you try to buy an article when no article is on sale", function(){
  return chainlist.deployed().then(function(instance){
    chainlistInstance = instance;
    return chainlistInstance.buyArticle(1, {
      from: buyer,
      value: web3.toWei(articlePrice.toString(), "ether")
    });
  }).then(assert.fail).catch(function(error){
    assert(true);
  }).then(function(){
    return chainlistInstance.getNumberOfArticles();

  }).then(function(data){
    assert.equal(data.toNumber(), 0, "Number of articles=0");
  });
  });

  //buy an article that does not exists
  it("should throw non-existing articles", function(){
    return chainlist.deployed().then(function(instance){
      chainlistInstance = instance;
      return chainlistInstance.sellArticle(articleName, articleDescription, web.utils.toWei(articlePrice.toString(), ""))
    }).then(function(receipt){
      return chainlistInstance.buyArticle(2, {from:seller, value:web3.utils.toWei(articlePrice,"ether")});
    }).then(assert.fail).catch(function(error){
      assert(true);
    }).then(function(){
      return chainlistInstance.articles(1);
    }).then(function(data){
      assert.equal(data[0].toNumber(), 1, "article must be 1");
      assert.equal(data[1], seller, "seller must be " + seller);
      assert.equal(data[2], 0x0, "buyer must be empty");
      assert.equal(data[3], articleName, "article name must be 1" + articleName);
      assert.equal(data[4], articleDescription, "article name must be 1" + articleDescription);
      assert.equal(data[5].toNumber(), web3.utils.toWei(articlePrice.toString(), "ether"), "event article price must be " + web3.utils.toWei(articlePrice.toString(), "ether"));

    });
  });

it("should throw an exception if you try to buy ypur own article" , function(){
  return chainlist.deployed().then(function(instance) {
    chainlistInstance = instance;
    return chainlistInstance.buyArticle(1,{from:seller, value: web3.utils.toWei(articlePrice.toString(), "ether")});
  }).then(assert.fail).catch(function(error) {
    assert(true);
  }).then(function(){
    return chainlistInstance.articles(1);
  }).then(function(data){
    assert.equal(data[0].toNumber(), 1, "article must be 1");
    assert.equal(data[1], seller, "seller must be " + seller);
    assert.equal(data[2], 0x0, "buyer must be empty");
    assert.equal(data[3], articleName, "article name must be 1" + articleName);
    assert.equal(data[4], articleDescription, "article name must be 1" + articleDescription);
    assert.equal(data[5].toNumber(), web3.utils.toWei(articlePrice.toString(), "ether"), "event article price must be " + web3.utils.toWei(articlePrice.toString(), "ether"));
  })
})


it("should throw an exception if you try to buy an article when no article is on sale", function(){
  return chainlist.deployed().then(function(instance){
    chainlistInstance = instance;
    return chainlistInstance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice.toString(), "ether"));
  }).then(function(receipt){
    return chainlistInstance.buyArticle(1, {from:seller, value: web3.toWei(articlePrice.toString(),"ether")});
  }).then(assert.fail)
    .catch(function(error){
    assert(true);
  }).then(function(){
    return chainlistInstance.articles(1);

  }).then(function(data){
    assert.equal(data[0].toNumber(), 1, "article must be 1");
    assert.equal(data[1], seller, "seller must be " + seller);
    assert.equal(data[2], 0x0, "buyer must be empty");
    assert.equal(data[3], articleName, "article name must be 1" + articleName);
    assert.equal(data[4], articleDescription, "article name must be 1" + articleDescription);
    assert.equal(data[5].toNumber(), web3.utils.toWei(articlePrice.toString(), "ether"), "event article price must be " + web3.utils.toWei(articlePrice.toString(), "ether"));
  });
});


it("should throw an exception if you try to buy an article with differt price", function(){
  return chainlist.deployed().then(function(instance){
    chainlistInstance = instance;
    return chainlistInstance.buyArticle(1, {from:buyer, value: web3.toWei((articlePrice + 1).toString(),"ether")});
  }).then(assert.fail)
    .catch(function(error){
    assert(true);
  }).then(function(){
    return chainlistInstance.articles(1);
  }).then(function(data){
    assert.equal(data[0].toNumber(), 1, "article must be 1");
    assert.equal(data[1], seller, "seller must be " + seller);
    assert.equal(data[2], 0x0, "buyer must be empty");
    assert.equal(data[3], articleName, "article name must be 1" + articleName);
    assert.equal(data[4], articleDescription, "article name must be 1" + articleDescription);
    assert.equal(data[5].toNumber(), web3.utils.toWei(articlePrice.toString(), "ether"), "event article price must be " + web3.utils.toWei(articlePrice.toString(), "ether"));
  });
});


it("should throw an exception if you try to buy an article that was already sold", function(){
  return chainlist.deployed().then(function(instance){
    chainlistInstance = instance;
    return chainlistInstance.buyArticle(1,{from:buyer, value: web3.toWei((articlePrice).toString(),"ether")});
  }).then(function(){
    return chainlistInstance.buyArticle(1,{from:web3.eth.accounts[0], value: web3.toWei((articlePrice).toString(),"ether")});
  }).then(assert.fail)
    .catch(function(error){
    assert(true);
  }).then(function(){
    return chainlistInstance.articles(1);
  }).then(function(data){
    assert.equal(data[0].toNumber(), 1, "article must be 1");
    assert.equal(data[1], seller, "seller must be " + seller);
    assert.equal(data[2], 0x0, "buyer must be empty");
    assert.equal(data[3], articleName, "article name must be 1" + articleName);
    assert.equal(data[4], articleDescription, "article name must be 1" + articleDescription);
    assert.equal(data[5].toNumber(), web3.utils.toWei(articlePrice.toString(), "ether"), "event article price must be " + web3.utils.toWei(articlePrice.toString(), "ether"));
  });
});


});
