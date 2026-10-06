require('dotenv').config()
const http = require('http')
const fs = require('fs')
const path = require('path')

function requestController(req, res) {
    console.log('Bienvenidos al curso')

    const filePath = path.join(__dirname, 'index.html')
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('Error interno del servidor')
            return
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(data)
    })
}

const server = http.createServer(requestController)

const PORT = process.env.PORT || 3000

server.listen(PORT, function(){
    console.log("Aplicacion corriendo en: " + PORT)
})