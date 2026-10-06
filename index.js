require('dotenv').config()
const http = require('http')
const fs = require('fs')
const path = require('path')

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml'
}

function requestController(req, res) {
    let cleanUrl = req.url.split('?')[0]

    // Manejo de rutas principales
    if (cleanUrl === '/' || cleanUrl === '') {
        cleanUrl = '/index.html'
    } else if (cleanUrl === '/profile') {
        cleanUrl = '/profile.html'
    } else if (cleanUrl === '/cv') {
        cleanUrl = '/cv.html'
    }

    // Ruta física del archivo solicitado
    const filePath = path.join(__dirname, cleanUrl)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Archivo no encontrado')
            return
        }
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data)
    })
}

const server = http.createServer(requestController)
const PORT = process.env.PORT || 3000

server.listen(PORT, function() {
    console.log("Servidor corriendo en el puerto: " + PORT)
})