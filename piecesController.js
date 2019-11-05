// MuseumsController.js
// Import user model
var Pieces = require('./model/piecesModel');




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





// Handle view pieces info
exports.view = function (req, res) {
    Pieces.findById(req.params.pieces_id, function (err, pieces) {
        console.log("req.params.pieces_id, IS: " + req.params.pieces_id);
        if (err)
            res.send(err);
           
            res.json({
            message: 'pieces details loading..',
           
            data: pieces
        });
    });
};


// Handle create user actions
exports.new = function (req, res) {
    var pieces = new Pieces();
    pieces.NamePieces = req.body.NamePieces ? req.body.NamePieces : museums.NamePieces;
    pieces.DescripPieces = req.body.DescripPieces;
    pieces.ImgPieces = req.body.ImgPieces;
    pieces.TokenPiece = req.body.TokenPiece;







    console.log("REQ.BODY.lastname IS: " + req.body.NamePieces);
    console.log("REQ.BODY.lastname IS: " + req.body.DescripPieces);
  
// save the user and check for errors
pieces.save(function (err) {
         if (err)
             res.json(err);
res.json({
            message: 'New pieces created!',
            data: pieces
        });
    });
};




// Handle update user info
exports.update = function (req, res) {
    Pieces.findById(req.params.pieces_id, function (err, pieces) {
        console.log("req.params.pieces_id IS: " +   req.params.pieces_id); 

        if (err)
            res.send(err);
            pieces.NamePieces = req.body.NamePieces ? req.body.NamePieces : museums.NamePieces;
            pieces.DescripPieces = req.body.DescripPieces;
            pieces.ImgPieces = req.body.ImgPieces;
            pieces.TokenPiece = req.body.TokenPiece;
         
           
// save the user and check for errors
pieces.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'pieces Info updated',
                data: pieces
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    Pieces.remove({
   
    }, 
    

    function (err, user) {
        console.log("req.params.pieces_id IS: " + req.params.museums_id); 
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'pieces deleted'
        });
    });
};


