//j'importe express
const express = require('express');

//je crée le router avec express
const router = express.Router();

//j'importe middleware d'authentification
const auth = require('../middleware/auth');

//j'importe middleware gestion enregistrement de fichiers (pour fichier images)
const multer = require('../middleware/multer-config');

//j'associe les fonctions aux différentes routes
const userctrl = require('../controllers/user');
const password = require('../middleware/password');

//je crée mes routes et envoie mes infos
router.post('/signup', password, userctrl.signup);
router.post('/login', userctrl.login);


router.get('/:id',auth, userctrl.getOneUser);
router.put('/:id', auth, multer, userctrl.updateUser);
router.delete('/:id',auth, userctrl.deleteUser);

//j'exporte le router
module.exports = router;