var mongoose = require('mongoose');
var payment = require('../Models/payment');
var normalPayment = require('../Models/payment');
var group = require('../Models/group');
var async = require('async');
var QRCode = require('qrcode')

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
        
        if(req.body.option == "on"){
            group.findOne({address:req.body.address}).exec(function(err,findedgroup){
                if(err){
                    console.log(err); 
                }
                console.log('finded group:'+findedgroup);
                
                if(findedgroup == null){
                    var newGroup = new group({
                        address : req.body.address,
                        detail : req.body.detailadress,
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
                    findedgroup.update({$push:{ref:newPayment._id}},function(data){
                        console.log(data);  
                    });
                    findedgroup.update({$push:{detail:req.body.detailadress}},function(data){
                        console.log(data);  
                    });
                }
            });
        }
        res.send('success');
   },

   GetAdminPage : function(req,res){
       group.find({}).sort({}).exec(function(err,findedgroup){
            if(err){
                console.log(err);
            }
            else{
                payment.find({}).sort({}).exec(function(err,findedpay){
                    if(err){
                        console.log(err);
                    }else{
                        normalPayment.find({isGroup:"off"}).exec(function(err,newNormalPayment){
                            console.log(newNormalPayment);
                            res.render('admin',{pay:findedpay,group:findedgroup,normal:newNormalPayment});
                        });
                    }   
                });
            }
       });
   },

   GetData : function(req,res){
        payment.find({isGroup:"on"}).exec(function(err,ondata){
            payment.find({isGroup:"off"}).exec(function(err,offdata){
                console.log({tied:ondata.length,normal:offdata.length});
                  res.json({tied:ondata.length,normal:offdata.length});
            });
        });
        
   },
   
   GetWayBillPage : function(req,res){
    QRCode.toDataURL('this is blockchain\'s primary? key', function (err, url) {
        res.render('wayBill',{qrcode : url});
      });
   }
};