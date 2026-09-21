const express = require('express')
const app = express()
const port = 8081
const { engine } = require('express-handlebars')


//Config
    //Template Engine 
        app.engine('handlebars', engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
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
    res.send('Formulario recebido!')
})


app.listen(port, function(req, res){
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})