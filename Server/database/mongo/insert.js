import { MongoClient } from 'mongodb'
import { mongoURI } from '../config.js'
import { encryptDB } from '../cryptography/Crypto.js'

const insert = async (data, collectionName) => {
    const client = new MongoClient(mongoURI);
    let result = 500
    try {
        await client.connect();

        const collection = client.db('cluster0').collection(collectionName);

        await collection.insertOne(data)
    }
    catch(error){
        result = error.code
    }
    finally {
        await client.close();
        return result
    }
}

export async function addUser(credentials) {
    let result = await insert({
        Email: credentials.email,
        Password: encryptDB(credentials.password, credentials.password)
    }, "Accounts")
    if(result !== 500){
        return "Error you are already signed Up"
    }
    else{
        return "You are now signed up"
    }
}

export async function addDevice(email, deviceID, clientPublicKey) {
    insert({
        Email: email,
        DeviceID: deviceID,
        PublicKey: clientPublicKey
    }, "DeviceRegistration")
}

export function addFriend(email1, email2) {
    insert({
        Email1: email1,
        Email2: email2
    }, "FriendShips")
} 

export async function addToken(email, token){
    let result = await insert({
        Token: token,
        Email: email
    }, "Tokens")
}

export async function addServerKey(key, name){
    let result = await insert({
        key: key,
        name: name
    }, "Keys")
}
