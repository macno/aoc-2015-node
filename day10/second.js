
var string = '1113122113'

for(var i=0;i<50;i++) {
    var n = '';
    var c = 0;
    var ns = '';
    for(var ii=0;ii<string.length;ii++) {
        if(ii == 0) {
            n = string[ii]
        }
        if(ii > 0 && n != string[ii]) {
            ns += c +''+n;
            c = 0;
            n = string[ii]
        }
        c++;
    }
    ns += c +''+n;
    string = ns;
}
console.log('Res: ' + string.length);
