//j'importe l'application express pour créer plus facile mon serveur
const express = require('express');

//j'appelle express
const app = express();
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});

//j'exporte l'application
module.exports = app;