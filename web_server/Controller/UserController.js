var mongoose = require('mongoose');
var user = require('../Models/user');
var db;

module.exports = {

    SaveUser : function(req,res){
        var newUser = new user({
            phone : "010-1111-1111",
            id : "test",
            password : "test",
            name:"김철수",
            point:0,
            address:"서울 특별시 종로구"
        });
        newUser.save(function(err,data){
            if(err){
                console.log(err);
            }
            else{
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