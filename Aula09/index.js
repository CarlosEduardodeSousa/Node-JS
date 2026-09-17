const express = require('express')
const app = express();
const port = 8081

app.get('/', function(req, res){
    res.send(`Seja bem-vindo ao meu app!`)
})

app.get('/sobre', function(req, res){
    res.send(`Minha página sobre!`)
})

app.get('/blog', function(req, res){
    res.send(`Bem-vindo ao meu blog!`)
})

app.get('/livedeteste', function(req, res){
    res.send(`BIRL!`)
})

app.get('/rotadeTeste', function(req, res){
    res.send(`HAHAHAHAHHAHAHA`)
})

app.listen(port, function(req, res){
    console.log(`Servidor rodando na porta http://localhost:8081`)
})