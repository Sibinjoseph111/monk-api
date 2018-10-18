// Code to get access_token
// Token returned as Promise

// console.log('getToken Initiated');

var request = require('request');

const base64 = 'ZDYwNTkxMWFiZDg1OTNiODU5MmVhNWRiZjlhNjlkOjRiN2NiNjBkNWY3NWE0MmMzZGQxZTNiNjg0OTgyZA==';
const clientid = 'd605911abd8593b8592ea5dbf9a69d';
const scope = 'advcampaigns banners websites advcampaigns_for_website manage_opt_codes opt_codes payments';
const token_url = 'https://api.admitad.com/token/';

var getToken = () => {

    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Basic ${base64}`,
            'Content-type': 'application/x-www-form-urlencoded'
        };
        
        var dataString = `grant_type=client_credentials&client_id=${clientid}&scope=${scope}`;
        
        var options = {
            url: token_url ,
            method: 'POST',
            headers: headers,
            body: dataString,
            json: true
        };
    
        request(options,(error, response, body) => {
            if(error){
                reject('Unable to reach server');
            }else{
                // console.log(body); 
                resolve(body.access_token);
            }
        });
    });
};

module.exports = {
    getToken
};