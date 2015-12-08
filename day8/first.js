var fs = require ('fs');

fs.readFile('input','utf8',function(err,data) {
    var strings = data.split("\n");

    var s = 0;
    var c = 0;

    strings.forEach(function(str) {
        if(str == '') return;
        c += str.length;
        var t = eval(str);
        s += t.length;
    });

    console.log('Res: ' + (c-s));
});
