const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
//j'importe middleware d'authentification
const auth = require('../middleware/auth');
//j'importe middleware gestion enregistrement de fichiers (pour fichier images)
const multer = require('multer');
const upload = multer();

//POST CRUD
router.get("/", postCtrl.readPost);
router.post('/', postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.updatePost);

//Images
router.post("/upload", multer, auth, upload.single('file'), postCtrl.getOneImgae);

//Like et Unlike
router.patch("/:id/likeunlike", auth, postCtrl.likeunlikePost);
router.post(":id/postlikedbyuser", auth, postCtrl.postlikedbyuser);
router.post(":id/alllikes", auth, postCtrl.alllikes);

module.exports = router;