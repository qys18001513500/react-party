import axios from 'axios';
import CryptoJS from  'crypto-js';

const sign = function (data) {
    var keys = [];
    for (var key in data) {
        //{'_t':"2108",'aa':'123','data':0};
        //_t=2018&aa=123&data=0
        keys.push(key);
    }
    keys.sort();
    var linkstr = "";
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        linkstr += key + "=" + data[key] + "&";
    }
    linkstr = linkstr.substr(0, linkstr.length - 1);
    return CryptoJS.MD5(linkstr).toString();

};

axios.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                "sign": sign(config.data)
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = 'http://api.chinawaytek.com/party/';