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






exports.view= (req, res) => {
    console.log("view"); 
  // Validate request
  if(! req.params.museums_id) {
    return res.status(400).send({
        message: "museum  museums_id can not be empty"
    });
}

    Museums.findById (req.params.museums_id)
    .then(museum => {
        if(!museum) {
            return res.status(404).send({
                message: "Museum not found with id " +  req.params.museums_id,
                status:'400',
                data: err
            });            
        }
        return res.status(200).send({
            status: "success",
            message: "Museum found",
            data: museum
        });
   
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Museum  not found with id " + req.params.museums_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Museum with id " + req.params.museums_id,
            status:'500',
            data: err
        });
    });
};



// Create and Save a new museum 
exports.new= (req, res) => {
    console.log("new  " ); 
  // Validate request
  if(!req.body) {
    return res.status(400).send({
        message: "Museum body can not be empty"
    });
}

  //Validate request
 /* if(!req.body.NameUser) {
    return res.status(400).send({
        message: "User NameUser can not be empty"
    });
    }*/

    var museums = new Museums();
    museums.NameMuseum = req.body.NameMuseum ? req.body.NameMuseum : museums.NameMuseum;
    museums.DescriptMuseum = req.body.DescriptMuseum;
    museums.TokenMuseum = req.body.TokenMuseum;
    museums.Pieces = req.body.Pieces;



    // Save Museum in the database
    museums.save()
    .then(museums => {
        return res.status(200).send({
            message: 'New Musueum created!',
            status:"success",
            data: museums
        });
    }).catch(err => {

       
        res.status(500).send({
            message: err.message || "Some error occurred while creating the museum.",
            status:'500',
            data: err
           
        });
    });
};








// Handle update museum info
exports.findOneAndUpdate = function (req, res) {
    Museums.findOneAndUpdate(req.params.museums_id,
        { $push: { Pieces : req.body.Pieces} } 
        
        ,function (err, museums) { 
    
                console.log("req.params.museums_id IS: " +   req.params.museums_id); 
                console.log("Pieces IS: " +   req.body.Pieces); 

        if (err)
            res.send(err);
     
              
// save the museum  and check for errors
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



// Update a museum identified by the MuseumId in the request
exports.update = (req, res) => {

    console.log("update  " +   req.params.museums_id); 
    // Validate Request
    if(!req.params.museums_id) {
        return res.status(400).send({
            message: "Museum id can not be empty"
        });
    }


      // Validate Request
      if(!req.body) {
        console.log("update  " +  req.body); 
        return res.status(400).send({
            message: "Museum body can not be empty"
        });
    }

    // Find Museum and update it with the request body
    Museums.findByIdAndUpdate(req.params.museums_id, {
        NameMuseum : req.body.NameMuseum ? req.body.NameMuseum : museums.NameMuseum,
        DescriptMuseum : req.body.DescriptMuseum,
        TokenMuseum : req.body.TokenMuseum,
        Pieces : req.body.Pieces,  
    }, {new: true})
    .then(museums => {
        if(!museums) {
            return res.status(404).send({
                message: "Museum not found with id " + req.params.museums_id,
                    status:'404',
                    data: err
            });
        }
        return res.status(200).send({
            message: 'Museum Info updated',
            status:"success",
            data: museums
        });
      
           
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Museum not found with id " + req.params.museums_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error updating museum with id " + req.params.museums_id,
            status:'500',
            data: err
        });
    });
};




// Delete a Museum with the specified MuseumId in the request
exports.delete = (req, res) => {
    console.log("delete  " +  req.params.museums_id); 
    if(!req.params.museums_id) {
        return res.status(400).send({
            message: "Museum content can not be empty"
        });
    }

    Museums.findByIdAndRemove(req.params.museums_id)
    .then(museums => {
        if(!museums) {
            return res.status(404).send({
                message: "Museum  not found with id " + req.params.museums_id,
                status:'404',
                data: err
            });
        }
        res.send({  
            message: "Musueum deleted successfully!",
            status:"success",
            data: museums
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Museum not found with id " + req.params.museums_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Could not delete Museum with id " + req.params.museums_id,
            status:'500',
            data: err
        });
    });
};






