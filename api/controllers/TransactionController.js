
const dotenv = require('dotenv');

dotenv.config();
 
const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');
 
const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';

module.exports = {
    getTransactionByHash: async function (req, res) {
       
    let xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(
        req.params.hash
      );
      let cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(
        req.params.hash
      );
      let pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(
        req.params.hash
      );
  
      if (xChainTransaction != 1) {
        res.send(xChainTransaction);
        return;
      } else if (cChainTransaction[0] != 1) {
        res.send(cChainTransaction[1]);
        return;
      } else if (pChainTransaction != 1) {
        res.send(pChainTransaction);
        return;
      }
      res.send(JSON.parse(
        '{"result":"connection refused to avalanche client or api call rejected"}'));
        
      },  
    getXTransactionsAfterNthFromAddress: async function (req, res) {
          

    if (req.params.address.charAt(0) == X_CHAIN) {
        let xChainTransactions =
            await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(
              req.params.address,
              req.params.n,
              req.params.x
            );
  
        if (xChainTransactions[0] == 1) {
          res.send(xChainTransactions[1]);  
          return;    
        }
        return xChainTransactions[1];
      } else if (req.params.address.charAt(0) == P_CHAIN) {
        let pChainTransactions =
            await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(
              req.params.address,
              req.params.n,
              req.params.x
            );
  
        if (pChainTransactions == 1) {
          res.send(JSON.parse(
            '{"result":"api call rejected or not enough transactions"}')
          );
          return;
        }
        res.send(pChainTransactions);
        return;
  
      } else if (req.params.address.slice(0, 2) == C_CHAIN) {
        let  cChainTransactions =
            await cChainMethods.getXTransactionsAfterNthFromAddressFromCChain(
              req.params.address,
              req.params.n,
              req.params.x
            );
  
        res.send(cChainTransactions);
        return;
      }
      res.send(JSON.parse('{"result":"wrong chain"}'));
    },

    getXPendingTransactionsAfterNth: async function (req, res) {
        if (req.params.n > 0 && req.params.x > 0) {
      let cChainTransactions =
          await cChainMethods.getXPendingTransactionsAfterNthFromCChain(
            req.params.n,
            req.params.x
          );
    
      if (cChainTransactions[0] == 1) {
        res.send(cChainTransactions[1]);
        return;
      }
      res.send(cChainTransactions[1]);
      return;
    }
    
    res.send(JSON.parse('{"result":"n and x < 0"}'));
   
    },
    getRecentTransactionsFromPChain: async function (req, res) {
        pChainTransaction = await pChainMethods.getRecentTransactions();
    
        let xChainTransaction = await xChainMethods.getRecentTransactions();

        if (xChainTransaction[0] == 1) {
          res.send(xChainTransaction[1]);
          return;
        }
        res.send(xChainTransaction[1]);
        
    },


    getRecentTransactionsFromXChain: async function (req, res) {
    let xChainTransaction = await xChainMethods.getRecentTransactions();

    if (xChainTransaction[0] == 1) {
      res.send(xChainTransaction[1]);
      return;
    }
    res.send(xChainTransaction[1]);
}
};