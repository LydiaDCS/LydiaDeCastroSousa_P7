 //j'importe sequelize - gestion de ma base de données
    const sequelize = require('sequelize');
    module.exports = new sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect:process.env.DB_DIALECT,
        operatorsAliases: false,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        },
    }); 