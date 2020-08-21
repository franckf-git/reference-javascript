const http = require('http')
const server = http.createServer()
server.listen(5500)

server.on('request', (request, response) => {
    request.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`)
  })
    const object = {
        "message":"ok"
    }
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(object))
    response.end()
})

// curl --location --request POST 'http://127.0.0.1:5500' --header 'Content-Type: application/json' --data-raw '{"email": "login@email.me","mot_de_passe":"motdepasse"}'

