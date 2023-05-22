//j'importe express
const express = require('express');

//je crée le router avec express
const router = express.Router();
//j'importe middleware d'authentification
const auth = require('../middleware/auth');
//j'importe middleware gestion enregistrement de fichiers (pour fichier images)
const upload =require('../middleware/multer-config');

//j'associe les fonctions aux différentes routes
const commentCtrl = require('../controllers/comment');
const multer = require('multer');

//Comment CRUD
router.get ("/", auth, commentCtrl.getallcomments);
router.post ("/", auth, commentCtrl.postComment);
router.put ("/:id", auth, commentCtrl.updateComment);
router.delete ("/:id", auth, commentCtrl.deleteComment);

router.post('/', auth, multer, commentCtrl.postComment); 


//j'exporte le router
module.exports = router;