var mongoose = require('mongoose');
var payment = require('../Models/payment');
var group = require('../Models/group');
var async = require('async')

module.exports = {

    PostPayment :function(req,res){
        
        var newPayment = new payment({
            _id: new mongoose.Types.ObjectId(),
            address : req.body.address,
            reciver : req.body.reciver,
            sender : req.body.sender,
            phone : req.body.phone,
            isGroup : req.body.option,
            payment : req.body.payment,
            cardname : req.body.cardname,
            cardnumber : req.body.cardnumber,
            expiration : req.body.expiration,
            cardpassword : req.body.cardpassword
        });

        newPayment.save(function(err,data){
            if(err){
                console.log(err);
            }
            else{
                console.log('saved');
            }
        });
        
        if(req.body.isGroup == "on"){
            async.each(group.name,function(data,callback){
                console.log("asdf");
                
                if(data == req.body.address){
                    group.update({$push:{ref:newPayment._id}})
                }else{
                    var newGroup = new group({
                        name : req.body.address,
                        ref : newPayment._id
                    });

                    newGroup.save(function(err,data){
                        if(err){
                            console.log(err);
                        }else{
                            res.send('success');
                        }
                    });
                }
                callback(null);
            });
        }

        res.send('no group success');
   },

   GetAdminPage : function(req,res){

   }

};