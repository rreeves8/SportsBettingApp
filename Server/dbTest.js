import { addUser } from "./database/mongo/insert.js";
import { logIn } from "./database/mongo/fetch.js"
import { encryptDB, decryptDB } from './database/cryptography/Crypto.js'
import { mongoURI } from './database/config.js'
import { MongoClient } from 'mongodb'

let creds = { email: "magnusreeves@rogers.com", password: "Skokes" }


async function test() {
    const client = new MongoClient(mongoURI);
    try {
        await client.connect();

        let res = await client.db('cluster0').collection("DeviceRegistration").createIndex({ "DeviceID": 1 }, { unique: true })
        console.log(res)
    }
    catch {

    }
}

test()
/*
addUser(creds).then((res) => {
    console.log(res)
})
*/
