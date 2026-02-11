const fs = require('fs');
const http = require('http');
const { htmlList, pageTwo, pageThree, notFoundPage } = require("./template");
const path = require('path');
let db;

function getAllItems() {
    return new Promise((resolve, reject) => {
        const read = fs.createReadStream('./data.json');
        let data = '';
        read.on('data', d => {
            data += d.toString();
        });

        read.on('end', () => {
            resolve(data);
        })

    })
}
function save(items) {
    const writeStream = fs.createWriteStream('./data.json');
    writeStream.write(JSON.stringify(items));
    writeStream.end();

}
function astronomy(req, res) {
    const html = pageTwo();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);

}
function serbal(req, res) {
    const html = pageThree();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);

}
function notFound(req, res) {
    const html = notFoundPage();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}
function root(req, res) {
    const html = htmlList(db);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}
function styles(req, res) {
    const fileName = req.url.split('/');
    const cssPath = path.join(__dirname, `styles/${fileName[2]}`);
    console.log(cssPath);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    const stream = fs.createReadStream(cssPath);
    stream.pipe(res);

}
function images(req, res) {
    const imgName = req.url.split('/');
    const imgPath = path.join(__dirname, `/images/${imgName[2]}`);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    const stream = fs.createReadStream(imgPath);
    stream.pipe(res);


}
function download(req, res) {
    const imgName = req.url.split('/');
    const imgPath = path.join(__dirname, `/images/${imgName[2]}`);
    res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Content-Disposition': `attachment; filename=${imgName[2]}` });
    const stream = fs.createReadStream(imgPath);
    stream.pipe(res);


}

function GET(req, res) {
    const paths = {
        '': root,
        styles,
        astronomy,
        serbal,
        images,
        notFound,
        download
    }
    const routes = req.url.split('/');
    paths[routes[1]] ? paths[routes[1]](req, res) : paths.notFound(req, res);

}
function getNextId(products) {
    return (products[products.length - 1]?.id || 0) + 1;
}
function additem(req, res) {
    let body = "";
    req.on('data', (d) => {
        body += d.toString();
    });
    req.on('end', () => {
        body = JSON.parse(body);
        const error = {};
        if (!body["name"]) {
            error.name = "name is requried";
        }
        if (!body["quantity"] || isNaN(body.quantity)) {
            error.quantity = "quantity is requried an must be number";
        }
        if (!body['category']) {
            error.category = "category is requried";
        }
        if (Object.keys(error).length) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(error));
            return;
        }

        body.id = getNextId(db);
        db.push(body);
        save(db);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`done`);
    })

}
function POST(req, res) {
    const paths = {
        '': additem,
        notFound
    }
    const routes = req.url.split('/');
    paths[routes[1]] ? paths[routes[1]](req, res) : paths.notFound(req, res);
}
const methods = {
    GET,
    POST
}

const server = http.createServer((req, res) => {
    methods[req.method] ? methods[req.method](req, res) : console.log("method not found");
});

server.listen(3000, async () => {
    db = await getAllItems();
    db = JSON.parse(db);
})

