
var {getToken} = require('./admitad/token.js');
var {getStores} = require('./admitad/store-details');

var adSpaceId = '927356';

getToken().then((token) => {
    // console.log(token);
    getStores(token);
});