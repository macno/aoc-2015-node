var fs = require ('fs');

fs.readFile('input','utf8',function(err,data) {
    var strings = data.split("\n");

    var t = 0;

    var cities = {};
    var start = '';
    var addRoute = function(c1, c2, p) {
        if(!cities[c1]) {
            cities[c1] = [];
        }
        cities[c1].push({c: c2, p: p});
    }

    var nextHop = function(p) {

        var s = 0;
        var c = '';
        if(!cities[p]) {
            //console.log('No dests for ' + p);
            return;
        }
        for(var i=0,l=cities[p].length;i<l;i++) {
            if(cities[cities[p][i].c]) {
                if(s == 0) {
                    s = cities[p][i].p;
                    c = cities[p][i].c;
                } else {
                    if(cities[p][i].p < s) {
                        s = cities[p][i].p;
                        c = cities[p][i].c;
                    }
                }
            }
        }
        //console.log('Best path ' + p + ' to ' + c + ' is ' + s);
        cities[p] = false;
        t += s;
        nextHop(c);
    }

    strings.forEach(function(str) {
        if(str == '') return;
        var s = str.split(' ');
        var c1 = s[0];
        var c2 = s[2];
        var p = Number(s[4]);
        addRoute(c1,c2,p);
        addRoute(c2,c1,p);
        if(start == '') {
            start = c1;
        }
    });

    nextHop(start);
    console.log('Res: ' + t);
});
