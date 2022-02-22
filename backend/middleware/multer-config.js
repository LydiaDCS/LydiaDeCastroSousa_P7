//j'importe multer
const multer = require('multer');

//element dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//logique pour enregistrement des fichiers
const storage = multer.diskStorage({
    //fonction qui indique la destination où enregistrer les fichiers
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    //fonction qui indique d'utiliser le nom d'origine, remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier
    filename: (req, file, callback) => {
        //prendre le nom d'origine du fichier en enlevant les espaces et en mettant à la place un underscore
        const name = file.originalname.split('').join('_');
        //création de l'extention du fichier
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//j'exporte multer
module.exports = multer({ storage }).single('image');