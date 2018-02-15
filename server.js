const http = require('http');
const url = require('url');
const lily = require('./engine');

const PORT = 1000;

// url: /solve?numbers=25,100,75,50,6,4&target=856
const validRequest = /^\/solve\?/; 

const server = http.createServer((request, response) => {
    if (validRequest.test(request.url)) {
        let urlInfo = url.parse(request.url, true);
        let numbers = JSON.parse(`[${urlInfo.query.numbers}]`);
        let target = Number.parseInt(urlInfo.query.target);
        if (Array.isArray(numbers)) {
            let solution = lily(numbers, target);
            response.writeHead(200, {'content-type': 'application/json'});
            response.write(JSON.stringify(solution));
        } else {
            response.statusCode = 400;    
        }
    } else {
        response.statusCode = 404;
    }
    response.end();
}).listen(PORT);

console.log(`Server up on port ${PORT}`);