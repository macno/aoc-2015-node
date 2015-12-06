var fs = require ('fs');

fs.readFile('input','utf8',function(err,data) {
    var strings = data.split("\n");
    var grid = [];
    for(var i=0;i<1000;i++) {
        grid[i] = [];
        for(var j=0;j<1000;j++) {
            grid[i][j] = false;
        }
    }
    var lights = 0;
    var moveGrid = function(x1, y1, x2, y2, action) {
        for(var i=x1;i<=x2;i++) {
            for(var j=y1;j<=y2;j++) {
                var old = grid[i][j];
                if(action == 't') {
                    if(old) {
                        grid[i][j] = false;
                        lights--;
                    } else {
                        grid[i][j] = true;
                        lights++;
                    }
                } else if(action == 'on' ) {
                    grid[i][j] = true;
                    if(!old) {
                        lights++;
                    }
                } else {
                    grid[i][j] = false;
                    if(old) {
                        lights--;
                    }
                }
            }
        }
    };
    strings.forEach(function(str) {
        if(str == '') return;
        var action = '';
        var d = str.split(' ');
        var pos1, pos2;
        if(str.indexOf('toggle') === 0) {
            action = 't';
            pos1 = d[1].split(',');
            pos2 = d[3].split(',');
        } else if(str.indexOf('turn on') === 0) {
            action = 'on';
            pos1 = d[2].split(',');
            pos2 = d[4].split(',');
        } else if(str.indexOf('turn off') === 0) {
            action = 'off';
            pos1 = d[2].split(',');
            pos2 = d[4].split(',');
        }
        if(action == '') return;
        moveGrid(Number(pos1[0]),Number(pos1[1]),Number(pos2[0]),Number(pos2[1]),action);
    });
    var res = 0;
    for(var i=0;i<=999;i++) {
        for(var j=0;j<=999;j++) {
            if(grid[i][j]) res++;
        }
    }
    console.log('Res: ' + res + ' lights: ' + lights);
});
