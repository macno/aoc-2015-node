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
                    if(cities[p][i].p > s) {
                        s = cities[p][i].p;
                        c = cities[p][i].c;
                    }
                }
            }
        }
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

    var cc = Object.keys(cities);
    var safeCities = JSON.stringify(cities);
    var tt =0;
    for(var i=0,l=cc.length;i<l;i++) {
        if(t > tt)
            tt = t;
        if(i > 0) {
            cities = JSON.parse(safeCities);
            t = 0;
        }
        nextHop(cc[i]);
    }

    console.log('Res: ' + tt);
});
