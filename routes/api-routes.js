  
'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Llamamos al router
var router = express.Router();
//cargamos la utilidad para verificar token
var authenticated = require('../middlewares/authenticated');
//Import museumsController
var museumsController = require('../controllers/museumsController');

//Import piecesController
var piecesController = require('../controllers/piecesController');
  

    // Contact routes
    router.route('/pieces')
    .get(authenticated,piecesController.index)
    .post(authenticated,piecesController.new);
    
    router.route('/pieces/:pieces_id')
    .get(authenticated,piecesController.view)
    .patch(authenticated,piecesController.update)
    .put(authenticated,piecesController.update)
    .delete(authenticated,piecesController.delete);

    router.route('/pieces/name/:NamePieces')
    .get(authenticated,piecesController.viewName);

    // Contact routes
router.route('/museums')
.get(authenticated,museumsController.index)
.post(authenticated,museumsController.new);

router.route('/museums/:museums_id')
.get(authenticated,museumsController.view)
.patch(authenticated,museumsController.update)
.put(authenticated,museumsController.update)
.delete(authenticated,museumsController.delete);

router.route('/museums/name/:NameMuseum')
.get(authenticated,museumsController.viewName);


router.route('/museums/piece/:museums_id')
.put(authenticated,museumsController.findOneAndUpdate);







router.get('/',function(req,res){
    res.json({
        status:'API Museum WORKING',
        message:'Bienvenido a la raiz del servicio'
    });
});




//export api routers
module.exports=router ;