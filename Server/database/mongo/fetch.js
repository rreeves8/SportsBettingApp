import { MongoClient } from 'mongodb'
import { mongoURI } from '../config.js'
import { decryptDB } from '../cryptography/Crypto.js'

const find = async (query, collectionName, values) => {
    const client = new MongoClient(mongoURI);

    try {
        await client.connect();

        const database = client.db('cluster0').collection(collectionName);

        const data = await database.findOne(query);

        return data
    }
    finally {
        await client.close();
    }
}

export async function logIn(credentials) {
    let data = await find({
        Email: credentials.email,
    }, "Accounts")

    if(data === null){
        return "No Such Login Please Register"
    }

    let decrypted = decryptDB(data.Password, credentials.password)

    if (decrypted === credentials.password) {
        return "OK"
    }
    else {
        return "Bad Password"
    }
}

export async function getToken(email){
    let data = await find({
        Email: email
    }, "Tokens")
    return data.Token
}

export async function getClientPublicKey(email, deviceID){
    let data = await find({
        Email: email,
        DeviceID: deviceID
    }, "DeviceRegistration")

    return data.PublicKey
}

export async function getServerKey(name){
    let data = await find({
        name: name
    }, "Keys")

    return data
}