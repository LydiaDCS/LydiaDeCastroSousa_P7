//j'importe express
const express = require('express');

//création du router
const router = express.Router();

//j'importe middleware d'authentification
const auth = require('../middleware/auth');
//j'importe middleware gestion enregistrement de fichiers
const multer = require('../middleware/multer-config');

//j'importe les controllers
const saucesCtrl = require('../controllers/sauce');


//Enregistrement des routes dans le router et fonctions du controllers pour proteger les routes
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);

//liker une sauce
router.post('/:id/like', auth, saucesCtrl.likeSauce);

//export du router
module.exports = router;