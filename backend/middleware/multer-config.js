
//j'importe multer
const multer = require('multer');

//element dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

//logique pour enregistrement des fichiers
//objet de configuration pour multer en l'enregistrant sur le disque qui prend 2 éléments: destination et filename
const storage = multer.diskStorage({
    //fonction qui indique la destination où enregistrer les fichiers
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    //explique à multer quel nom de fichier utiliser
    filename: (req, file, callback) => {
        //nouveau nom pour le fichier : nom d'origine du fichier et remplacement des espaces par des underscores avec split
        const name = file.originalname.split('').join('_');
        //création de l'extention du fichier
        const extension = MIME_TYPES[file.mimetype];
        //appel du fichier par son nom complet: name + timestamp +'.' +extension du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

//j'exporte middleware multer configuré en passant l'objet storage, et appel single pour un fichier image unique
module.exports = multer({ storage }).single('image');