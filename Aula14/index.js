const express = require('express')
const app = express()
const port = 8081
const admin = require('./routes/admin')
const path = require('path')
//Configs
    // Handlebars
        const {engine} = require('express-handlebars')
        app.engine('handlebars', engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Body-Parser
        const bodyParser = require('body-parser')
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
    // Mongoose
    // Public (Arquivos HTML, CSS E JS)
        app.use(express.static(path.join(__dirname, 'public')))
//Rotas
    app.use('/admin', admin)  //Prefixo, variavel
//Outros
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})