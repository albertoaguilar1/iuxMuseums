//inicializa express router
let router = require('express').Router();

//set deafuilt API RESPONSE 

//Import museumsController
var museumsController = require('./museumsController');
var piecesController = require('./piecesController');
  

    // Contact routes
    router.route('/pieces')
    .get(piecesController.index)
    .post(piecesController.new);
    
    router.route('/pieces/:pieces_id')
    .get(piecesController.view)
    .patch(piecesController.update)
    .put(piecesController.update)
    .delete(piecesController.delete);



    // Contact routes
router.route('/museums')
.get(museumsController.index)
.post(museumsController.new);

router.route('/museums/:museums_id')
.get(museumsController.view)
.patch(museumsController.update)
.put(museumsController.update)
.delete(museumsController.delete);



router.get('/',function(req,res){
    res.json({
        status:'API ITS working',
        message:'Welcome to restHub crafted with lovesssss!'
    });
});

    router.get('/login',function(req,res){
        res.json({

            status:'API ITS working',
            message:'Welcome to restHub crafted with lovex!'
        });

});



//export api routers
module.exports=router ;