var mongoose = require('mongoose');
var payment = require('../Models/payment');
var normalPayment = require('../Models/payment');
var group = require('../Models/group');
var async = require('async');
var QRCode = require('qrcode');
var request = require('request');

module.exports = {

    PostPayment: function (req, res) {

        var newPayment = new payment({
            _id: new mongoose.Types.ObjectId(),
            address: req.body.address,
            detailadress: req.body.detailadress,
            reciver: req.body.reciver,
            sender: req.body.sender,
            phone: req.body.phone,
            isGroup: req.body.option,
            payment: req.body.payment,
            cardname: req.body.cardname,
            cardnumber: req.body.cardnumber,
            expiration: req.body.expiration,
            cardpassword: req.body.cardpassword
        });

        newPayment.save(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('saved');
            }
        });

        if (req.body.option == "on") {
            group.findOne({ address: req.body.address }).exec(function (err, findedgroup) {
                if (err) {
                    console.log(err);
                }
                console.log('finded group:' + findedgroup);

                if (findedgroup == null) {
                    var newGroup = new group({
                        address: req.body.address,
                        detail: req.body.detailadress,
                        ref: newPayment._id
                    });
                    newGroup.save(function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                    });
                }
                else {
                    findedgroup.update({ $push: { ref: newPayment._id } }, function (data) {
                        console.log(data);
                    });
                    findedgroup.update({ $push: { detail: req.body.detailadress } }, function (data) {
                        console.log(data);
                    });
                }
            });
        }
        res.send('success');
    },

    GetAdminPage: function (req, res) {
        group.find({}).sort({}).exec(function (err, findedgroup) {
            if (err) {
                console.log(err);
            }
            else {
                payment.find({}).sort({}).exec(function (err, findedpay) {
                    if (err) {
                        console.log(err);
                    } else {
                        normalPayment.find({ isGroup: "off" }).exec(function (err, newNormalPayment) {
                            console.log(newNormalPayment);
                            res.render('admin', { pay: findedpay, group: findedgroup, normal: newNormalPayment });
                        });
                    }
                });
            }
        });
    },

    GetData: function (req, res) {
        payment.find({ isGroup: "on" }).exec(function (err, ondata) {
            payment.find({ isGroup: "off" }).exec(function (err, offdata) {
                console.log({ tied: ondata.length, normal: offdata.length });
                res.json({ tied: ondata.length, normal: offdata.length });
            });
        });

    },

    GetWayBillPage: function (req, response) {
        var headers = {
            'Content-Type': 'application/json ; charset=utf-8'
        }


        var paymentResult = [];
        var groupResult = {};
        group.findById({ _id: req.params.id }, function (err, data) {

            if (err) {
                console.log(err);
            } else {
                async.each(data.ref, function (callbackData, callback) {
                    payment.findById({ _id: callbackData }, function (err, callbackPayment) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        }
                        else {
                            var data = {};
                            data.oid = callbackPayment._id.toString(),
                                data.name = callbackPayment.reciver,
                                data.phone = callbackPayment.phone,
                                data.address = callbackPayment.address,
                                data.detailaddress = callbackPayment.detailadress,
                                data.isGroup = true,
                                data.sender = "s001"
                            paymentResult.push(data);
                            callback();
                        }
                    });
                }, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        groupResult.oid = data.id;
                        groupResult.delivery = data.ref;
                        // 요청 세부 내용
                        var payment = JSON.stringify(paymentResult);
                        var group = JSON.stringify(groupResult);

                        var options = {
                            "url": 'http://localhost:3000/api/Delivery',
                            "method": 'POST',
                            "headers": headers,
                            "body": payment
                        }

                        request(options, function (error, res, body) {
                            if (!error && res.statusCode == 200) {

                                var options = {
                                    url: 'http://localhost:3000/api/Group',
                                    method: 'POST',
                                    headers: headers,
                                    body: group
                                }
                                request(options, function (error, res, body) {
                                    if (!error && res.statusCode == 200) {
                                        QRCode.toDataURL(groupResult.oid, function (err, url) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                groupResult.qrcode = url;
                                                var sendToWebPay = [];
                                                async.each(paymentResult,function(item,callback) {
                                                    QRCode.toDataURL(item.oid, function (err, url) {
                                                        if (err) {
                                                            console.log(err);
                                                            callback(err);
                                                        }
                                                        else {
                                                            item.qrcode = url;
                                                            sendToWebPay.push(item);
                                                            callback();
                                                        }
                                                    });
                                                },function(err){
                                                    if(err){
                                                        console.log(err);
                                                    }else{
                                                        console.log(groupResult);
                                                        console.log(paymentResult);
                                                        response.render('wayBill', { "group": groupResult, "payment": sendToWebPay });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};