
var request = require('request');

var getStores = (token) =>{

    // console.log('ok 1');

    var headers = {
        'Authorization': `Bearer ${token}`
    };
    
    var options = {
        url: 'https://api.admitad.com/advcampaigns/website/927356/',
        headers: headers
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log('Ok');
            var details = JSON.parse(body);
            var count = details._meta.count;
            for(var i=0; i<count;i++){
                console.log(details.results[i].name);
                console.log(details.results[i].gotolink);
                console.log(details.results[i].id);
                console.log(details.results[i].actions[0].payment_size+"\n\n")

            }
        }
        if(error){
            console.log('error');
        }
        
    }
    
    request(options, callback);

};

module.exports = {
    getStores
};


