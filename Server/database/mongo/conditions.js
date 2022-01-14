import { MongoClient } from 'mongodb'
import { mongoURI } from '../config.js'
import { encryptDB } from '../cryptography/Crypto.js'

const doesExist = async (data, collectionName) => {
    const client = new MongoClient(mongoURI);

    try {
        await client.connect();
        const count = await client.db('cluster0').collection(collectionName).countDocuments(data);

        if (count >= 1) {
            return true
        }
        else {
            return false
        }
    }
    finally {
        await client.close();
    }
}

export async function deviceIsRegistered(email, deviceID) {
    return await doesExist({
        Email: email
    }, "DeviceRegistration")
}

export async function hasToken(email) {
    return await doesExist({
        Email: email
    }, "Tokens")
}

export async function hasKey(){
    return await doesExist('Private', 'Keys')
}