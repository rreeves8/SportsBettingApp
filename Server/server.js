import express, { response } from "express"
import { rsa, clientRSA } from './database/cryptography/RSA.js'
import { logIn, getToken } from "./database/mongo/fetch.js"
import { hasToken, deviceIsRegistered } from "./database/mongo/conditions.js"
import { generateToken, verifyToken } from './database/tokens/Token.js';
import { addDevice, addToken } from './database/mongo/insert.js'
import { tokenatedMethods, tokenExpireyTime } from './ServerConfig.js'

const app = express();

let serverRSA

rsa().then((data) => {
    serverRSA = data
})

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
        if (tokenatedMethods.includes(cmd)) {
            let decrypted = rsa.decrypt(request.body.encrypted)

            console.log(verifyToken(decrypted.token))
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

app.get("/getPublicKey", (request, response) => {
    response.json({ key: serverRSA.getPublicString() })
})

app.post("/registerDevice")

app.post("/login", async (request, response) => {
    let deviceID = serverRSA.decrypt(request.body.deviceID)

    let clientKey = request.body.publicKey

    let credentials = {
        email: serverRSA.decrypt(request.body.credentials.email),
        password: serverRSA.decrypt(request.body.credentials.password)
    }

    let clientRSAOBJ = clientRSA(clientKey)

    if (deviceID === null) {
        response.json({ status: clientRSAOBJ.encrypt("bad key")})
    }
    else {
        let isLoggedIn = await logIn(credentials)

        let responseJSON = {
            token: '',
            status: ''
        }

        if (isLoggedIn === "OK") {
            let isReg = await deviceIsRegistered(credentials.email)

            if (!isReg) {
                addDevice(credentials.email, deviceID, clientKey)
            }

            let doesHaveToken = await hasToken(credentials.email)

            let token
            if (doesHaveToken) {
                token = await getToken(credentials.email)
            }
            if (!doesHaveToken) {
                token = generateToken(credentials.email)
                addToken(credentials.email, token)
            }

            responseJSON.token = token
            responseJSON.status = clientRSAOBJ.encrypt("Logged In")
            response.send(JSON.stringify(responseJSON))
        }
        else {
            responseJSON.status = clientRSAOBJ.encrypt(isLoggedIn)
            response.send(JSON.stringify(responseJSON))
        }
    }
})

app.post('/register', (request, response) => {

})

app.get("/freindList", (request, response) => {
    let freinds = [{ name: "magnus" }, { name: "mac" }]
    response.json(freinds)
})


app.listen(5000, () => {
    console.log(`Listening on port ${5000}, press any key to stop`)
});