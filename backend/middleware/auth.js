//j'importe jwt pour vérifier les tokens 
const jwt = require('jsonwebtoken');

//Export du middleware d'authentification
module.exports = (req, res, next) => {
    try {
        //récupère le token dans le header d'authorization et split retourne un tableau avec bearer en 0 et le token en 1
        const token = req.headers.authorization.split(' ')[1];
        //décoder le token avec verify (token, clé secrète qui sera plus longue avec le userId)
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //je récupère le userId du token
        const userId = decodedToken.userId;
        //j'ajoute userId récupéré du token à l'objet requête pour pouvoir vérifier si un utilisateur peut supprimer une sauce
        req.auth = { userId };
        //je vérifie que le userId de la requête correspond à celui du token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error) {
        //erreur authentification
        res.status(401).json({ error: error | 'Requête non authentifiée!' });
    }
};