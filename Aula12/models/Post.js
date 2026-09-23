const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulo:{
        type: db.Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
})

//Post.sync({force: true})

//exportando o models post para ser utilizado no index.js
module.exports = Post