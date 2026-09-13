let http = require('http')

http.createServer(function(req, res){
    res.end(`Olá, sou muito hetero`)
}).listen(8081)

console.log(`O servidor está rodando na porta http://localhost:8081`)