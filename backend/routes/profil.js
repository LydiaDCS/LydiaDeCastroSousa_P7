const express = require('express');
const router = express.Router();
//j'importe middleware d'authentification
const auth = require('../middleware/auth');

//j'importe middleware gestion enregistrement de fichiers (pour fichier images)
const multer = require('../middleware/multer-config');

const profilCtrl = require('../controllers/profil');

router.get('/', auth, profilCtrl.getAllStuff);
router.post('/', auth, multer, profilCtrl.createThing);
router.get('/:id',auth, profilCtrl.getOneThing);
router.put('/:id', auth, multer, profilCtrl.modifyThing);
router.delete('/:id',auth, profilCtrl.deleteThing);

module.exports = router;