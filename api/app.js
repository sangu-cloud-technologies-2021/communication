const http = require('http');
const qs = require('qs');
const http_client = require('./http_client')
const grpc_client = require('./grpc_client')
const mq_client = require('./mq_client')

const requestListener = async function (req, res) {
    const url = req.url
    console.log(url)
    const query = url.split('?')[1]
    const params = qs.parse(query)
    console.log(params)
    const numbers = Object.values(params).map(n => parseInt(n)).filter(Number.isInteger)
    
    const sum = await mq_client(numbers)
    console.log(sum)

    res.writeHead(200);
    res.end(JSON.stringify({
        message: 'ok',
        sum,
    }));
}

const server = http.createServer(requestListener);
server.listen(8080);
