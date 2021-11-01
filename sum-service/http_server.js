const http = require('http');
const sum = require('./sum')

const sumHandler = (req, res) => {
    const numbers = JSON.parse(req.body)
    console.log(req.body)
    res.writeHead(200);
    res.end(JSON.stringify({
        sum: sum(numbers)
    }))
}

const handlers = {
    '/sum/': sumHandler,
    '/sum': sumHandler
}

const requestListener = function (req, res) {

    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        req.body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        res.on('error', (err) => {
            console.error(err);
        });

        console.log(req.url)
        if (handlers[req.url]) {
            return handlers[req.url](req, res)
        }

        res.writeHead(404);
        res.end(JSON.stringify({
            message: 'not found'
        }));
    });    
}

const server = http.createServer(requestListener);
server.listen(8081);
