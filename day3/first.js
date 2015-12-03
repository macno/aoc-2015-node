var fs = require ('fs');

fs.readFile('input',function(err,data) {
    var houses = {}, 
        lastx = 0, lasty = 0;

    var knockDoor = function(x,y) {
        if(typeof(houses[x+','+y]) == 'undefined') {
            houses[x+','+y] = 0;
        } else {
            houses[x+','+y]++;
        }
    }
    knockDoor(lastx,lasty);

    for(var i=0,l=data.length;i<l;i++) {
        switch(data[i]) {
            case 62:
                lastx++;
                break;

            case 60:
                lastx--;
                break;

            case 94:
                lasty++;
                break;

            case 118:
                lasty--;
                break;
        }
        knockDoor(lastx,lasty);
    }
    console.log('Visited: '+ Object.keys(houses).length);
});
