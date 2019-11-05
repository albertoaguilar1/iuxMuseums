// MuseumModel.js
var mongoose = require('mongoose');
// Setup schema
var MuseumsSchema = mongoose.Schema({
  //  museum_id: mongoose.Schema.Types.ObjectId,
  NameMuseum: {
    type: String,
    required: true
},
DescriptMuseum: {
    type: String,
    required: true
},
TokenMuseum: {
    type: String,
    required: true
},

Pieces:
   
        [
            { type : mongoose.Schema.Types.ObjectId, ref : 'Pieces' }
        ]  

});






// Export Museum model
var Museums = module.exports = mongoose.model('Museums', MuseumsSchema);
module.exports.get = function (callback, limit) {
    Museums.find(callback).limit(limit);
}


