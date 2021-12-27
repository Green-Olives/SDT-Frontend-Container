const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url)
    const ext = path.extname(filePath)
    let ContentType

    switch (ext) {
        case '.css':
            ContentType = 'text/css'
            break;
        case '.js':
            ContentType = 'text/javascript'
            break;
        default:
            ContentType = 'text/html'
            break;
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500)
            res.end('Error')
        } else {
            res.writeHead(200, {
                'ContentType': ContentType
            })
            res.end(data)
        }
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})