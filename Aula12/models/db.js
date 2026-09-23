//Conexão com o banco de dados MySql
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postapp', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

//Exportando a conexão para outros arquivos
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}