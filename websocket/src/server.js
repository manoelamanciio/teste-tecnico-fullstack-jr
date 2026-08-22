import http from 'node:http'
import { WebSocket, WebSocketServer } from 'ws'

const port = 8080

const httpServer = http.createServer((request, response) => {
    if (request.method !== 'POST' || request.url !== '/broadcast') {
        response.writeHead(404)
        response.end()
        return
    }

    let body = ''

    request.on('data', (chunk) => {
        body += chunk
    })

    request.on('end', () => {
        try {
            const message = JSON.stringify(JSON.parse(body))

            webSocketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message)
                }
            })

            response.writeHead(204)
            response.end()
        } catch {
            response.writeHead(400, {
                'Content-Type': 'application/json',
            })
            response.end(JSON.stringify({
                message: 'JSON inválido.',
            }))
        }
    })
})

const webSocketServer = new WebSocketServer({
    server: httpServer,
})

webSocketServer.on('connection', (socket) => {
    socket.send(JSON.stringify({
        type: 'connected',
    }))
})

httpServer.listen(port, '0.0.0.0', () => {
    console.log(`WebSocket running on port ${port}`)
})