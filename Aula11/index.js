const express = require('express')
const app = express()
const port = 8081
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')


//Config
    //Template Engine 
        app.engine('handlebars', engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
    //Conexão com o banco de dados MySql
        const Sequelize = require('sequelize')
        const sequelize = new Sequelize('teste', 'user', 'password',{
            host: 'localhost',
            dialect: 'mysql'
        })
// Rotas

app.get('/cad', function(req, res){
    res.render('formulario')
})

/*Envidando dados do formulario*/
app.post('/add', function(req, res){ 
    res.send(`Titulo: ${req.body.titulo}, Conteúdo: ${req.body.conteudo}`)
})


app.listen(port, function(req, res){
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})