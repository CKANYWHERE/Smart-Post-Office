var mongoose = require('mongoose');
var fs = require('fs');

module.exports = {
    getMainPage :function(req,res){

    fs.readFile('./view/test.html',function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.writeHead(200,{'Content-Type':"text/html"});
            res.end(data);
        }
    });

   }

};