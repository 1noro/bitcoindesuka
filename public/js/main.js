// main.js

window.price_usd = 0;

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function main() {
    // this requests the file and executes a callback with the parsed result once
    //   it is available
    alert(price_usd);
    fetchJSONFile('https://api.coinmarketcap.com/v1/ticker/', function(data){
        // do something with your data
        // console.log(data);
        // alert(data[0].id);
        window.price_usd=data[0].price_usd;
    });
    alert(window.price_usd);
}
