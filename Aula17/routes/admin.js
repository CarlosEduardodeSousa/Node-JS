const express = require('express')
const router = express.Router() // Rotas em arquivos separados
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/categorias', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias!')
        res.redirect('/admin')
    })
})

router.get('/addcategorias', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {
    
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text: 'Nome inválido'})
    }
  
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({text: 'Slug Inválido!'})
    }
   
    if(req.body.nome.length < 2){
        erros.push({text: 'Nome da categoria é muito pequeno'})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente!')
            res.redirect('/admin')
        })
    }    
})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id}).lean().then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg', 'Está categoria não existe')
        res.redirect('/admin/categorias')
    })
    
})

router.post('/categorias/edit', (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text: 'Nome existente!'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({text: 'Slug existente!'})
    }

    if(erros.length > 0){
        res.render('admin/editcategorias', {erros: erros, 
            categoria:{
                _id: req.body.id,
                nome: req.body.nome,
                slug: req.body.slug
            }
        })
    }
    else{
        Categoria.findOne({_id: req.body.id}).then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso!')
                res.redirect('/admin/categorias')
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro interno ao salvar a edição')
                res.redirect('/admin/categorias')
            })
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao editar a categoria')
            res.redirect('/admin/categorias')
        })
    }
})

router.post('/categorias/deletar' , (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Categoria removida com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao deletar a categoria!')
        res.redirect('/admin/categorias')
    })
})

router.get('/postagens', (req, res) => {
    Postagem.find().populate('categoria').lean().then((postagens) => {
        res.render('admin/postagens', {postagens: postagens})
    }).catch((err) => {
        req.flash('erro_msg', 'Erro ao listar as postagens')
        res.redirect('/admin')
    })
})

router.get('/postagens/add', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/addpostagens', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao carregar o formulario')
        res.redirect('/admin')
    })
    
})

router.post('/postagens/nova', (req, res) => {
    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({text: 'Insira um titulo!'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({text: 'Insira um slug!'})
    }

    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
        erros.push({text: 'Insira uma descrição!'})
    }

    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        erros.push({text: 'Insira um conteúdo'})
    }

    if(req.body.categoria == 0){
        erros.push({text: 'Categoria Inválida, registre uma categoria'})
    }

    if(erros.length > 0){
        res.render('admin/addpostagens', {erros: erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', 'Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro durante ao salvamento da postagem!')
            res.redirect('/admin/postagens')
        })
    }
})

module.exports = router