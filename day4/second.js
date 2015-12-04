var crypto = require("crypto");


var secret = 'bgvyzdsv';
var c = 0;
while(true) {
        var hash = crypto.createHash('md5').update(secret+c)
              .digest("hex");
        if(hash.substring(0,6) == '000000')
            break;
        c++;
}
console.log('Res is ' + c);
