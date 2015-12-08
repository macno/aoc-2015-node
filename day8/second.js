var fs = require ('fs');

fs.readFile('input','utf8',function(err,data) {
    var strings = data.split("\n");
    var c = 0;
    var s = 0;

    strings.forEach(function(str) {
        if(str == '') return;
        var str2 = '';

        for(var i=0,l=str.length;i<l;i++) {
            var sc = str[i];

            if(sc == '\\') {
                if(str[i+1] == '"') {
                    str2 += '\\\\\\"';
                } else if(str[i+1] == 'x') {
                    str2 += '\\\\x';
                } else if(str[i+1] == '\\' ) {
                    str2 += '\\\\\\\\';
                }
                i++;
                continue;
            }
            if(i+1 == l) {
                str2 += '\\"';
            }
            str2 += sc;
            if(i==0) {
                str2 += '\\"';
            }
        }
        s += str2.length;
        c += str.length;

    });

    console.log('Res: ' + (s-c));
});
