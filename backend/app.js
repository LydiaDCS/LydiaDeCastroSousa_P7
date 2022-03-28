require('dotenv').config({ path: './config/.env' })

//j'importe l'application express pour créer plus facile mon serveur
const express = require('express');

//Importation des routes
const forumRoutes = require('./routes/forum');
const profilRoutes = require('./routes/profil');
const userRoutes = require('./routes/user');

//j'importe mysql
const mysql = require('mysql');

//créer connexion à la base de données Mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lydiaDCS24!',
    database: 'groupomania'
});

//se Connecter
db.connect((err) => {
    if (err) {
        return err;
    }
    console.log('Connecté à la base de données MySQL!');
    db.query("CREATE DATABASE nodemysql", function(err, result) {
        if (err) throw err;
        console.log("Base de données créée !");
    });

});

//Creation de la BDD à travers une route get //middleware
app.get('/createdb', (req, res) => {
    //requête
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('database created...');

    });
});

//Créer une table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY id)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table create...');

    });
});

//je crée mon app avec express
const app = express();

//Gérer requête POST 
app.use(express.json());

//Erreur CROS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//j'enregistre les routes
app.use('/api/forum', forumRoutes)
app.use('/api/profil', profilRoutes);
app.use('/api/auth', userRoutes);

//Accès au chemin de notre système de fichiers
const path = require('path');
//middleware pour servir dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

//j'exporte l'application
module.exports = app;