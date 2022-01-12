const express = require("express");
var bodyParser = require('body-parser');
const { response } = require("express");
const app = express();

var RSAKey = require('react-native-rsa');
const res = require("express/lib/response");
const bits = 1024;
const exponent = '10001'; // must be a string

var rsa = new RSAKey();
var r = rsa.generate(bits, exponent);

app.use(
    (request, response, next) => {
        response.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-PINGOTHER'
        })

        if (request.method === 'OPTIONS') {
            response.sendStatus(200)
        }
        else {
            next()
        }
    },
    (request, response, next) => {
        //console.log(request.headers["user-agent"])
        next()
    },
    (request, response, next) => {
        if (request.method === 'POST') {

            let type = request.headers['content-type']
            let bodyStream = '';

            if (type !== '/application/json') {
                request.on('data', chunk => {
                    bodyStream += chunk.toString()
                })

                request.on('end', () => {
                    if (type === 'json') {
                        request.body = JSON.parse(bodyStream)
                        next()
                    }

                    if (type === 'xml') {
                        next()
                    }
                })
            }
            else {
                response.sendStatus(403)
            }
        }
        else {
            next();
        }
    },
    (request, response, next) => {
        const cmd = request.url
        if (cmd === '/getFriends') {
            if (request.body.token === "123") {
                next()
            }
            else {
                response.json("invalid_token")
            }
        }
        else {
            next()
        }
    }
)

let clientPublicKey 

app.get("/getPublicKey", (request, response) => {
    response.json({ key: rsa.getPublicString() })
})

app.post('/setDeviceID', (request, response) => {
    let userAgent = request.headers["user-agent"].split(' ')[0]

    let id = request.body.id

    clientPublicKey = JSON.parse(request.body.key)
    
    response.send("ok")
})

app.post("/login", (request, response) => {
    console.log(request.body)
    
    let decrypted = rsa.decrypt(request.body);


    response.json({ status: "ok" })
})

app.get("/freindList", (request, response) => {
    let freinds = [{ name: "magnus" }, { name: "mac" }]
    response.json(freinds)
})


app.listen(5000, () => {
    console.log(`Listening on port ${5000}, press any key to stop`)
});