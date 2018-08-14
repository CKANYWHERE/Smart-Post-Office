var mongoose = require('mongoose');
var payment = require('../Models/payment');
var fs = require('fs');

module.exports = {

    PostPayment :function(req,res){
        console.log(req.body);
        var newPayment = new payment({
            address : req.body.address,
            reciver : req.body.reciver,
            sender : req.body.sender,
            phone : req.body.phone,
            isGroup : req.body.option,
            payment : req.body.payment,
            cardname : req.body.cardname,
            cardnumber : req.body.cardnumber,
            expiration : req.body.expiration,
            cardpassword:req.body.cardpassword
        });
        newPayment.save(function(err,data){
            if(err){
                console.log(err);
            }
            else{
                res.send('success');
            }
        });
   },

};