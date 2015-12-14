var fs = require ('fs');


fs.readFile('input','utf8',function(err,file) {
    var ret = 0;

    var knights = {};
    knights['Michael'] = [];
    file.split("\n").forEach(function(str) {
        if(str == "")return;
        var parts = str.split(" ");
        if(!knights[parts[0]]) {
            knights[parts[0]] = [];
            var meneighbor = {};
            meneighbor['Michael'] = 0;
            knights[parts[0]].push(meneighbor);
            var oneighbor = {};
            oneighbor[parts[0]] = 0;
            knights['Michael'].push(oneighbor);
        }
        var neighbor = {};
        neighbor[parts[10]] = Number(parts[3]) * ((parts[2] == 'gain') ? 1 : -1);
        knights[parts[0]].push(neighbor);
    })


    var res = 0;

    // Taken from https://gist.github.com/md2perpe/8210411
    function permutation(list, callback) {
    	// Empty list has one permutation
    	if (list.length == 0)
    		return [[]];
    	var result = [];

    	for (var i=0; i<list.length; i++){
    		// Clone list (kind of)
    		var copy = Object.create(list);

    		// Cut one element from list
    		var head = copy.splice(i, 1);

    		// Permute rest of list
    		var rest = permutation(copy);

    		// Add head to each permutation of rest of list
    		for (var j=0; j<rest.length; j++){
    			var next = head.concat(rest[j]);
                if(callback) {
                    callback(next);
                } else {
                    result.push(next);
                }

    		}
    	}
        if(!callback)
    	   return result;
    }


    var calculate = function(table) {
        var total = 0;
        var getFriend = function(who, friends) {
            for(var i=0,l=friends.length;i<l;i++) {
                if(friends[i][who]) {
                    return friends[i][who];
                }
            }
            return 0;
        }
        table.forEach(function(who, idx) {
            var left = (idx == 0) ? table[table.length-1] : table[idx-1];
            var right = (idx == table.length-1) ? table[0] : table[idx+1];
            total += getFriend(left,knights[who]) + getFriend(right,knights[who]);
        })
        return total;
    }

    permutation(Object.keys(knights), function(table) {
        var t = calculate(table);
        if(t > res) res = t;
    });

    console.log('Res: ' + res);


    // console.log(JSON.stringify(knights,true,2));
    //console.log('Res: ' + permutation("", "abcdefgh").length);
});
