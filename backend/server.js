//Import du framework express
const express = require('express');

require('dotenv').config({ path: './config/.env' })

//j'importe mysql
const mysql = require('mysql');

//créer connexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lydiaDCS24!',
    database: 'nodemysql'
});

//Connecter
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

//je declare app pour express
const app = express();

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

//Port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})