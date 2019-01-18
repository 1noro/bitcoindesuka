// main.js

// var price_usd = 0;
var
    my_btc = '',
    ulength = 8,
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

function pad_with_zeroes2(number, length, left) {
    var
        pre_mstr = '' + number,
        mstr = pre_mstr.split(''),
        out = '';
    if (left) {
        var i = mstr.length-1;
        while (out.length < length) {
            out = (mstr[i]?mstr[i]:'0') + out;
            i--;
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

function update_data(price_usd) {
    var
        btc_value_1 = document.getElementById("btc_value_1"),
        usd_value_1 = document.getElementById("usd_value_1");

    if (my_btc) {
        var btc = my_btc.split('.'),
            usd_result = parseFloat(my_btc) * parseFloat(price_usd),
            usd = usd_result.toString().split('.');
        btc_value_1.innerHTML=pad_with_zeroes3(btc[0],ulength,true)+'.'+pad_with_zeroes3(btc[1],dlength,false);
        usd_value_1.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    } else {
        var usd = price_usd.split('.');
        btc_value_1.innerHTML=pad_with_zeroes3('1',ulength,true)+'.'+pad_with_zeroes3('0',dlength,false);
        usd_value_1.innerHTML=pad_with_zeroes3(usd[0],ulength,true)+'.'+pad_with_zeroes3(usd[1],dlength,false);
    }
}

function main() {
    my_btc = findGetParameter("btc");
    fetchJSONFile('https://api.coinmarketcap.com/v1/ticker/', function(data){

        update_data(data[0].price_usd);
    });
}
