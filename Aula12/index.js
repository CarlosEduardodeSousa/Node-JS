const express = require('express')
const app = express()
const port = 8081
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

// Config
    //Template Engine
        app.engine('handlebars', engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Body-Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
// Rotas

app.get('/', function(req, res){
    //{order: [['id', 'desc']]} ordena a lista de post 
    Post.findAll({order: [['id', 'asc']]}).then(function(posts){ //Retorna todos os dados da tabela post 
        res.render('home', {posts: posts.map(post => post.toJSON())})
    }) 
    
})

app.get('/cad', function(req, res){
    res.render('formulario')
})

app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/') //redirecionando a página após a criação da postagem
    }).catch(function(erro){
        res.send(`Houve um erro: ${erro}`)
    })
})

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send(`Postagem deletada com sucesso!`)
    }).catch(function(erro){
        res.send(`Essa postagem não existe!`)
    })

    //Post.destroy() => serve para deletar os dados no site e no banco de dados
})

app.listen(port, function(){
    console.log(`Servidor rodando na porta http:/localhost:${port}`)
})