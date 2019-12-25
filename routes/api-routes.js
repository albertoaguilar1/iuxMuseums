  
'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Llamamos al router
var router = express.Router();
//Import museumsController
var museumsController = require('../controllers/museumsController');

//Import piecesController
var piecesController = require('../controllers/piecesController');
  

    // Contact routes
    router.route('/pieces')
    .get(piecesController.index)
    .post(piecesController.new);
    
    router.route('/pieces/:pieces_id')
    .get(piecesController.view)
    .patch(piecesController.update)
    .put(piecesController.update)
    .delete(piecesController.delete);

    router.route('/pieces/name/:NamePieces')
    .get(piecesController.viewName);

    // Contact routes
router.route('/museums')
.get(museumsController.index)
.post(museumsController.new);

router.route('/museums/:museums_id')
.get(museumsController.view)
.patch(museumsController.update)
.put(museumsController.update)
.delete(museumsController.delete);

router.route('/museums/name/:NameMuseum')
.get(museumsController.viewName);


router.route('/museums/piece/:museums_id')
.put(museumsController.findOneAndUpdate);







router.get('/',function(req,res){
    res.json({
        status:'API Museum WORKING',
        message:'Bienvenido a la raiz del servicio'
    });
});




//export api routers
module.exports=router ;