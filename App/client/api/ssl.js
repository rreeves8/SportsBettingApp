import { getKey, storeKey } from '../KeyStore'
import api from './connection'
import RSA from 'node-forge';

const createPublicKey = () => {

}

export async function encrypt(data) {
    const serverPublicKey = await getServerPublicKey()
    const clientPrivateKey = await getClientKey('private')
    const clientPublicKey = await getClientKey('public')
    console.log(clientPrivateKey)
    console.log(clientPublicKey)
}

export function decrypt(data) {
    return data
}

async function getServerPublicKey() {
    const key = await getKey('public_key_server')

    if (key != null) {
        return key
    }
    else {
        const response
        try {
            response = await api.get('/getPublicKey')
            const publicKey = response.data["key"]
            storeKey('public_key_server', publicKey)
            return publicKey
        }
        catch(e){
            throw e
        }
    }
}

async function getClientKey(type) {
    const selector = (type, keys) => {
        if (type === 'private') {
            return keys.private
        }
        else {
            return keys.public
        }
    }

    const keys = await getKey('client_keys')

    if (keys != null) {
        const keyJ = JSON.parse(keys)
        return selector(type, keyJ)
    }
    else {
        const newKeys = await RSA.generateKeys(4096)
        storeKey('client_keys', JSON.stringify({ public: newKeys.public, private: kenewKeysys.private }))
        return selector(type, newKeys)
    }
}

function getClientPublicKey() {
    if (dataExists('@public_key_client')) {
        readData('@public_key_client').then((data) => {
            return data
        })
    }
    else {
        fetchPublicKey().then((data) => {
            storeData('@public_key_client', data)
            return data
        })
    }
}

export default { encrypt, decrypt }