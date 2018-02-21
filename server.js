const http = require('http');
const url = require('url');
const lily = require('./engine');

const PORT = 1000;

// url: /solve?numbers=25,100,75,50,6,4&target=856
const validRequest = /^\/solve\?numbers=(,?\d{1,3},?){6}&target=\d{3}/;

const server = http.createServer((request, response) => {
    if (validRequest.test(request.url)) {
        let urlInfo = url.parse(request.url, true);
        let numbers = JSON.parse(`[${urlInfo.query.numbers}]`);
        let target = Number.parseInt(urlInfo.query.target);
        console.log(`numbers: [${numbers}]\ntarget: ${target}`);
        response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'});
        let solution = lily(numbers, target);
        console.log('done');
        response.write(JSON.stringify(solution));
    } else {
        response.writeHead(400, {'Access-Control-Allow-Origin' : '*'});
    }
    response.end();
}).listen(PORT);

console.log(`Server up on port ${PORT}`);