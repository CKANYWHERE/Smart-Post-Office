var mongoose = require('mongoose');
var user = require('../Models/user');
var request = require('request');
<<<<<<< HEAD

=======
var db;
>>>>>>> 6ec13f81b222d5ef2ca33ec37a7d8d8164a3ba48

module.exports = {

    SaveUser : function(req,res){
        var newUser = new user({
            phone :req.body.phone,
            id : req.body.id,
            password : req.body.password,
            name:req.body.name,
            point:0,
            address:req.body.address
        });
        newUser.save(function(err,data){
            if(err){
                console.log(err);
            }
            else{
                var user={};
<<<<<<< HEAD
                user.oid = data._id.toString();
=======
                user.oid = data.id.toString();
>>>>>>> 6ec13f81b222d5ef2ca33ec37a7d8d8164a3ba48
                user.phone = data.phone;
                user.point = data.point;
                user.name = data.name;
                sendToBlockChainUser = JSON.stringify(user);

                var headers = {
                    'Content-Type': 'application/json ; charset=utf-8'
                }

                var options = {
                    "url": 'http://localhost:3000/api/Reciver',
                    "method": 'POST',
                    "headers": headers,
                    "body": sendToBlockChainUser
                }
                
                request(options, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        console.log("putted into block chain");
                    }
                });

               res.send(data);
            }
        });
    },

    PostLogin : function(req,res){
     
            user.findOne({id:req.body.id,password:req.body.password},function(err,data){
                
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    res.json({success:true,
                        name:data.name,
                        id:data.id,
                        point:data.point,
                        address:data.address,
                        phone:data.phone,
                        _id:data._id},
                    );
                }
            });
        
      
    }

}