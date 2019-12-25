'use strict'
// Cargamos los modelos para usarlos posteriormente
var Pieces = require('../models/piecesModel');




// Handle index actions
exports.index = function (req, res) {
    Pieces.get(function (err, pieces) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Pieces retrieved successfully",
            data: pieces
        });
    });
};


//Handle view pieces info
exports.viewName= (req, res) => {
    console.log("viewName"); 
  // Validate request
  if(!req.params.NamePieces) {
    return res.status(400).send({
        message: "Piece  NamePieces can not be empty"
    });
}

    Pieces.findOne({NamePieces:req.params.NamePieces})
    .then(pieces => {
        if(!pieces) {
            return res.status(404).send({
                message: "Pieces not found with NamePieces " + req.params.NamePieces,
                status:'400',
                data: err
            });            
        }
        return res.status(200).send({
            status: "success",
            message: "Pieces found",
            data: pieces
        });
   
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pieces not found with id " + req.params.NamePieces,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Pieces with id " + req.params.NamePieces,
            status:'500',
            data: err
        });
    });
};


// Handle view pieces info
exports.view= (req, res) => {
    console.log("view"); 
  // Validate request
  if(!req.params.pieces_id) {
    return res.status(400).send({
        message: "Piece  pieces_id can not be empty"
    });
}

    Pieces.findById(req.params.pieces_id)
    .then(pieces => {
        if(!pieces) {
            return res.status(404).send({
                message: "Pieces not found with id " + req.params.pieces_id,
                status:'400',
                data: err
            });            
        }
        return res.status(200).send({
            status: "success",
            message: "Pieces found",
            data: pieces
        });
   
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pieces not found with id " + req.params.pieces_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Pieces with id " + req.params.pieces_id,
            status:'500',
            data: err
        });
    });
};








// Create and Save a new pieces 
exports.new= (req, res) => {
 
  // Validate request
  if(!req) {
    console.log("asssa");
    return res.status(400).send({
        message: "pieces body can not be empty"
    });
}

  //Validate request
 /* if(!req.body.NameUser) {
    return res.status(400).send({
        message: "User NameUser can not be empty"
    });
    }*/

    var pieces = new Pieces();
    pieces.NamePieces = req.body.NamePieces ? req.body.NamePieces : pieces.NamePieces;
    pieces.DescripPieces = req.body.DescripPieces;
    pieces.ImgPieces = req.body.ImgPieces;
    pieces.TokenPiece = req.body.TokenPiece

    // Save Museum in the database
    pieces.save()
    .then(pieces => {
        return res.status(200).send({
            message: 'New pieces created!',
            status:"success",
            data: pieces
        });
    }).catch(err => {

        console.log("asssa");
        res.status(500).send({
            message: err.message || "Some error occurred while creating the pieces.",
            status:'500',
            data: err
           
        });
    });
};


// Update a piece identified by the PieceId in the request
exports.update = (req, res) => {

    console.log("req.params.pieces_id IS: " +   req.params.pieces_id);  
    // Validate Request
    if(! req.params.pieces_id) {
        return res.status(400).send({
            message: "Piece id can not be empty"
        });
    }


      // Validate Request
      if(!req.body) {
        console.log("update  " +  req.body); 
        return res.status(400).send({
            message: "Piece body can not be empty"
        });
    }

    // Find Pieces and update it with the request body
    Pieces.findByIdAndUpdate( req.params.pieces_id, {
        NamePieces : req.body.NamePieces ? req.body.NamePieces : museums.NamePieces,
        DescripPieces : req.body.DescripPieces,
        ImgPieces : req.body.ImgPieces,
        TokenPiece : req.body.TokenPiece


    }, {new: true})
    .then(pieces => {
        if(!pieces) {
            return res.status(404).send({
                message: "Pieces not found with id " +  req.params.pieces_id,
                    status:'404',
                    data: err
            });
        }
        return res.status(200).send({
            message: 'pieces Info updated',
            status:"success",
            data: pieces
        });
      
           
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pieces not found with id " +  req.params.pieces_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error updating piece with id " +  req.params.pieces_id,
            status:'500',
            data: err
        });
    });
};




// Delete a Oieces with the specified PiecesId in the request
exports.delete = (req, res) => {
    console.log("delete  " +  req.params.pieces_id ); 
    if(!req.params.pieces_id) {
        return res.status(400).send({
            message: "piece_id  can not be empty"
        });
    }

    Pieces.findByIdAndRemove(req.params.pieces_id)
    .then(pieces => {
        if(!pieces) {
            return res.status(404).send({
                message: "Piece not found with id " + req.params.pieces_id,
                status:'404',
                data: err
            });
        }
        res.send({  
            message: "Piece deleted successfully!",
            status:"success",
            data: pieces
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Pieces not found with id " + req.params.pieces_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Could not delete Piece with id " + req.params.pieces_id,
            status:'500',
            data: err
        });
    });
};




