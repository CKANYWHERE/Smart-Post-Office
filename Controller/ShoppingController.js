var mongoose = require('mongoose');
var payment = require('../Models/payment');
var group = require('../Models/group');
var async = require('async');

module.exports = {

    PostPayment :function(req,res){
        
        var newPayment = new payment({
            _id: new mongoose.Types.ObjectId(),
            address : req.body.address,
            detailadress : req.body.detailadress,
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
        console.log(req.body);
        
        if(req.body.option == "on"){
            group.findOne({name:req.body.address}).exec(function(err,findedgroup){
                if(err){
                    console.log(err); 
                }
                if(findedgroup == null){
                    var newGroup = new group({
                        name : req.body.address,
                        ref : newPayment._id
                    });
                    newGroup.save(function(err,data){
                        if(err){
                            console.log(err);
                        }else{ 
                            console.log(data);
                        }
                    });
                }
                else{
                    group.update({$push:{ref:newPayment._id}},function(data){
                        console.log(data);  
                    });
                }
            });
        }
        res.send('success');
   },

   GetAdminPage : function(req,res){
        res.render('admin',{res:"asdf"});
   }
};