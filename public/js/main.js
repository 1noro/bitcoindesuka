// main.js

// var price_usd = 0;
var
    my_btc = '',
    ulength = 5,
    dlength = 8;

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function pad_with_zeroes(number, length, left) {
    var my_string = '' + number;
    if (left) {
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }
    } else {
        while (my_string.length < length) {
            my_string = my_string + '0';
        }
    }
    return my_string;
}

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

function update_data(price_usd) {
    var
        btc_value_1 = document.getElementById("btc_value_1"),
        usd_value_1 = document.getElementById("usd_value_1");

    if (my_btc) {
        var btc = my_btc.split('.'),
            usd_result = parseFloat(my_btc) * parseFloat(price_usd),
            usd = usd_result.toString().split('.');
        btc_value_1.innerHTML=pad_with_zeroes(btc[0],ulength,true)+'.'+pad_with_zeroes(btc[1],dlength,false);
        usd_value_1.innerHTML=pad_with_zeroes(usd[0],ulength,true)+'.'+pad_with_zeroes(usd[1],dlength,false);
    } else {
        var usd = price_usd.split('.');
        btc_value_1.innerHTML=pad_with_zeroes('1',ulength,true)+'.'+pad_with_zeroes('0',dlength,false);
        usd_value_1.innerHTML=pad_with_zeroes(usd[0],ulength,true)+'.'+pad_with_zeroes(usd[1],dlength,false);
    }
}

function main() {
    // this requests the file and executes a callback with the parsed result once
    //   it is available
    // alert('1: '+window.price_usd);
    my_btc = findGetParameter("btc");
    fetchJSONFile('https://api.coinmarketcap.com/v1/ticker/', function(data){
        // do something with your data
        // console.log(data);
        // alert('2: '+data[0].price_usd);
        // window.price_usd = data[0].price_usd;
        update_data(data[0].price_usd);
    });
    // alert('3: '+window.price_usd);
}
