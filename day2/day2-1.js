var fs = require ('fs');

fs.readFile('input','utf8',function(err,data) {
    var sq = 0;
    var boxes = data.split("\n");
    boxes.forEach(function(box) {
        if(box == '') return;
        var s = box.split('x');
        var l = Number(s[0]), w = Number(s[1]), h = Number(s[2]);

        var s1 = l*w ;
        var s2 = w*h ;
        var s3 = h*l ;
        sq += (s1 + s2 + s3)*2 + Math.min(s1, s2, s3)
    });
    console.log(sq);
});
