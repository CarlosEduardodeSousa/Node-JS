const Sequelize = require('sequelize')
const sequelize = new Sequelize('teste', 'user', 'password!', {
    host: 'localhost',
    dialect: 'mysql'
})

/*Criando um Model no Sequelize*/
const postagem = sequelize.define('postagens',{
    titulo:{
        type: Sequelize.STRING
    },
    conteudo:{
        type: Sequelize.TEXT
    }
})

/*Sincronizando o mode com o MySQL*/

postagem.sync({force: true})

const Usuario = sequelize.define('usuarios', {
    nome:{
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    },
    idade:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    }
})

Usuario.sync({force: true})

postagem.create({
    titulo: 'UM TITULO',
    conteudo: 'Eu não sei'
})

Usuario.create({
    nome: 'Willian',
    sobrenome: 'Rodrigues',
    idade: '45',
    email: 'willianrodrigues@gmail.com'
})