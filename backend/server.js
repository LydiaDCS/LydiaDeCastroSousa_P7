//j'importe le package http de node
const http = require('http');

//j'importe l'application
const app = require('./app');


//trouve un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//j'indique à l'app express sur quel port elle doit tourner
const port = normalizePort(process.env.PORT ||  '3000');
app.set('port', port);


//recherche les erreurs
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//je crée mon serveur
const server = http.createServer(app);
//gestion d'erreur
server.on('error', errorHandler);
//ecoute du port d'execution du serveur
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

//Ecoute des requêtes envoyées par le port disponible
server.listen(port);