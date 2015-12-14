var fs = require ('fs');


// Set up arrays
var happiness = {};
var names = [];


fs.readFile('input','utf8',function(err,str) {


    str.split('\n').forEach(function(line) {
        var match = /^([a-z]+) would (lose|gain) ([0-9]+) happiness units by sitting next to ([a-z]+)\.$/i.exec(line);
        if (names.indexOf(match[1]) === -1)
            names.push(match[1]);
        if (!(match[1] in happiness))
            happiness[match[1]] = {};
        happiness[match[1]][match[4]] = (match[2] === 'lose' ? -1 : 1) * match[3];
    });



    console.log('Part One: ', calculateBestHappiness());
    names.push('me');
    console.log('Part Two: ', calculateBestHappiness());
});
// From http://stackoverflow.com/a/20871714
function permutator(n){function t(n,r){for(var e,r=r||[],o=0;o<n.length;o++)e=n.splice(o,1),0===n.length&&c.push(r.concat(e)),t(n.slice(),r.concat(e)),n.splice(o,0,e[0]);return c}var c=[];return t(n)}

function calculateHappiness(order) {
    var totalHappinessChange = 0;

    for (var i = 0; i < order.length; i++) {
        var person = order[i];
        var before = order[(i - 1 + order.length) % order.length];
        var after = order[(i + 1) % order.length];

        if (person !== 'me' && before !== 'me')
            totalHappinessChange += happiness[person][before];
        if (person !== 'me' && after !== 'me')
            totalHappinessChange += happiness[person][after];
    }

    return totalHappinessChange;
}

function calculateBestHappiness(withMe) {
    var bestHappinessChange = -Infinity;

    permutator(names).forEach(function(order, i) {
        bestHappinessChange = Math.max(bestHappinessChange, calculateHappiness(order));
    });
    return bestHappinessChange;
}
