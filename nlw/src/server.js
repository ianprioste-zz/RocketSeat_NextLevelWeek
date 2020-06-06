const express = require("express")
const server = express()


// pegar o banco de dados
const db = require("./database/db")

//Configurar pasta public

server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

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

    // req.query: Capta os Query Strings da URL
    //console.log(req.query)

    return res.render("create-point.html")

})

server.post("/savepoint", (req,res) =>{

    // req.body: Capta o corpo do formulário, mas orecisa habilitar
    //console.log(req.body)

    // Inserir dados no banco de dados

    // Inserir dados na tabela
    const query = `
    INSERT INTO places (
        name,
        image,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items        
    ]

    function afterInsertData(err){
        if (err){
            return console.log(err)
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this)

        //return res.send("ok")

        return res.render("create-point.html", {saved: true})

    }

    db.run (query, values, afterInsertData)

})

server.get("/search-results", (req,res) => {

    const search = req.query.search

    if (search ==""){
        // pesquisa vazia
        return res.render("search-results.html", {total : 0})

    }

    //        Consultar os dados na tabela    
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if (err){
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total})

    })

})

//Importante corrigir todos os <a href=""> de navegação


// ligar o servidor
server.listen(3000)




