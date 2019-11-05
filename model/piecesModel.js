// MuseumModel.js
var mongoose = require('mongoose');
// Setup schema
var PiecesSchema = mongoose.Schema({
  //  museum_id: mongoose.Schema.Types.ObjectId,

  NamePieces: {
        type: String,
        required: true
    },
    DescripPieces: {
        type: String,
        required: true
    },
    ImgPieces: {
        type: String,
        required: true
    },
     TokenPiece :{
        type:String,
        required:true
     }   

});
// Export Museum model
var Pieces = module.exports = mongoose.model('Pieces', PiecesSchema);
module.exports.get = function (callback, limit) {
    Pieces.find(callback).limit(limit);
}


