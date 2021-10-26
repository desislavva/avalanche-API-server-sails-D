const dotenv = require('dotenv');

const cChainMethods = require('../services/c-chain');

dotenv.config();


module.exports = {

getBlockByHash: async function (req, res) {
    const blockFromCChain = await cChainMethods.getBlockByHashFromCChain(
    req.params.hash
  );
  
  if (blockFromCChain[0] == 1) {
    res.send(blockFromCChain[1]);
    return;
  }
  res.send(blockFromCChain[1]);
  
},

getBlockByNumber: async function (req, res) {
    const cChainNumber = await cChainMethods.getBlockByNumberFromCChain(
        req.params.blocknumber
      );
      
      if (cChainNumber[0] == 1) {
        res.send(cChainNumber[1]);
        return;
      }
      res.send(cChainNumber[0]);
      
},
getXBlocksFromNthFromCChain: async function (req, res) {
    const cChainArray = [];
    let k = 0;

    const blockNumber = req.params.blocknumber;
    const count = req.params.count;

    for (let i = blockNumber - count; i < blockNumber; ++i) {
      let hashValue = await cChainMethods.getBlockByNumberFromCChain(i);

      if (hashValue[0] == 1) {
        res.send(hashValue[1]);
        return;
      } else {
        cChainArray[k] = hashValue[1];
        k++;
      }
    }

    res.send(cChainArray);
      
}
};
