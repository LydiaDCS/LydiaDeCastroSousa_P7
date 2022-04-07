const express = require('express');
const router = express.Router();
//j'importe middleware d'authentification
const auth = require('../middleware/auth');

//j'importe middleware gestion enregistrement de fichiers (pour fichier images)
const multer = require('../middleware/multer-config');

const forumCtrl = require('../controllers/forum');

router.get('/',auth, forumCtrl.getAllMessage);
router.post('/',auth, multer, forumCtrl.createMessage);

router.get('/:id',auth, forumCtrl.getOneMessage);
router.put('/:id',auth, multer, forumCtrl.modifyMessage);
router.delete('/:id',auth, forumCtrl.deleteMessage);

//liker un post
router.post('/:id/like', auth, forumCtrl.likeMessage);

//commenter un post
router.post('/:id/comment', auth, forumCtrl.commentMessage);

module.exports = router;