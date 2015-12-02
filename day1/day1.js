var fs = require ('fs');

fs.readFile('input',function(err,data) {
    var floor = 0;
    for(var i=0,l=data.length;i<l;i++) {
        var c = data[i];
        if(c == 40)
            floor++;
        else if(c == 41)
            floor--;
        if(floor == -1) {
            console.log('Pos: ' +(i+1));
            return;
        }
    }
});
