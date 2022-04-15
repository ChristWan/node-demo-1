const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.argv[2];

if(!port){
    console.log('请指定端口号');
    process.exit(1);
}

const server = http.createServer(function (request, response) {
    const parsedUrl = url.parse(request.url, true);
    const pathWithQuery = request.url;
    let queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = request.method;

    console.log('您有一个请求！路径（带查询参数）为：' + pathWithQuery);

    if (path === '/') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(`
        <!DOCTYPE html>
        <head>
            <link rel="stylesheet" href="/x">
            <title>Demo</title>
        </head>
        <body>
            <h1>欢迎</h1>
        </body>
        `);
        response.end();
    } else if (path === '/x') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/css;charset=utf-8');
        response.write(`h1{color: red;}`);
        response.end();
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(`你访问的页面不存在`);
        response.end();
    }
});

server.listen(port);
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port);

