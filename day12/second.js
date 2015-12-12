var fs = require ('fs');


fs.readFile('input','utf8',function(err,file) {

    var data = JSON.parse(file);


    var ret = 0;
    var parse = function(d) {
        var t = typeof(d);
        if(t == 'object') {
            if (!Array.isArray(d)) {
                if(!isValid(d)) {
                    return ;
                }
            }
        }
        if(parsers[t]) {
            parsers[t](d);
        }
    }
    var isValid = function(d) {
        var ks = Object.keys(d);
        for(var i=0;i<ks.length;i++) {
            if(d[ks[i]] === 'red') {
                return false;
            }
        }
        return true;
    }
    var parsers = {
        'object': function(o) {
            var ks = Object.keys(o);
            ks.forEach(function(k){
                parse(o[k]);
            });
        },
        'number': function(n) {
            ret +=n;
        }
    };

    parse(data);
    console.log('Res: ' + ret);
});
