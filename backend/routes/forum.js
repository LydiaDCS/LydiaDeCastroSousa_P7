const express = require('express');
const router = express.Router();
//j'importe middleware d'authentification
const auth = require('../middleware/auth');

//j'importe middleware gestion enregistrement de fichiers (pour fichier images)
const multer = require('../middleware/multer-config');

const forumCtrl = require('../controllers/forum');

router.get('/',auth, forumCtrl.getAllStuff);
router.post('/',auth, multer, forumCtrl.createThing);
router.get('/:id',auth, forumCtrl.getOneThing);
router.put('/:id',auth, multer, forumCtrl.modifyThing);
router.delete('/:id',auth, forumCtrl.deleteThing);

//liker un post
router.post('/:id/like', auth, forumCtrl.likeSauce);

module.exports = router;