const express = require('express')
const app = express()
const port = 8081

app.get('/', function(req, res){
    res.send(`Seja bem-vindo ao meu site!`)
})

app.get('/sobre', function(req, res){
    res.send(`Bem-vindo a minha página sobre`)
})

app.get('/blog', function(req, res){
    res.send(`Bem-vindo a minha página blog`)
})

app.listen(port, function(req, res){
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})