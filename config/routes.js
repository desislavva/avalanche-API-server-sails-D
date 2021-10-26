/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  ///////// NETWORK //////////////
  '/network': { controller: 'NetworkController', action: 'getNetWorkActivity' },

  /////////// BLOCKS /////////////
  '/blocks/hash/:hash': { controller: 'BlockController', action: 'getBlockByHash' },
  '/blocks/number/:blocknumber': { controller: 'BlockController', action: 'getBlockByNumber' },
  '/blocks/numbers/:blocknumber/:count': { controller: 'BlockController', action: 'getXBlocksFromNthFromCChain' },

  ///////// TRANSACTIONS //////////
  '/transactions/hash/:hash': { controller: 'TransactionController', action: 'getTransactionByHash' },
  '/transactions/:address/:n/:x': { controller: 'TransactionController', action: 'getXTransactionsAfterNthFromAddress' },
  '/transactions/:n/:x': { controller: 'TransactionController', action: 'getXPendingTransactionsAfterNth' },
  '/transactions/recentxchain': { controller: 'TransactionController', action: 'getRecentTransactionsFromXChain' },
  '/transactions/recentpchain': { controller: 'TransactionController', action: 'getRecentTransactionsFromPChain' },

  ///////// ADDRESS /////////////
  '/address/hash/:hash': { controller: 'AddressController', action: 'getAddressInfoByHash' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
