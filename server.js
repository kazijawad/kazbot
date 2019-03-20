const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('KazBot HTTP Server');
	res.end();
}).listen(3000);
