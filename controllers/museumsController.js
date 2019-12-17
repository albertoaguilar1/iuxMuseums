'use strict'
// Cargamos los modelos para usarlos posteriormente
var Museums = require('../models/museumsModel');





// Handle index actions
exports.index = function (req, res) {
    Museums.get(function (err, museums) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Museums retrieved successfully",
            data: museums
        });
    });
};





// Handle view museums info
exports.view = function (req, res) {
    Museums.findById(req.params.museums_id, function (err, museums) {
        console.log("req.params.museums_id, IS: " + req.params.museums_id);
        if (err)
            res.send(err);
           
            res.json({
            message: 'museums details loading..',
           
            data: museums
        });
    });
};



// Handle update user info
exports.findOneAndUpdate = function (req, res) {
    Museums.findOneAndUpdate(req.params.museums_id,
        { $push: { Pieces : req.body.Pieces} } 
        
        ,function (err, museums) {
   
  
    
                console.log("req.params.museums_id IS: " +   req.params.museums_id); 
                console.log("Pieces IS: " +   req.body.Pieces); 

        if (err)
            res.send(err);
     
   
         
           
// save the user and check for errors
            museums.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'museums Info updated',
                data: museums
            });
        });
    });
};




// Handle create museums actions
exports.new = function (req, res) {
    var museums = new Museums();
    museums.NameMuseum = req.body.NameMuseum ? req.body.NameMuseum : museums.NameMuseum;
    museums.DescriptMuseum = req.body.DescriptMuseum;
    museums.TokenMuseum = req.body.TokenMuseum;
    museums.Pieces = req.body.Pieces;





    console.log("REQ.BODY.lastname IS: " + req.body.NameMuseum);
    console.log("REQ.BODY.lastname IS: " + req.body.Pieces);
  
// save the museums and check for errors
museums.save(function (err) {
         if (err)
             res.json(err);
res.json({
            message: 'New museums created!',
            data: museums
        });
    });
};




// Handle update user info
exports.update = function (req, res) {
    Museums.findById(req.params.museums_id, function (err, museums) {
        console.log("req.params.museums_id IS: " +   req.params.museums_id); 

        if (err)
            res.send(err);
            museums.NameMuseum = req.body.NameMuseum ? req.body.NameMuseum : museums.NameMuseum;
            museums.DescriptMuseum = req.body.DescriptMuseum;
            museums.TokenMuseum = req.body.TokenMuseum;
            museums.Pieces = req.body.Pieces;  
         
           
// save the user and check for errors
            museums.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'museums Info updated',
                data: museums
            });
        });
    });
};






// Handle delete user
exports.delete = function (req, res) {
    Museums.remove({
   
    }, 
    

    function (err, user) {
        console.log("req.params.museums_id IS: " + req.params.museums_id); 
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'museums deleted'
        });
    });
};


