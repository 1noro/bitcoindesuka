// main.js

// var price_usd = 0;
var
    my_btc = '',
    ulength = 8,
    dlength = 8,
    interval1 = 0;

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

function pad_with_zeroes3(number, length, left) {
    var
        pre_mstr = '' + number,
        mstr = pre_mstr.split(''),
        out = '';
    if (left) {
        out=pre_mstr;
        while (out.length < length) {
            out = '0' + out;
        }
    } else {
        var i = 0;
        while (out.length < length) {
            out = out + (mstr[i]?mstr[i]:'0');
            i++;
        }
    }
    return out;
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

function update_time() {
    var
        span = document.getElementById("update_time"),
        d = new Date(),
        hh = pad_with_zeroes3(d.getHours(),2,true),
        mm = pad_with_zeroes3(d.getMinutes(),2,true),
        ss = pad_with_zeroes3(d.getSeconds(),2,true);
    span.innerHTML = hh+':'+mm+':'+ss;
}

function update_data_cmc(price_usd) {
    var
        btc_value = document.getElementById("btc_value_1"),
        usd_value = document.getElementById("usd_value_1");

    if (my_btc) {
        var btc = my_btc.split('.'),
            usd_result = parseFloat(my_btc) * parseFloat(price_usd),
            usd = usd_result.toString().split('.');
        btc_value.innerHTML=pad_with_zeroes3(btc[0],ulength,true)+'.'+pad_with_zeroes3(btc[1],dlength,false);
        usd_value.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    } else {
        var usd = price_usd.split('.');
        btc_value.innerHTML=pad_with_zeroes3('1',ulength,true)+'.'+pad_with_zeroes3('0',dlength,false);
        usd_value.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    }
}

function update_data_cb_usd(price_usd) {
    var
        btc_value = document.getElementById("btc_value_2"),
        usd_value = document.getElementById("usd_value_2");

    if (my_btc) {
        var btc = my_btc.split('.'),
            usd_result = parseFloat(my_btc) * parseFloat(price_usd),
            usd = usd_result.toString().split('.');
        btc_value.innerHTML=pad_with_zeroes3(btc[0],ulength,true)+'.'+pad_with_zeroes3(btc[1],dlength,false);
        usd_value.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    } else {
        var usd = price_usd.split('.');
        btc_value.innerHTML=pad_with_zeroes3('1',ulength,true)+'.'+pad_with_zeroes3('0',dlength,false);
        usd_value.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    }
}

function update_data_cb_eur(price_usd) {
    var
        usd_value = document.getElementById("eur_value_2");

    if (my_btc) {
        var btc = my_btc.split('.'),
            usd_result = parseFloat(my_btc) * parseFloat(price_usd),
            usd = usd_result.toString().split('.');
        usd_value.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    } else {
        var usd = price_usd.split('.');
        usd_value.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    }
}

function main() {
    my_btc = findGetParameter("btc");

    fetchJSONFile('https://api.coinmarketcap.com/v1/ticker/', function(data){update_data_cmc(data[0].price_usd);});
    fetchJSONFile('https://api.coinbase.com/v2/prices/spot?currency=USD', function(data){update_data_cb_usd(data.data.amount)});
    fetchJSONFile('https://api.coinbase.com/v2/prices/spot?currency=EUR', function(data){update_data_cb_eur(data.data.amount)});
    update_time();

    interval1 = setInterval(function(){
        fetchJSONFile('https://api.coinmarketcap.com/v1/ticker/', function(data){update_data_cmc(data[0].price_usd);});
        fetchJSONFile('https://api.coinbase.com/v2/prices/spot?currency=USD', function(data){update_data_cb_usd(data.data.amount)});
        fetchJSONFile('https://api.coinbase.com/v2/prices/spot?currency=EUR', function(data){update_data_cb_eur(data.data.amount)});
        update_time();
    }, 10000);
}
