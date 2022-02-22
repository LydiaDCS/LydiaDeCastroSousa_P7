//J'importe mongoose
const mongoose = require('mongoose');

//j'importe le validateur unique pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse mail -- Adresse unique 
const uniqueValidator = require('mongoose-unique-validator');

//Je crée mon schéma de données User
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//j'applique le validateur au schéma comme plugin avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

//J'exporte le schéma sous forme de modèle
module.exports = mongoose.model('user', userSchema);