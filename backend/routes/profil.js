const express = require('express');
const router = express.Router();
//j'importe middleware d'authentification
const auth = require('../middleware/auth');

//j'importe middleware gestion enregistrement de fichiers (pour fichier images)
const multer = require('../middleware/multer-config');

const profilCtrl = require('../controllers/profil');


router.get('/:id',auth, multer, profilCtrl.getOneUser);
router.put('/:id', auth, multer, profilCtrl.modifyUser);
router.delete('/:id',auth, profilCtrl.deleteUser);

module.exports = router;