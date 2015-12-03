var fs = require ('fs');

fs.readFile('input',function(err,data) {
    var houses = {}, 
        lastx = 0, lasty = 0,
        lastrx = 0, lastry = 0;

    var knockDoor = function(x,y) {
        if(typeof(houses[x+','+y]) == 'undefined') {
            houses[x+','+y] = 0;
        } else {
            houses[x+','+y]++;
        }
    }

   var visitHouse = function(issanta, i) {
       var x,y;
        if(issanta) {
            x = lastx;
            y = lasty;
        } else {
            x = lastrx;
            y = lastry;
        }
        switch(data[i]) {
            case 62:
                x++;
                break;

            case 60:
                x--;
                break;

            case 94:
                y++;
                break;

            case 118:
                y--;
                break;
        }
        knockDoor(x,y);
        if(issanta) {
            lastx = x;
            lasty = y;
        } else {
            lastrx = x;
            lastry = y;
        }
   }
    knockDoor(0,0);
    for(var i=0,l=data.length;i<l;i++) {
        visitHouse( i % 2, i);
    }
    console.log('Visited: '+ Object.keys(houses).length);
});
