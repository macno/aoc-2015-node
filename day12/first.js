var fs = require ('fs');


fs.readFile('input','utf8',function(err,file) {
    var ret = 0;
    var data = JSON.parse(file);
    var parse = function(d) {
        var t = typeof(d);
        if(parsers[t])
            parsers[t](d);
    }
    var parsers = {
        'object': function(o) {
            var ks = Object.keys(o);
            ks.forEach(function(k){
                parse(o[k]);
            });
        },
        'number': function(n) {
            ret += n;
        }
    };

    parse(data);
    console.log('Res: ' + ret);
});
