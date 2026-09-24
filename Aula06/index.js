const express = require('express')
const app = express()
const port = 8081

app.get('/', function(req, res){
    res.sendFile(__dirname + `/html/index.html`)
})

app.get('/sobre', function(req, res){
    res.sendFile(__dirname + `/html/sobre.html`)
})

app.get('/blog', function(req, res){
    res.sendFile(__dirname + `/html/blog.html`)
})

app.get('/ola/:nome/:cargo/:cor', function(req, res){
    res.send(`<h1>Olá ${req.params.nome}</h1> 
    <h2>Cargo: ${req.params.cargo}</h2> 
    <h3>Cor: ${req.params.cor}</h3>`)
})


app.listen(port, function(req, res){
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})