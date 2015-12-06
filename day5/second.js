var fs = require ('fs');
var testmode = false;
var input = (testmode) ? 'input_test_2' : 'input';

fs.readFile(input,'utf8',function(err,data) {
    var nices = 0;
    var strings = data.split("\n");
    data = null;
    strings.forEach(function(str) {
        if(str == '') return;
        if(testmode) {
            console.log('\n\String: ' + str);
        }
        var haspair = false;
        var isdouble = false;
        for(var i=0,l=str.length;i<l;i++) {
            var c = str[i];
            if(testmode) {
                console.log('Char: ' + c);
            }

            if(i+1 < str.length) {
                // check next
                var n = str[i+1];
                if(testmode) {
                    console.log('\tNext Char: ' + n);
                }
                // search pair..
                var p = str.indexOf(c+n, i+2);
                if(p >= 0) {
                    haspair = true;
                    if(testmode) {
                        console.log('haspair: ' + (c+n));
                    }
                }
            }

            if(i+2 < str.length) {
                // check next
                var nn = str[i+2];
                if(testmode) {
                    console.log('\tNext next Char: ' + nn);
                }
                if(c == nn) {
                    isdouble = true;
                    if(testmode) {
                        console.log('isdouble: ' + c);
                    }
                }
            }

        }
        if(isdouble && haspair) {
            if(testmode) {
                console.log('nice!');
            }
            nices++;
        } else {
            if(testmode) {
                console.log('naughty!');
            }
        }

    });
    console.log('Res: ' + nices);
});
