var fs = require ('fs');
var testmode = false;
var input = (testmode) ? 'input_test_1' : 'input';

fs.readFile(input,'utf8',function(err,data) {
    var nices = 0;
    var strings = data.split("\n");
    data = null;
    strings.forEach(function(str) {
        if(str == '') return;
        if(testmode) {
            console.log('\n\String: ' + str);
        }

        var cv = 0;
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

                if( (c == 'a' && n =='b' ) || (c == 'c' && n == 'd' ) || (c == 'p' && n == 'q' ) || (c == 'x' && n == 'y') ) {
                    if(testmode) {
                        console.log('excluded');
                    }
                    return;
                }
                // double ?
                if(n == c) {
                    if(testmode) {
                        console.log('isdouble');
                    }
                    isdouble = true;
                }

            }
            if(c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                if(testmode) {
                    console.log('is vowel');
                }
                cv++;
            }
        }
        if(isdouble && cv >= 3) {
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
