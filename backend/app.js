//j'importe dotenv
require('dotenv').config();
//console.log(process.env);

//j'importe express
const express = require('express');

//Pour empêcher les attaques par injection de sélecteur de requête: nettoyer les données reçues
const mongoSanitize = require('express-mongo-sanitize');

//j'importe helmet -sécuriser entête http contre attaques XSS
const helmet = require('helmet');

//j'importe express-rate-limit pour limiter les requêtes
const rateLimit = require('express-rate-limit');

//j'importe mongosse
const mongoose = require('mongoose');

//Accès au chemin de notre système de fichiers
const path = require('path');

//Importation des routes
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Connexion à mongoose qui gère la base de données Mango DB
mongoose.connect(`mongodb+srv://${process.env.BD_USERNAME}:${process.env.BD_SECRET_KEY}@cluster0.u4xnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Limiter le temps de chaque session
const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes 
    max: 100, // Limite chaque IP à 100 requêtes par `window` (ici, par 15 minutes ) 
    standardHeaders: true, // Renvoie les informations de limite de débit dans les en-têtes `RateLimit-*` 
    legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*` 
});

//je crée l'application express et appel des dépendances
const app = express();

// Par défaut, $ et . les caractères sont complètement supprimés de l'entrée fournie par l'utilisateur aux emplacements suivants : 
// - req.body 
// - req.params 
// - req.headers 
// - req.query 

// Pour supprimer des données à l'aide de ces valeurs par défaut : 
app.use(mongoSanitize());

// A la fois allowDots et replaceWith 
app.use(
    mongoSanitize({
        allowDots: true,
        replaceWith: '_',
    }),
);

//permettre le chargement des images
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use(limiter);

app.use(express.json());

//Gestion des erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//middleware pour servir dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

//j'enregistre les routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//j'exporte mon application express
module.exports = app;