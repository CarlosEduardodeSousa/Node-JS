const mongoose = require('mongoose')

/*Configurando e Conectando com o MongoDB com o Mongoose*/
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/teste', {
}).then(() => {
    console.log(`MongoDB conectado!`)
}).catch((err) => {
    console.log(`Houve um erro: ${err}`)
})

// Definindo models no Mongoose

const UsuarioSchema = mongoose.Schema({
    nome:{
        type: String,
        required: true /*true: para ser obrigatorio, false: não obrigatorio */
    },
    sobrenome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    idade:{
        type: Number,
        required: true
    },
    pais:{
        type: String,
    }

})

//Colection
//Definindo e Adicionando um novo usuario
const novoUsuario = mongoose.model('usuarios', UsuarioSchema) // definindo o nome da colections

new novoUsuario({
    nome: 'Sergio',
    sobrenome: 'Ramos',
    email: 'sergioramos@outlook.com',
    idade: 42,
    pais: 'Espanha'
}).save().then(function(){
    console.log(`Usuario adicionado com sucesso!`)
}).catch(function(err){
    console.log(`Houve um erro ao registrar o usuario: ${err}`)
})