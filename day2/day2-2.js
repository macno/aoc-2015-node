var fs = require ('fs');

fs.readFile('day2.txt','utf8',function(err,data) {
    var ribbon = 0;
    var boxes = data.split("\n");
    boxes.forEach(function(box) {
        if(box == '') return;
        var s = box.split('x');
        s.sort(function(a, b) {
            var an = Number(a);
            var bn = Number(b);
            if(an < bn) return -1
            if(an > bn) return 1
            return 0;
        });

        var l = Number(s[0]), w = Number(s[1]), h = Number(s[2]);
        ribbon += (l+w)*2; // perimeter
        ribbon += l*w*h; // cubic feet of volume
    });
    console.log(ribbon);
});
