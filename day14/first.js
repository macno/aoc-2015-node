var fs = require ('fs');


fs.readFile('input','utf8',function(err,file) {
    var ret = 0;
    var time = 2503;

    file.split("\n").forEach(function(str) {
        if(str == "")return;
        var parts = str.split(" ");
        var reindeer = parts[0],
            s = Number(parts[3]),
            m = Number(parts[6]),
            p = Number(parts[13]);
        var c = Math.floor(time / (m+p));
        var t = c*s*m;
        var d = time - (c*(m+p));
        if(d<m) {
            t+=s*d;
        } else {
            t+=s*m;
        }
        ret = Math.max(t,ret);
    })

    console.log('Res: ' + ret);

});
