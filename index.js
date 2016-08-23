var _ = require("lodash"),
    Promise = require("bluebird"),
    fs = require("fs"),
    download = require('download');

var readFile = Promise.promisify(fs.readFile);

var i =0;
readFile("./links/links.txt",'utf-8').then(function(res){
    var links = res.split("\n");
    Promise.map(links,function(link){
        var fileName = _.first(_.last(link.split("/")).split("?"));
        console.log("Downloading:" + fileName);
        return download(link).then(function(data){
            i++;
            fs.writeFileSync("./files/"+fileName, data);
            console.log(fileName+" Downloaded; " + (links.length - i) + "to go")
        })
    },{concurrency:3});
}).error(function(err){
    console.log("Errors");
    console.log(err)
});
