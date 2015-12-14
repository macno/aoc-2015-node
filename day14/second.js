var fs = require ('fs');


fs.readFile('input','utf8',function(err,file) {
    var ret = 0;
    var time = 2503;

    var reindeers = [];

    file.split("\n").forEach(function(str) {
        if(str == "")return;
        var parts = str.split(" ");
        var reindeer = parts[0],
            s = Number(parts[3]),
            m = Number(parts[6]),
            p = Number(parts[13]);
        reindeers.push([reindeer, s, m, p, 0, 0]);

    })
    var run = function(ts, s, m, p) {
        var c = Math.floor(ts / (m+p));
        var d = ts - (c*(m+p));
        if(d<m) {
            return s;
        } else {
            return 0;
        }
    }
    var addPoint = function(reindeer) {
        for(var i=0;i<reindeers.length;i++) {
            if(reindeers[i][0]==reindeer)
                reindeers[i][4]++;
        }
    }

    for(var i=0;i<time;i++) {
        var leaders = [];
        var top = 0;
        reindeers.forEach(function(reindeer,x) {
            var t = run(i, reindeer[1],reindeer[2],reindeer[3]);
            reindeer[5]+=t;
            //console.log('Second ' + i + ' ' + reindeer[0] + ' runs ' + reindeer[5]);
            if(reindeer[5] > top) {
                leaders = [];
                top = reindeer[5];
            }
            if(reindeer[5] >= top) {
                leaders.push(reindeer[0])
            }
        });
        //console.log('Second ' + i + ' Leader is ' + leaders);
        leaders.forEach(function(reindeer) {
            addPoint(reindeer);
        })
    }

    reindeers.sort(function(a, b) {
        //console.log(a[4]+' ' +b[4]);
        if(a[4]<b[4]) {
            return 1;
        } else if(a[4]>b[4]) {
            return -1
        }
        return 0;
    })
    //console.log(JSON.stringify(reindeers,true,3));

    console.log('Res: ' + reindeers[0][4]);

});
