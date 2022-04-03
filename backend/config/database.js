//j'importe sequelize - gestion de ma base de données
const sequelize = require('sequelize');
module.exports = new sequelize('groupomania', 'root', 'lydiaDCS24!', {
    host:'localhost',
    dialect:'mysql',
    operatorsAliases: false,

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
});