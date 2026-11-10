const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')

router.get('/registro', (req, res) => {
    res.render('usuarios/registro')
})

router.post('/registro', (req, res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text: 'Nome invalido!'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({text: 'E-mail invalido!'})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({text: 'Senha invalido!'})
    }else{
        if(req.body.senha.length < 4){
            erros.push({text: 'Senha muito curta'})
        }

        if(req.body.senha != req.body.senha2){
            erros.push({text: 'As senhas são diferentes, tente novamente'})
        }   
    }

    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }
    else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash('error_msg', 'Já existe uma conta com esse email')
                res.redirect('/usuarios/registro')
            }else{
                const novousuario = {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                }

                //Criptografia de Senha com bcrypt
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novousuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash('error_msg', 'Houve um erro durante o salvamento do usuario')
                            res.redirect('/')
                        }else{
                            novousuario.senha = hash

                            Usuario(novousuario).save().then(() => {
                                req.flash('success_msg', 'Usuário criado com sucesso!')
                                res.redirect('/')
                            }).catch((err) => {
                                req.flash('error_msg', 'Houve um erro ao criar o usuario')
                                res.redirect('/usuarios/registros')
                            })
                        }

                       
                    })
                })
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno')
            res.redirect('/')
        })
    }
})

module.exports = router