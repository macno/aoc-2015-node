var fs = require ('fs');
var testmode = false;
var input = (testmode) ? 'input_test_1' : 'input';

fs.readFile(input,'utf8',function(err,data) {
    var strings = data.split("\n");
    var vars = {};
    var deps = {};
    var onVar = function(v) {
        if(deps[v]) {
            deps[v].forEach(function(f){
                setVar(f[0],f[1],f[2],f[3],true);
            });
        }
    }

    var setVar = function(v, v1, op, v2, x) {
        if(v == 'b') v1 = 3176;
        var canAssign = false;
        var n1, n2;
        if(v1 == '') {
            canAssign = true;
        } else {
            n1 = Number(v1);
            if(isNaN(n1)) {
                // ho bisogno della var
                if(typeof(vars[v1]) != 'undefined') {
                    v1 = vars[v1];
                    canAssign = true;
                } else {
                    if(!x) {
                        if(!deps[v1]) {
                            deps[v1] = [];
                        }
                        deps[v1].push([v ,v1 , op , v2]);
                    }
                }
            } else {
                canAssign = true;
            }
        }

        if(v2 != '') {
            n2 = Number(v2);
            if(isNaN(n2)) {
                if(typeof(vars[v2]) != 'undefined') {
                    v2 = vars[v2];
                } else {
                    if(!x) {
                        if(!deps[v2]) {
                            deps[v2] = [];
                        }
                        deps[v2].push([v ,v1 , op , v2]);
                    }
                    canAssign = false;
                }
            }
        }

        if(canAssign) {
            var val = eval(v1+op+v2);
            vars[v] = val;
            onVar(v);
        }
    }

    var getOp = function(str) {
        switch(str) {
            case 'AND':
                return '&'
            case 'LSHIFT':
                return '<<';
            case 'RSHIFT':
                return '>>';
            case 'OR':
                return '|';
        }
        console.log('Unkown op:' + str);
        process.exit(1);
    }

    strings.forEach(function(str) {
        if(str == '') return;

        var d = str.split(' -> ');
        var to = d[1].trim();
        var parts = d[0].split(' ');
        switch(parts.length) {
            case 1:
            var s = parts[0].trim();
            setVar(to,s,'','');
            break;

            case 2:
            // not
            if(parts[0] == 'NOT') {
                setVar(to,'65535','-',parts[1].trim());
            } else {
                console.log('2 parts NOT NOT: ' + str);
                process.exit(1);
            }
            break;

            case 3:
                setVar(to,parts[0].trim(),getOp(parts[1].trim()),parts[2].trim() );
            break;
        }
    });
    console.log('Res: ' + vars['a']);
});
