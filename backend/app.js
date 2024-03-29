/*j'importe dotenv pour gérer les variables d'environnement
.env*/
require('dotenv').config({ path: './config/.env'})
//console.log(process.env);

//j'importe l'application express pour créer plus facile mon serveur
const express = require('express');

//j'importe helmet -sécuriser entête http contre attaques XSS
const helmet = require('helmet');

//j'importe express-rate-limit pour limiter les requêtes
const rateLimit = require('express-rate-limit');

//Importation des routes
/*const postRoutes = require('./routes/post.routes');*/
const userRoutes = require('./routes/user.routes');
const commentRoutes = require('./routes/comment.routes');
const postRoutes = require('./routes/post.routes');


//Accès au chemin de notre système de fichiers
const path = require('path');


//Limiter le temps de chaque session
const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes 
    max: 100, // Limite chaque IP à 100 requêtes par `window` (ici, par 20 minutes ) 
    standardHeaders: true, // Renvoie les informations de limite de débit dans les en-têtes `RateLimit-*` 
    legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*` 
});

//je crée mon app avec express
const app = express();
const bodyParser = require("body-parser");

//utilise pour analyser les corps json (comme bodyparser)
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Gestion des erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//permettre le chargement des images
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use(limiter);

//j'importe mysql
const mysql = require('mysql');

const database = require('./config/database');

const db = require("./models");

database.authenticate()
.then(()=>console.log('Connexion à la base de données Mysql...'))
.catch(err=> console.log('Error: '+ err)) 


//j'enregistre les routes
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comment', commentRoutes);


//middleware pour servir dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

//j'exporte l'application
module.exports = app; 