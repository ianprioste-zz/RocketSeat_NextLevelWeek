const express = require("express")
const server = express()


//Configurar pasta public

server.use(express.static("public"))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{ 
    express: server,
    noCache: true 
})


// Configurar caminhos da minha aplicação

//Página Inicial
// req> Requisição
// res: Resposta

server.get("/", (req,res) => {
    return res.render("index.html",{title:"Um título"})
})


//Create-Point

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req,res) => {
    return res.render("search-results.html")
})

//Importante corrigir todos os <a href=""> de navegação


// ligar o servidor
server.listen(3000)




