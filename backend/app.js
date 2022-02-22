//j'importe dotenv
require('dotenv').config();
//console.log(process.env);

//j'importe express
const express = require('express');

//j'importe mongosse
const mongoose = require('mongoose');

//Accès au chemin de notre système de fichiers
const path = require('path');
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//je crée l'application express
const app = express();

mongoose.connect(`mongodb+srv://${process.env.BD_USERNAME}:${process.env.BD_SECRET_KEY}@cluster0.u4xnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

//middleware pour servir dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

//j'enregistre les routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//j'exporte mon application express
module.exports = app;