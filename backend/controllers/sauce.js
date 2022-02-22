//j'importe le modèle de la sauce
const Sauce = require('../models/modelSauce');

//j'importe le package fs de node pour avoir accès aux différentes opérations liées au système de fichiers
const fs = require('fs');

//AJOUTER UNE SAUCE: POST puis save
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};


//SUPPRIMER UNE SAUCE: DELETE siseulement sauce.userId == auteur de la requête
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(
            (sauce) => {
                if (!sauce) {
                    return res.status(404).json({
                        error: 'Sauce non trouvée!'
                    });
                }
                if (sauce.userId !== req.auth.userId) {
                    return res.status(401).json({
                        error: 'Requête non identifiée !'
                    });
                }
                return sauce;
            })
        //avant de supprimer objet de base, je recherche l'objet pour avoir accès à l'url de l'image pour en extraire le nom du fichier (2eme element apres /images/) et ainsi supprimer le fichier

    .then((sauce) => {
            const filename = thing.imageUrl.split('/images/')[1];
            //je supprime le fichier avec fs.unlink
            fs.unlink(`images/${filename}`, () => {
                //quant fichier supprimé, on supprime l'ojet de la base de données
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//Recupérer une seule sauce avec la méthode findOne
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//Modifier une sauce: PUT avec la méthode updateOne
exports.modifySauce = (req, res, next) => {
    //si il y a un fichier
    const sauceObject = req.file ? {
        //on récupère la chaîne de caractère et on la parse en objet
        ...JSON.parse(req.body.sauce),
        //on modifie l'image url sinon on prend le corps de la requête, la sauce créée en prenant son id pour correspondre identifiant paramètre de requête
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(
            () => {
                res.status(201).json({
                    message: 'Sauce updated successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};

//Récupérer toutes les sauces avec la méthode find
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};