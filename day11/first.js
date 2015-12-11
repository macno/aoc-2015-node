var fullString = 'abcdefghijklmnopqrstuvwxyz';
var validString = 'abcdefghjkmnpqrstuvwxyz';
var string = 'hxbxwxba'

var c = 0;
var isValid = function() {
    var seq = false;
    var double = 0;
    var dbl = false;
    for(var i=0;i<8;i++) {
        if(i<7) {
            if(!dbl && string[i] == string[i+1]){
                double++;
                dbl = true;
            } else {
                dbl = false;
            }
        }
        if(i < 6) {
            var p = fullString.indexOf(string[i]);
            var p1 = fullString.indexOf(string[i+1]);
            if(p+1 == p1) {
                var p2 = fullString.indexOf(string[i+2]);
                if(p1+1 == p2) {
                    seq = true;
                }
            }
        }
    }
    if(double > 1 && seq)
        return true;

    return false;
}

var replaceAt = function(index, character) {
    string = string.substr(0, index) + character + string.substr(index+1);
}

var next = function(i) {

    var p = validString.indexOf(string[i]);
    if(p+1 < validString.length) {
        replaceAt(i,validString[p+1]);
        return;
    } else {
        next(i-1)
        replaceAt(i,'a');
    }

}

while(!isValid()) {
    next(7);
}

console.log('Res: ' + string);
