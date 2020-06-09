#h1 ANOTAÇÕES NEX LEVEL WEEK

#h2 ATALHOS TERMINAL
    ctrl+' - abre/fecha terminal
    ctrl+c - Para aplicação no terminal
    ctrl+l - Limpa terminal

#h2 ATALHOS VS CODE 
    ctrl+D - seleciona a próxima ocorrência
    ctrl+; - comenta/descomenta seleção


#h2 Estrutura Inicial 
    
    public
        assets 
        scripts
            index.js
        styles
            main.css
    src
        database
            db.js
        views
            index.html
        server.js

#h2 Configurar o Servidor 

    --- Instalações Prévias ---
        Node.js (web)
        git bash (web)

    --- Instalação Express + nodemon ---

        Terminal: npm install
        Terminal: npm init -y
        Terminal: npm install express
        Terminal: npm install nodemon -D

    --- Criar arquivo server.js ---
        const express = require("express")
        const server = express()

        // ligar o servidor
        server.listen(3000)

    --- Atualizar package.json ---
        de : "test": "echo \"Error: no test specified\" && exit 1" 

        para: "start": "nodemon src/server.js"
    
    --- Iniciar Servidor ---
        Terminal: npm start

    --- Testar conexão server ---
        Navegador: localhost:3000
        Resposta: 'Cannot GET / '

#h3 SERVIDOR CONFIGURADO

#h2 CONFIGURAR NUNJUCKS PARA HTML DINÂMICO
    
    --- Instalar Nunjucks: ---
        Terminal: npm install nunjucks

    --- Configurar server ---
        const nunjucks = require("nunjucks")
        nunjucks.configure("src/views",{ 
            express: server,
            noCache: true 
                //alterar para false para subir em um servidor web
        })
        
        * Lembrar de deixar o código listen sempre por último

#h2 NUNJUCKS CONFIGURADO  

    --- Configurar Pasta Public (server.js)---
        server.use(express.static("public"))

    --- Definir caminho para index.html (server.js) ---
        server.get("/", (req,res) => {
            return res.render("index.html",{title:"Um título"})
        })

#h2 index.html + layout.html ===

    --- Estrutura HTML ---
        Emmet: ! (enter)

    --- Conectar página com layout ---
        Emmet: nextends
        {% extends "layout.html" %}

    --- Enviar Page ID para Layout ---
        {% set pageId = "page-home" %}

    --- Receber Page ID no layout ---
        <body>
            <div id="{{ pageId }}">
            </div>
        </body>


#h2 LEMBRETES CSS 

    --- Background sem repetição ---
        background: url() no-repeat;

    --- Um elemento para cada lado ---
        display: flex;
        justify-content: space-between;

    --- Alinhar elementos display flex ---
        align-items: center;