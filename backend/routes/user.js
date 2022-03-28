//j'importe express
const express = require('express');

//je crée le router avec express
const router = express.Router();

//j'associe les fonctions aux différentes routes
const userctrl = require('../controllers/user');
const password = require('../middleware/password');

//je crée mes routes et envoie mes infos
router.post('/signup', password, userctrl.signup);
router.post('/login', userctrl.login);

//j'exporte le router
module.exports = router;