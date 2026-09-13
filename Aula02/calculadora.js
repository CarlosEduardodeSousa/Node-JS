let somaFunc = require('./funções/somar')
let subFunc = require('./funções/sub')
let multFunc = require('./funções/mult')
let divFunc = require('./funções/div')

let num = 10
let num2 = 2

console.log(`Soma: ${somaFunc(num,num2)}`)
console.log(`Subtração: ${subFunc(num,num2)}`)
console.log(`Multiplicação: ${multFunc(num,num2)}`)
console.log(`Divisão: ${divFunc(num,num2)}`)